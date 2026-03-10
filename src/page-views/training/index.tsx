'use client';

import styles from './styles.module.scss';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import Loader from '@/shared/UI/Loader';
import ErrorMessage from '@/shared/components/ErrorMessage';
import { useGetUsers } from '@/shared/hooks/useGetUsers';
import { useGetSimulations } from '@/shared/hooks/useGetSimulations';
import UserCard from '@/entities/UserCard';
import { useAppSelector } from '@/shared/hooks/store';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { stopSimulation } from '@/shared/api';

const Training = () => {
	const updateListNumber = useAppSelector(store => store.updateList);
	const { role } = useUserCookies();

	const isAdmin = role === 'admin';
	const nameList = isAdmin ? 'Список преподавателей' : 'Список студентов';

	const { users, isLoading, error, refetch } = useGetUsers(role);
	const {
		simulations,
		isLoading: simulationsLoading,
		refetch: refetchSimulations,
	} = useGetSimulations(role);

	const lastFetchedUpdateList = useRef<number | null>(null);

	useEffect(() => {
		// Дедупликация: React Strict Mode в dev вызывает эффект дважды.
		// Пропускаем повторный вызов при том же updateListNumber.
		if (lastFetchedUpdateList.current === updateListNumber) {
			return;
		}
		lastFetchedUpdateList.current = updateListNumber;
		refetch();
		refetchSimulations();
	}, [updateListNumber, refetch, refetchSimulations]);

	const simulationsByUserId = useMemo(() => {
		const map = new Map<
			number,
			{
				hasActiveSimulation: boolean;
				activeSimulationIds: number[];
			}
		>();
		for (const sim of simulations) {
			const existing = map.get(sim.user) ?? {
				hasActiveSimulation: false,
				activeSimulationIds: [] as number[],
			};
			if (sim.active) {
				existing.hasActiveSimulation = true;
				existing.activeSimulationIds.push(sim.id);
			}
			map.set(sim.user, existing);
		}
		return map;
	}, [simulations]);

	const handleDeleteSimulation = useCallback(
		async (userId: number) => {
			const data = simulationsByUserId.get(userId);
			if (!data) return;
			try {
				for (const simId of data.activeSimulationIds) {
					await stopSimulation(simId);
				}
				await refetchSimulations();
			} catch {
				// Ошибка обрабатывается в UI при необходимости
			}
		},
		[simulationsByUserId, refetchSimulations],
	);

	return (
		<>
			{role === 'student' ? (
				<section className={styles.training}>
					Недоступно для студента
				</section>
			) : (
				<section className={styles.training}>
					<div className={styles.training__title}>{nameList}</div>
					<div
						className={styles.training__cards}
						key={updateListNumber}
					>
						{users.map(user => {
							const simData =
								simulationsByUserId.get(user.id) ?? {
									hasActiveSimulation: false,
									activeSimulationIds: [],
								};
							return (
								<UserCard
									key={user.id}
									data={user}
									className={styles.training__cards__card}
									hasActiveSimulation={
										simData.hasActiveSimulation
									}
									onDeleteSimulation={() =>
										handleDeleteSimulation(user.id)
									}
								/>
							);
						})}
					</div>
				</section>
			)}

			{(isLoading || simulationsLoading) && <Loader />}
			{error && <ErrorMessage message={error} refetch={refetch} />}
		</>
	);
};

export default Training;
