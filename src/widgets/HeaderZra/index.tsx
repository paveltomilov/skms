'use client';
import { FC } from 'react';
import style from './styles.module.scss';
import Button from '@/shared/UI/Button';
import GateWindow from '@/entities/GateWindow';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useGateControlButtons } from '@/shared/hooks/useGateControlButtons';

const HeaderZra: FC = () => {
	const session = useSession();

	const {
		handleButton,
		stopGateMovement,
		closeKruzapDisabled,
		openKruzapDisabled,
		closePtkDisabled,
		openPtkDisabled,
		stopPtkDisabled,
		closePtkActive,
		openPtkActive,
	} = useGateControlButtons('g1');

	return (
		<header className={style.header}>
			<div className={style.wrapper}>
				<span className={style.defense}>Работа защит</span>

				{/* временно пока не появится в макете кнопка для выхода */}
				{session.data?.user ? (
					<button onClick={() => signOut({ callbackUrl: '/login' })}>
						выйти
					</button>
				) : (
					<Link href={'/login'}>войти</Link>
				)}

				<div className={style.part}>
					<span className={style.name}>птк</span>
					<Button
						width={105}
						height={38}
						text="Закрыть"
						disabled={closePtkDisabled}
						active={closePtkActive}
						onClick={() => handleButton('ptk', 'close')}
					/>
					<Button
						width={70}
						height={38}
						text="Стоп"
						disabled={stopPtkDisabled}
						onClick={() => stopGateMovement('ptk')}
					/>
					<Button
						width={106}
						height={38}
						text="Открыть"
						disabled={openPtkDisabled}
						active={openPtkActive}
						onClick={() => handleButton('ptk', 'open')}
					/>
				</div>

				<GateWindow />

				<div className={style.part}>
					<Button
						width={105}
						height={38}
						text="Закрыть"
						disabled={closeKruzapDisabled}
						onMouseDown={() => handleButton('kruzap', 'close')}
						onMouseUp={() => stopGateMovement('kruzap')}
					/>
					<Button
						width={106}
						height={38}
						text="Открыть"
						disabled={openKruzapDisabled}
						onMouseDown={() => handleButton('kruzap', 'open')}
						onMouseUp={() => stopGateMovement('kruzap')}
					/>
					<span className={style.name}>Круза-п</span>
				</div>
			</div>
		</header>
	);
};

export default HeaderZra;
