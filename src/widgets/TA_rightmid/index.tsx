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

interface Props {
	className?: string;
}

const TARightMid: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className)}>
			<div className={styles.container}>
				<Button
					className={`${styles.container_element} ${styles.text}`}
					width={88}
					height={28}
					text={'конд'}
					ariaLabel={'конд'}
				/>
				<span className={styles.container_element}>
					<Window
						color={'blue'}
						value={WINDOWS.w79.currentValue}
						textRight={WINDOWS.w79.unitsMeasurement}
					/>
					<span className={styles.text}>Конденсатор</span>
				</span>
				<div className={styles.container_element}>
					<Window
						color={'blue'}
						value={WINDOWS.w84.currentValue}
						textRight={WINDOWS.w84.unitsMeasurement}
					/>
				</div>
				{rightMidOne.map((element, index) => (
					<div className={styles.container_element} key={index}>
						<Window
							color={element.color}
							value={element.value}
							textRight={element.text}
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
							value={element.value}
							textRight={element.text}
						/>
					</div>
				))}
				<Button
					className={styles.container_element}
					width={88}
					height={28}
					text={'эж'}
					ariaLabel={'эж'}
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
					<Window
						color={'blue'}
						value={WINDOWS.w85.currentValue}
						textRight={WINDOWS.w85.unitsMeasurement}
					/>
				</div>
				<div className={styles.container_element}>
					<Window
						color={'blue'}
						value={WINDOWS.w86.currentValue}
						textRight={WINDOWS.w86.unitsMeasurement}
					/>
				</div>
				<div className={styles.container_element}>
					<Window
						color={'blue'}
						value={WINDOWS.w87.currentValue}
						textRight={WINDOWS.w87.unitsMeasurement}
					/>
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
