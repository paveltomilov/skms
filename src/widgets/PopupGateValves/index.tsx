import { FC } from 'react';
import styles from './styles.module.scss';

interface CommandItem {
	left: string;
	right: string;
}

interface DataProps {
	title: string;
	blockData: { id: string; number: string }[];
	commands: string[];
	status: string;
	commandItems: CommandItem[];
	decorativeCount: number;
	decorativeMaxIndices: number[];
	commandButtons: { left: string; right: string }[];
}

const data: DataProps = {
	title: '3 ДВ на тр-де рециркуляции пит воды из барабана',
	blockData: [{ id: 'H1H2AD10AA001ZU03', number: '222222222222' }],
	commands: [
		'cmd_im2',
		'auto',
		'dist',
		'open',
		'close',
		'stop',
		'pos',
		'status',
	],
	status: 'reset',
	commandItems: [
		{ left: 'duOpen.234234', right: 'FALSE' },
		{ left: 'duClose.234234', right: 'FALSE' },
		{ left: 'duStop.234234', right: 'FALSE' },
		{ left: 'reset.234234', right: 'FALSE' },
	],
	decorativeCount: 7,
	decorativeMaxIndices: [2, 3, 4, 6],
	commandButtons: [
		{ left: 'duOpen.234234', right: 'FALSE' },
		{ left: 'duClose.234234', right: 'FALSE' },
		{ left: 'duStop.234234', right: 'FALSE' },
		{ left: 'reset.234234', right: 'FALSE' },
	],
};

const PopupGateValves: FC = () => {
	const {
		title,
		blockData,
		commands,
		status,
		commandItems,
		decorativeCount,
		decorativeMaxIndices,
	} = data;

	return (
		<>
			{/* Заголовок */}
			<header className={styles.header}>
				<h2 className={styles.header__text}>{title}</h2>
			</header>

			<section className={styles.container}>
				{/* Первый блок данных */}
				{blockData.map(block => (
					<div key={block.id} className={styles.blocknephritis}>
						<p className={styles.right}>{block.id} </p>
						<p className={styles.left}>{block.number}</p>
					</div>
				))}

				<hr className={styles.spanDecoretion} />

				{/* Центр команд */}
				<section className={styles.commandCenter}>
					<ul>
						{commands.map(cmd => (
							<li key={cmd} className={styles.commandBlockCenter}>
								{cmd === 'status' ? (
									<>
										<span className={styles.right}>
											status
										</span>
										<br />
										<span className={styles.leftCommand}>
											{status}
										</span>
									</>
								) : (
									cmd
								)}
							</li>
						))}
					</ul>
				</section>

				{/* Вихревые декоративные элементы */}
				<div className={styles.hrBlue}>
					{[...Array(decorativeCount).keys()].map(i => (
						<hr
							key={i}
							className={[
								decorativeMaxIndices.includes(i)
									? styles.hrMaxDecoration
									: styles.hrMinDecoration,
							].join(' ')}
						/>
					))}
				</div>

				{/* Блок командных элементов */}
				<dl className={styles.commandRight}>
					{commandItems.map((item, index) => (
						<div key={index} className={styles.block}>
							<dt className={styles.rightCommandRight}>
								{item.left}
							</dt>
							<dd className={styles.leftCommandRight}>
								{item.right}
							</dd>
						</div>
					))}
				</dl>
			</section>
		</>
	);
};

export default PopupGateValves;
