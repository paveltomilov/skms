import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';

const TAleftmid: FC = () => {
	return (
		<>
			<div className={styles.container}>
				<p className={styles.container__p2}>Свежий пар</p>
				<p className={styles.container__p1__A}>А</p>
				<div className={styles.container__window__left}>
					<Window color={'blue'} value={239.7} textRight="т/ч" />
					<Window color={'blue'} value={544} textRight="°С" />
				</div>
				<Gate state={'open'} className={styles.gate} />
				<p className={styles.container__p3}>ГП3-А</p>
				<div className={styles.container__window__right}>
					<Window color={'blue'} value={13} textRight="МПа" />
					<Window color={'blue'} value={544} textRight="°С" />
				</div>
				<p className={styles.container__window__right__p}>СКВД-1</p>
			</div>
			<div className={styles.container__two}>
				<p className={styles.container__two__p}>ХПП</p>
				<div className={styles.container__two__window}>
					<Window color={'blue'} value={239.7} textRight="МПа" />
					<Window color={'blue'} value={544} textRight=" °С" />
				</div>
			</div>
			<div className={styles.container__three}>
				<p className={styles.container__three__p}>в котел</p>
				<Button width={88} height={28} text="ПИТ" />
			</div>
			<div className={styles.container__four}>
				<div className={styles.container__four__window}>
					<Window color={'blue'} value={489.0} textRight="т/ч" />
					<Window color={'blue'} value={18.3} textRight="МПа" />
					<Window color={'blue'} value={544} textRight="°С" />
					<Gate state={'open'} position='vertical' className={styles.container__four__window__gate}/>
					<p className={styles.container__four__window__p}>1ПВ-5</p>
				</div>
				<p className={styles.container__four__p}>КСН</p>
				<Button width={88} height={28} text="РОУ" />
				<div className={styles.container__four__window__one}>
					<Window color={'blue'} value={1.05} textRight="МПа" />
					<Window color={'blue'} value={242} textRight="°С" />
				</div>
				<div className={styles.container__four__window__two}>
					<Window color={'blue'} value={0} textRight="°С" />
					<Gate
						state={'close'}
						className={styles.container__four__window__two__gate}
					/>
				</div>
				<div className={styles.container__four__window__three}>
					<p className={styles.container__four__window__three__p2}>
						IV отб.
					</p>
					<div className={styles.container__four__window__three__w}>
						<Window color={'blue'} value={0.35} textRight="МПа" />
					</div>

					<p className={styles.container__four__window__three__p3}>
						ДПВ
					</p>
				</div>
			</div>
		</>
	);
};

export default TAleftmid;
