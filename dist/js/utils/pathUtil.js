'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getValue = exports.getValue = function getValue(unit, path, defaultValue) {
	var desList = Array.isArray(path) ? path : [path];
	var current = unit;
	var len = desList.length;

	for (var i = 0; i < len; i += 1) {
		var des = desList[i];
		current = current[des];

		if (current === undefined) {
			current = defaultValue;
			break;
		}
	}

	return current;
};

var setValue = exports.setValue = function setValue(unit, path, value) {
	var desList = Array.isArray(path) ? path : [path];
	var preLen = desList.length - 1;
	var current = unit;

	for (var i = 0; i < preLen; i += 1) {
		var des = desList[i];
		var tmp = current[des];
		if (tmp === null || tmp === undefined) {
			current = current[des] = typeof des === 'number' ? [] : {};
		} else if ((typeof tmp === 'undefined' ? 'undefined' : _typeof(tmp)) === 'object') {
			current = current[des];
		} else {
			throw new Error(des + ' is not an object!');
		}
	}

	current[desList[preLen]] = value;

	return unit;
};

var updateValue = exports.updateValue = function updateValue(unit, path, updateFunc) {
	var desList = Array.isArray(path) ? path : [path];
	var preLen = desList.length - 1;
	var instance = Array.isArray(unit) ? [].concat(_toConsumableArray(unit)) : _extends({}, unit);
	var current = instance;
	var des = void 0;

	for (var i = 0; i < preLen; i += 1) {
		des = desList[i];
		var value = current[des];
		current = current[des] = Array.isArray(value) ? [].concat(_toConsumableArray(value)) : _extends({}, value);
	}

	current[desList[preLen]] = typeof updateFunc === 'function' ? updateFunc(current[desList[preLen]]) : updateFunc;

	return instance;
};