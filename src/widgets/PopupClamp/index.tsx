import Provod from '@/shared/UI/Provod';
import styles from './style.module.scss';
import ProvodConstructor from '@/shared/UI/ProvodConstructor';
import ScrewConnection from '@/shared/UI/ScrewConnection';
import Screw from '@/shared/UI/icons/Screw';

const PopupClamp = () => {
	return (
		<div className={styles.popup}>
			<div className={styles.contact}>
				<div className={styles.clamp}>
					<div className={styles.topLeft}>
						<Provod
							className={styles.topLeft__provod}
							length={40}
							marker="A"
							rotate={90}
							isBreak={false}
						/>
						<ProvodConstructor
							className={styles.topLeft__provodTop}
							provod_B={0}
							turn_A="180"
						/>

						<ScrewConnection
							className={styles.topLeft__screw}
							provodLocation="left"
							textRight="A"
						/>
						<ProvodConstructor
							className={styles.topLeft__provodRight}
							provod_B={0}
							rotate="0"
							turn_A="0"
						/>
					</div>
					<div className={styles.centerLeft}>
						<Provod
							className={styles.centerLeft__provod}
							length={86}
							rotate={90}
							isBreak={false}
							marker="B"
						/>

						<ScrewConnection
							className={styles.centerLeft__screw}
							provodLocation="left"
							textRight="B"
						/>
					</div>
					<div className={styles.clamp__centerRight}></div>
					<div className={styles.bottomLeft}>
						<Provod
							className={styles.bottom__provod}
							length={40}
							marker="C"
							rotate={90}
							isBreak={false}
						/>
						<ProvodConstructor
							className={styles.bottom__provodTop}
							provod_B={0}
							turn_A="90"
						/>
					</div>

					<div className={styles.fog}>
						<ScrewConnection
							className={styles.bottom__screw}
							provodLocation="left"
							textRight="C"
						/>
						<ProvodConstructor
							className={styles.bottom__provodRight}
							provod_B={0}
							rotate="270"
							turn_A="0"
						/>
					</div>
					<Screw className={styles.screw} />
					<ProvodConstructor
						className={styles.provod__top}
						provod_B={-1}
						turn_A="180"
						turn_B="90"
					/>
				</div>
			</div>
		</div>
	);
};

export default PopupClamp;
