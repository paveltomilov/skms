import Screw from '@/shared/UI/icons/Screw';
import Marker from '@/shared/UI/Marker';
import Provod from '@/shared/UI/Provod';
import styles from './style.module.scss';
import ProvodLine from '@/shared/UI/icons/ProvodLine';

const PopupClamp = () => {
	return (
		<div className={styles.popup}>
			<div className={styles.contact}>
				<div className={styles.contact__left}>
					<div className={styles.left}>
						<Marker className={styles.left__marker} text="A" />
						{/* <Provod className={styles.left__provod} rotate={90} /> */}
						<ProvodLine
							className={styles.left__provod}
							length={111}
						/>
						<Screw className={styles.left__screw} />
					</div>
					<div className={styles.left}>
						<Marker className={styles.left__marker} text="B" />
						<Provod className={styles.left__provod} rotate={90} />
						<Screw className={styles.left__screw} />
					</div>
					<div className={styles.left}>
						<Marker className={styles.left__marker} text="C" />
						<Provod className={styles.left__provod} rotate={90} />
						<Screw className={styles.left__screw} />
					</div>
				</div>
				<div className={styles.contact__right}>
					<div className={styles.right}>
						<Screw className={styles.right__screw} />
						<Marker className={styles.right__marker} text="A" />
						<Provod className={styles.right__provod} rotate={270} />
					</div>
					<div className={styles.right}>
						<Screw className={styles.right__screw} />
						<Marker className={styles.right__marker} text="B" />
						<Provod className={styles.right__provod} rotate={270} />
					</div>
					<div className={styles.right}>
						<Screw className={styles.right__screw} />
						<Marker className={styles.right__marker} text="C" />
						<Provod className={styles.right__provod} rotate={270} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopupClamp;
