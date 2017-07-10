"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var WIDTH_NUMBER_REGEX = exports.WIDTH_NUMBER_REGEX = /^\d+(\.\d+)?$/;

var toUnit = exports.toUnit = function toUnit(val) {
	var str = String(val);
	return WIDTH_NUMBER_REGEX.test(str) ? str + "px" : str;
};