import React from 'react';
import { FC } from 'react';
import styles from './styles.module.scss';

const HeaderWindow: FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.header__window}>
				<div className={styles.header__mail}>
					<div>
						<span>почта</span>
					</div>
					<div>
						<a href="">@mail.ru</a>
					</div>
					<div className={styles.header__massenger}>
						<div>
							<a href="">телега</a>
						</div>
						<div>
							<a href="">вотсап</a>
						</div>
						<div>
							<a href="">хабр</a>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default HeaderWindow;
