import {
	DIGITS,
	LETTERS,
	SPECIAL_CHARS,
} from '@/shared/configs/DataForPassword';
import { getRandomNumber } from '../getRandomNumber/getRandomNumber';

export const generateStringArray = (length: number): string => {
	const charset = LETTERS + DIGITS + SPECIAL_CHARS;
	let str = '';
	for (let j = 0; j < length; j++) {
		const num = getRandomNumber(0, charset.length - 1);
		const word = charset[num];
		str += word;
	}
	return str;
};
