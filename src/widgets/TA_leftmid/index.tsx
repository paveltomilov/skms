import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';
import classNames from 'classnames';
import Rectangle from '@/shared/UI/icons/Rectangle';


interface Props {
	className?: string;
}

const TAleftmid: FC<Props> = ({ className })=> {
	return (
		<> 
		<div className={classNames(className)}>
			<div className={styles.container}>
				<h2 className={classNames(styles['container__p2'])}>
					Свежий пар
				</h2>
				<h3
					className={classNames(
						styles['container__p1'],
						styles['container__p1--modifierA'],
					)}
				>
					А
				</h3>

				<div
					className={classNames(
						styles['container__window'],
						styles['container__window--left'],
					)}
				>
					<Window color="blue" value={239.7} textRight="т/ч" />
					<Window color="blue" value={544} textRight="°С" />
				</div>

				<Gate state="open" className={styles.gate} />

				<h4 className={styles['container__p3']}>ГП3-А</h4>

				<div
					className={classNames(
						styles['container__window'],
						styles['container__window--right'],
					)}
				>
					<Window color="blue" value={13} textRight="МПа" />
					<Window color="blue" value={544} textRight="°С" />
				</div>
				<p className={styles['container__window-p']}>СКВД-1</p>
			</div>
			<div className={styles.containerTwo}>
				<h3 className={styles['containerTwo__p']}>ХПП</h3>
				<div className={styles['containerTwo__window']}>
					<Window color="blue" value={239.7} textRight="МПа" />
					<Window color="blue" value={544} textRight="°С" />
				</div>
			</div>
			<div className={styles.containerThree}>
				<h4 className={styles['containerThree__p']}>в котел</h4>
				<Button width={88} height={28} text="ПИТ" />
			</div>

			<div className={styles.containerFour}>
				<div className={styles['containerFour__window']}>
					<Window color="blue" value={489.0} textRight="т/ч" />
					<Window color="blue" value={18.3} textRight="МПа" />
					<Window color="blue" value={544} textRight="°С" />

					<Gate
						state="open"
						position="vertical"
						className={styles['containerFour__window-gate']}
					/>

					<p className={styles['containerFour__window-p']}>1ПВ-5</p>
				</div>

				<h4 className={styles['containerFour__p']}>КСН</h4>
				<Button width={88} height={28} text="РОУ" />

				<div className={styles['containerFour__windowOne']}>
					<Window color="blue" value={1.05} textRight="МПа" />
					<Window color="blue" value={242} textRight="°С" />
				</div>

				<div className={styles['containerFour__windowTwo']}>
					<Window color="blue" value={0} textRight="%" />
					<Rectangle
						color="white"
						className={styles['containerFour__windowTwo-rectangle']}
					/>
				</div>

				<div className={styles['containerFour__windowThree']}>
					<h5 className={styles['containerFour__windowThree-p2']}>
						IV отб.
					</h5>
					<div className={styles['containerFour__windowThree-w']}>
						<Window color="blue" value={0.35} textRight="МПа" />
					</div>
					<h5 className={styles['containerFour__windowThree-p3']}>
						ДПВ
					</h5>
				</div>
			</div>
			</div>
		</>
	);
};

export default TAleftmid;
