import Provod from '@/shared/UI/Provod';
import styles from './style.module.scss';
import ProvodConstructor from '@/shared/UI/ProvodConstructor';
import ScrewConnection from '@/shared/UI/ScrewConnection';

const PopupClamp = () => {
	return (
		<div className={styles.popup}>
			<div className={styles.contact}>
				<div className={styles.clamp}>
					<div className={styles.top}>
						<Provod
							className={styles.top__provod}
							length={40}
							marker="A"
							rotate={90}
							retreatMarker={20}
							isBreak={false}
						/>
						<ProvodConstructor
							className={styles.top__provodTop}
							provod_B={0}
							turn_A="180"
						/>

						<ScrewConnection
							className={styles.top__screw}
							provodLocation="left"
							textRight="A"
						/>
						<ProvodConstructor
							className={styles.top__provodRight}
							provod_B={0}
							rotate="0"
							turn_A="0"
						/>
						<ScrewConnection
							className={styles.top__connect}
							provodLocation="left"
						/>
						<ProvodConstructor
							className={styles.top__topA}
							provod_B={-1}
							turn_A="90"
						/>
						<ProvodConstructor
							className={styles.top__topB}
							provod_B={-1}
							turn_A="180"
						/>
					</div>
					<div className={styles.center}>
						<Provod
							className={styles.center__provod}
							length={86}
							rotate={90}
							isBreak={false}
							marker="B"
							retreatMarker={20}
						/>

						<ScrewConnection
							className={styles.center__screw}
							provodLocation="left"
							textRight="B"
						/>
						<ScrewConnection
							className={styles.top__connect}
							provodLocation="left"
						/>
						<ProvodConstructor
							className={styles.center__topA}
							provod_B={0}
							turn_A="90"
						/>

						<ProvodConstructor
							className={styles.center__topB}
							provod_B={-1}
							turn_A="180"
						/>
					</div>
					<div className={styles.bottom}>
						<Provod
							className={styles.bottom__provod}
							length={40}
							marker="C"
							rotate={90}
							isBreak={false}
							retreatMarker={20}
						/>
						<ProvodConstructor
							className={styles.bottom__provodTop}
							provod_B={0}
							turn_A="90"
						/>
						<ProvodConstructor
							className={styles.bottom__provodRight}
							provod_B={0}
							turn_A="270"
						/>
						<ScrewConnection
							className={styles.bottom__connect}
							provodLocation="left"
						/>
						<ProvodConstructor
							className={styles.bottom__topA}
							provod_B={0}
							turn_A="90"
						/>

						<ProvodConstructor
							className={styles.bottom__topB}
							provod_B={-1}
							turn_A="180"
						/>
					</div>

					<ScrewConnection
						className={styles.bottom__screw}
						provodLocation="left"
						textRight="C"
					/>
				</div>
			</div>
		</div>
	);
};

export default PopupClamp;
