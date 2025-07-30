import { FC } from 'react';
import styles from './styles.module.scss';

interface CommandItem {
	left: string;
	right: string;
}

interface DataProps {
	title: string;
	blockData: {
		id: string;
		number: string;
	}[];
	commands: string[];
	status: string;
	commandItems: CommandItem[];
	decorativeCount: number;
	decorativeMaxIndices: number[]; // индексы элементов, которые нужно выделить
	commandButtons: { left: string; right: string }[];
}

const data: DataProps = {
	title: '3 ДВ на тр-де рециркуляции пит воды из барабана',
	blockData: [{ id: 'H1H2AD10AA001ZU03', number: '222222222222' }],
	commands: ['cmd_im2', 'auto', 'dist', 'open', 'close', 'stop', 'pos'],
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
		<div className={styles.content}>
			{/* Заголовок или описание */}
			<p className={styles.text}>
				<span className={styles.textSpan}>{title}</span>
			</p>

			<div className={styles.container}>
				{/* Первый блок данных */}
				{blockData.map(block => (
					<div key={block.id} className={styles.blocknephritis}>
						<p className={styles.right}>{block.id}</p>
						<p className={styles.left}>{block.number}</p>
					</div>
				))}

				{/* Разделитель */}
				<p className={styles.spanDecoretion}></p>

				{/* Центр команд */}
				<div className={styles.commandCenter}>
					{commands.map(cmd => (
						<p key={cmd} className={styles.commandBlockCenter}>
							{cmd}
						</p>
					))}
					{/* Статус */}
					<div className={styles.commandBlockCenter}>
						<p className={styles.right}>status</p>
						<p className={styles.leftCommand}>{status}</p>
					</div>
				</div>

				{/* Вихревые декоративные элементы */}
				<div className={styles.spanBlue}>
					{[...Array(decorativeCount).keys()].map(i => (
						<p
							key={i}
							className={[
								styles['spanMinDocoration'],
								decorativeMaxIndices.includes(i)
									? styles['spanMaxDocoration']
									: styles['spanMinDocoration'],
							].join(' ')}
						></p>
					))}
				</div>

				{/* Блок командных элементов */}
				<div className={styles.commandRight}>
					{commandItems.map((item, index) => (
						<div key={index} className={styles.block}>
							<p className={styles.rightCommandRight}>
								{item.left}
							</p>
							<p className={styles.leftCommandRight}>
								{item.right}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PopupGateValves;
