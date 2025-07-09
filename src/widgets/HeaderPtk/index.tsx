'use client';
import { FC } from 'react';
import style from './styles.module.scss';

const HeaderPtk: FC = () => {
	return (
		<header className={style.header}>
			<div className={style.wrapper}>шапка птк</div>
		</header>
	);
};

export default HeaderPtk;
