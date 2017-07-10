export function capitalize(string = '', split = true) {
	const words = split ? string.split(/(?=[A-Z])/) : [string];

	return words.map((str) => {
		if (!str) return str;
		return str.charAt(0).toUpperCase() + str.slice(1);
	}).join(' ');
}

export default {};
