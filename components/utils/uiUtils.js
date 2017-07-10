export const WIDTH_NUMBER_REGEX = /^\d+(\.\d+)?$/;

export const toUnit = (val) => {
	const str = String(val);
	return WIDTH_NUMBER_REGEX.test(str) ? `${str}px` : str;
};
