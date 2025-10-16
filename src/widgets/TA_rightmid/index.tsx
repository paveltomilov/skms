import styles from './styles.module.scss';
import { FC } from 'react';
import cn from 'classnames';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import { WINDOWS } from '@/shared/configs/window';
import Rectangle from '@/shared/UI/icons/Rectangle';
import Actuator from '@/shared/UI/Actuator';
import {
	rightMidOne,
	rightMidThree,
	rightMidTwo,
} from '@/shared/configs/TAGroupElements';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
}

const TARightMid: FC<Props> = ({ className }) => {
	const handleModalNotification = useShowModal('notification');
	return (
		<div className={cn(className)}>
			<div className={styles.container}>
				<Button
					className={`${styles.container_element} ${styles.text}`}
					width={88}
					height={28}
					text={'конд'}
					ariaLabel={'конд'}
					onClick={handleModalNotification}
				/>
				<span className={styles.container_element}>
					<Window data={WINDOWS.w79} right />
					<span className={styles.text}>Конденсатор</span>
				</span>
				<div className={styles.container_element}>
					<Window data={WINDOWS.w84} right />
				</div>
				{rightMidOne.map((element, index) => (
					<div className={styles.container_element} key={index}>
						<Window
							color={element.color}
							data={{
								currentValue: element.value,
								maxValue: element.maxValue,
								minValue: element.minValue,
								unitsMeasurement: element.text,
							}}
							right
						/>
					</div>
				))}
				<span className={`${styles.container_element} ${styles.text}`}>
					Цирквода
				</span>
				{rightMidTwo.map((element, index) => (
					<div className={styles.container_element} key={index}>
						<Window
							color={element.color}
							data={{
								currentValue: element.value,
								maxValue: element.maxValue,
								minValue: element.minValue,
								unitsMeasurement: element.text,
							}}
							right
						/>
					</div>
				))}
				<Button
					className={styles.container_element}
					width={88}
					height={28}
					text={'эж'}
					ariaLabel={'эж'}
					onClick={handleModalNotification}
				/>
				{rightMidThree.map((element, index) => (
					<div key={index} className={styles.container_element}>
						<Actuator
							state={element.state}
							transform={element.transform}
							disable={element.disabled}
						/>
						<span className={styles.text}>{element.text}</span>
					</div>
				))}
				<span className={`${styles.container_element} ${styles.text}`}>
					1ок-2
				</span>
				<div className={styles.container_element}>
					<Window data={WINDOWS.w85} right />
				</div>
				<div className={styles.container_element}>
					<Window data={WINDOWS.w86} right />
				</div>
				<div className={styles.container_element}>
					<Window data={WINDOWS.w87} right />
				</div>
				<div className={styles.container_element}>
					<Rectangle />
					<span className={styles.text}>рук</span>
				</div>
			</div>
		</div>
	);
};

export default TARightMid;
