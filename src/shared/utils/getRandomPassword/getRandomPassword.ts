import {
	DIGITS,
	LETTERS,
	SPECIAL_CHARS,
} from '@/shared/configs/DataForPassword';
import { getRandomNumber } from '../getRandomNumber/getRandomNumber';

export const getRandomPassword = (length: number): string => {
	function generate(): string {
		const charset = LETTERS + DIGITS + SPECIAL_CHARS;
		let str = '';
		for (let j = 0; j < length; j++) {
			const num = getRandomNumber(0, charset.length - 1);
			const word = charset[num];
			str += word;
		}
		if (hasDigit(str)) {
			return str;
		}
		return generate();
	}

	const password = generate();
	return password;
};

const hasDigit = (str: string): boolean => {
	return /\d/.test(str);
};
