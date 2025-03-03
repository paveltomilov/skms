import path from 'path';

// для того чтобы через линтер прогонялись только измененные файлы
const buildEslintCommand = filenames =>
	`next lint --fix --file ${filenames
		.map(f => path.relative(process.cwd(), f))
		.join(' --file ')}`;

module.exports = {
	'*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
