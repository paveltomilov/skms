import Provod from '@/shared/UI/Provod';
import styles from './style.module.scss';
import ProvodConstructor from '@/shared/UI/ProvodConstructor';
import ScrewConnection from '@/shared/UI/ScrewConnection';

const PopupClamp = () => {
	return (
		<div className={styles.popup}>
			<div className={styles.contact}>
				<div className={styles.clamp}>
					<div className={styles.topLeft}>
						<Provod
							className={styles.topLeft__provod}
							length={101}
							marker="A"
							rotate={90}
							isBreak={false}
						/>
						<ProvodConstructor
							className={styles.topLeft__provodTop}
							provod_B={0}
							turn_A="180"
						/>
						<ProvodConstructor
							className={styles.topLeft__provodRight}
							provod_B={0}
							rotate="0"
							turn_A="0"
						/>
						<ScrewConnection
							className={styles.topLeft__Screw}
							provodLocation="left"
							textRight="A"
						/>
					</div>
					<div className={styles.clamp__topRight}></div>
					<div className={styles.centerLeft}>
						<Provod
							className={styles.centerLeft__provod}
							length={86}
							rotate={90}
						/>
						<ScrewConnection
							className={styles.centerLeft__screw}
							provodLocation="left"
							textRight="B"
						/>
					</div>
					<div className={styles.clamp__centerRight}></div>
					<div className={styles.clamp__bottomLeft}></div>
					<div className={styles.clamp__bottomRight}></div>
				</div>
			</div>
		</div>
	);
};

export default PopupClamp;
