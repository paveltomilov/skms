import styles from './styles.module.scss';
import { FC } from 'react';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import { WindowsState } from '@/shared/configs/window';

interface Props {
	className?: string;
	windows: WindowsState;
}

const KAMidMid: FC<Props> = ({ className, windows }) => {
	return (
		<div className={cn(className, styles.container)}>
			<Window
				data={windows.w162}
				right
				colorText={'white'}
				className={styles.container_element}
			/>
			<Window
				data={windows.w164}
				right
				colorText={'white'}
				className={styles.container_element}
			/>
			<div className={styles.container_element}>
				<span className={styles.container_element__item}>Топка</span>
				<span className={styles.container_element__item}></span>
				<span className={styles.container_element__item}>
					Потускнение факела
				</span>
			</div>
			<Window
				data={windows.w163}
				right
				colorText={'white'}
				className={styles.container_element}
			/>
			<div className={styles.container_element}>
				<Window
					data={windows.w165}
					right
					color={'yellow'}
					className={styles.container_element__item}
				/>
				<Window
					data={windows.w166}
					right
					left
					textLeft={'А'}
					className={styles.container_element__item}
				/>
				<Window
					data={windows.w167}
					right
					left
					textLeft={'Б'}
					className={styles.container_element__item}
				/>
				<Window
					data={windows.w168}
					right
					color={'yellow'}
					className={styles.container_element__item}
				/>
			</div>
			<Window
				data={windows.w169}
				right
				colorText={'white'}
				className={styles.container_element}
			/>
			<div className={styles.container_element}>
				<span className={styles.container_element__item}>ПВ</span>
				<span className={styles.container_element__item}>ВЭК</span>
			</div>
			<Window
				data={windows.w170}
				right
				left
				textLeft={'O2'}
				colorText={'white'}
				className={styles.container_element}
			/>
			<div className={styles.container_element}>
				<Window
					data={windows.w171}
					right
					left
					textLeft={'O2'}
					colorText={'white'}
					className={styles.container_element__item}
				/>
				<Window
					data={windows.w172}
					right
					colorText={'white'}
					className={styles.container_element__item}
				/>
				<Window
					data={windows.w173}
					right
					colorText={'white'}
					className={styles.container_element__item}
				/>
			</div>
		</div>
	);
};

export default KAMidMid;
