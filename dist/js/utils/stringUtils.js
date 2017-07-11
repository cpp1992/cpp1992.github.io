'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.capitalize = capitalize;
function capitalize() {
	var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	var words = split ? string.split(/(?=[A-Z])/) : [string];

	return words.map(function (str) {
		if (!str) return str;
		return str.charAt(0).toUpperCase() + str.slice(1);
	}).join(' ');
}

exports.default = {};