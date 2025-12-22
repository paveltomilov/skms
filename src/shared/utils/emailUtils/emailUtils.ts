export const isValidEmailDomain = (email: string): boolean => {
	const atIndex = email.lastIndexOf('@');
	if (atIndex === -1) return false;

	const domainPart = email.slice(atIndex + 1);

	const domainRegex =
		/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;

	return domainRegex.test(domainPart);
};
