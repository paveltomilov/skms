import {
	DIGITS,
	LETTERS_LOW,
	LETTERS_UP,
	SPECIAL_CHARS,
} from '@/shared/configs/DataForPassword';
import { getRandomNumber } from '../getRandomNumber/getRandomNumber';

export const getRandomPassword = (length: number): string => {
	function generate(): string {
		const charset = LETTERS_LOW + LETTERS_UP + DIGITS + SPECIAL_CHARS;
		let str = '';
		for (let j = 0; j < length; j++) {
			const num = getRandomNumber(0, charset.length - 1);
			const word = charset[num];
			str += word;
		}
		if (
			containsSubstring(str, DIGITS) &&
			containsSubstring(str, LETTERS_LOW) &&
			containsSubstring(str, LETTERS_UP) &&
			containsSubstring(str, SPECIAL_CHARS)
		) {
			return str;
		}
		return generate();
	}

	const password = generate();
	return password;
};

const containsSubstring = (text: string, substring: string): boolean => {
	return substring.split('').some(word => text.includes(word));
};
