import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import Button from '@/shared/UI/Button';
import {
	midTopGroupUp,
	midTopGroupDown,
} from '@/shared/configs/KAGroupElements';
import Rectangle from '@/shared/UI/icons/Rectangle';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
}

const KAMidTop: FC<Props> = ({ className }) => {
	const handleModalNotification = useShowModal('notification');
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windows__groupup}>
				{midTopGroupUp.map((element, index) => (
					<div className={styles.container_element} key={index}>
						<Window
							color={element.color}
							data={{
								currentValue: element.value,
								minValue: element.minValue,
								maxValue: element.maxValue,
								unitsMeasurement: element.text,
							}}
							right={!!element.text}
							left={!!element.prefix}
							textRight={element.text}
							textLeft={element.prefix}
						/>
					</div>
				))}
			</div>
			<div className={styles.windows__groupdown}>
				{midTopGroupDown.map((element, index) => (
					<div className={styles.container_element} key={index}>
						<Window
							color={element.color}
							data={{
								currentValue: element.value,
								minValue: element.minValue,
								maxValue: element.maxValue,
								unitsMeasurement: element.text,
							}}
							right={!!element.text}
							left={!!element.prefix}
							textRight={element.text}
							textLeft={element.prefix}
							colorText="white"
						/>
					</div>
				))}
			</div>
			<div className={styles.buttons}>
				<Button
					width={91}
					height={28}
					text="РПП"
					className={styles.buttons__left}
					onClick={handleModalNotification}
				></Button>
				<Button
					width={91}
					height={28}
					text="ПромПП"
					className={styles.buttons__midup}
					onClick={handleModalNotification}
				></Button>
				<Button
					width={91}
					height={28}
					text="ПП"
					className={styles.buttons__middown}
					onClick={handleModalNotification}
				></Button>
				<Button
					width={91}
					height={28}
					text="ТУРБ"
					className={styles.buttons__right}
					onClick={handleModalNotification}
				></Button>
				<Button
					width={167}
					height={27}
					text="Вентиляция топки"
					style={{ font: '12px' }}
					className={styles.buttons__white}
					onClick={handleModalNotification}
				></Button>
			</div>
			<div className={styles.rectangles}>
				<div className={styles.rectangles__title}>РКПП-А</div>
				<Rectangle
					color="disabled"
					outlined
					className={styles.rectangles__up}
				/>
				<Rectangle color="white" className={styles.rectangles__down} />
				<div className={styles.rectangles__title}>РКПП-А</div>
			</div>
			<div className={styles.labels}>
				<span className={styles.labels__left}>из ЦДВ</span>
				<span className={styles.labels__mid}>Авар.</span>
				<span className={styles.labels__right}>в ЦДВ</span>
			</div>
		</div>
	);
};

export default KAMidTop;
