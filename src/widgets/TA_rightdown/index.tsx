import styles from './style.module.scss';
import { FC } from 'react';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import { WindowsState } from '@/shared/configs/window';
import Button from '@/shared/UI/Button';
import Actuator from '@/shared/UI/Actuator';
import { rightBottomOne } from '@/shared/configs/TAGroupElements';
import useShowModal from '@/shared/hooks/useShowModal';
import { useAppSelector } from '@/shared/hooks/store';

interface Props {
	className?: string;
	windows: WindowsState;
}

const TARightDown: FC<Props> = ({ className, windows }) => {
	const handleModalNotification = useShowModal('notification');
	const percent = useAppSelector(store => store.percent);
	return (
		<div className={cn(className)}>
			<div className={styles.container}>
				<div className={styles.container_element}>
					<div
						className={styles.container_element_box}
						style={
							{
								'--dynamic-top': `${100 - percent}%`,
							} as React.CSSProperties
						}
					>
						<Window data={windows.w88} right />
						<span className={styles.container_element_box__text}>
							{windows.w88.title}
						</span>
					</div>
					<Button
						width={88}
						height={28}
						ariaLabel={'мс'}
						text={'мс'}
						className={styles.container_element_box__button}
						onClick={handleModalNotification}
					/>
					<div
						className={styles.container_element_box}
						style={
							{
								'--dynamic-top': `${100 - percent}%`,
							} as React.CSSProperties
						}
					>
						<Window data={windows.w89} right />
						<span className={styles.container_element_box__text}>
							{windows.w89.title}
						</span>
					</div>
				</div>
				{rightBottomOne.map((item, index) => (
					<div className={styles.container_element} key={index}>
						<Actuator
							state={item.state}
							transform={item.transform}
							disable={item.disabled}
						/>
						<span className={styles.container_element__text}>
							{item.text}
						</span>
					</div>
				))}
				<div className={styles.container_element}>
					<span className={styles.container_element__title}>
						НГП-1А
					</span>
					<Actuator state={'off'} disable={false} />
					<Actuator state={'off'} disable={false} />
					<span className={styles.container_element__title}>
						НГП-1Б
					</span>
				</div>
				<span className={styles.container_element}>к ВПУ</span>
				<span className={styles.container_element}>мо</span>
				<div className={styles.container_element}>
					<Window data={windows.w90} right />
					<Window data={windows.w92} right />
				</div>
				<span className={styles.container_element}>к подшипникам</span>
				<div className={styles.container_element}>
					<Actuator
						state={'off'}
						transform={'rotateLeft90'}
						disable={false}
					/>
					<span className={styles.container_element__text}>
						МНР-1А
					</span>
				</div>
				<div className={styles.container_element}>
					<Actuator
						state={'off'}
						transform={'rotateLeft90'}
						disable={false}
					/>
					<span className={styles.container_element__text}>
						МНР-1Б
					</span>
				</div>
				<div className={styles.container_element}>
					<Window data={windows.w91} right />
					<Window data={windows.w93} right />
				</div>
				<span className={styles.container_element}>
					на регулирование
				</span>
			</div>
		</div>
	);
};

export default TARightDown;
