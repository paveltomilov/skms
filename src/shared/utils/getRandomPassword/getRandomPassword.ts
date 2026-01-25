import {
	DIGITS,
	LETTERS_LOW,
	LETTERS_UP,
	SPECIAL_CHARS,
} from '@/shared/configs/DataForPassword';
import { getRandomNumber } from '../getRandomNumber/getRandomNumber';
import { passwordPattern } from '@/shared/configs/login';

export const getRandomPassword = (length: number): string => {
	function generate(): string {
		const charset = LETTERS_LOW + LETTERS_UP + DIGITS + SPECIAL_CHARS;
		let str = '';
		for (let j = 0; j < length; j++) {
			const num = getRandomNumber(0, charset.length - 1);
			const word = charset[num];
			str += word;
		}
		if (passwordPattern.test(str)) {
			return str;
		}
		return generate();
	}

	const password = generate();
	console.log(password);
	return password;
};
