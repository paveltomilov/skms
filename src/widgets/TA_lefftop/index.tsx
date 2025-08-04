import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import { GATES } from '@/shared/configs/gate';

interface Props {
	className?: string;
}

const TALeftTop: FC<Props> = ({ className }) => {
	const { name, state } = GATES.g1;

	return (
		<div className={cn(className, styles.container)}>
			<Button width={88} height={28} text={'КА'} />
			<p className={styles.container__p1}>ГПП</p>
			<div className={styles.windowTop}>
				<Window
					color={'blue'}
					value={1.63}
					textRight="МПа"
					className={styles.windowTop__right}
				/>
				<Window
					color={'blue'}
					value={544}
					textRight="°С"
					className={styles.windowTop__right}
				/>
			</div>
			<div className={styles.windowMedium__p2}>
				<p className={styles.windowMedium__p2__B}>Б</p>
				<p className={styles.windowMedium__p3}>Свежий пар</p>
			</div>
			<div className={styles.windowMedium__left}>
				<Window color={'blue'} value={238.6} textRight="т/ч" />
				<Window color={'blue'} value={539} textRight="°С" />
			</div>
			<Gate state={state} textBottom={name} className={styles.gate} />
			<div className={styles.windowMedium__right}>
				<Window color={'blue'} value={13.0} textRight="МПа" />
				<Window color={'blue'} value={540} textRight="°С" />
				<p className={styles.windowMedium__right__p}>СКВД-2</p>
			</div>
			<div className={styles.windowMediumBottom}>
				<p className={styles.windowMediumBottom__p1}>ХПП</p>
				<Window
					color={'blue'}
					value={1.87}
					textRight="МПа"
					className={styles.windowMediumBottom__one}
				/>
				<div className={styles.windowMediumBottom__two}>
					<Window color={'blue'} value={311} textRight="°С" />
					<Window
						color={'blue'}
						value={7.4}
						textRight="МПа"
						className={styles.windowMediumBottom__three}
					/>
				</div>
				<div className={styles.windowMediumBottom__four}>
					<Window color={'blue'} value={0.38} textRight="мм" />
					<Window color={'blue'} value={2999} textBottom="об/мин" />
					<p className={styles.windowMediumBottom__p2}>ЦВД</p>
				</div>
			</div>
			<div className={styles.windowBottom}>
				<p>ГПП</p>
				<div className={styles.windowBottom__right}>
					<Window color={'blue'} value={1.86} textRight="МПа" />
					<div className={styles.windowBottom__right__bottom}>
						<Window color={'blue'} value={303} textRight="°С" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TALeftTop;
