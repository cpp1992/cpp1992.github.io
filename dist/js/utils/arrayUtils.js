'use strict';

var _pathUtil = require('./pathUtil');

function findIndex(val, list, path, findAll, caseSensitive) {
	var _list = [];
	var match = caseSensitive === false ? ('' + val).toUpperCase() : val;

	for (var i = 0; i < list.length; i += 1) {
		var unit = list[i];
		var _val = (0, _pathUtil.getValue)(unit, path);
		_val = caseSensitive === false ? ('' + _val).toUpperCase() : _val;

		if (_val === match) {
			if (!findAll) return i;
			_list.push(i);
		}
	}

	return findAll ? _list : -1;
}

function sort(list, path, asc, customizeOrderList) {
	var sortFunc = void 0;
	var sortList = customizeOrderList || [];

	if (asc !== false) {
		sortFunc = function sortFunc(obj1, obj2) {
			var val1 = (0, _pathUtil.getValue)(obj1, path);
			var val2 = (0, _pathUtil.getValue)(obj2, path);

			var index1 = findIndex(val1, sortList);
			var index2 = findIndex(val2, sortList);

			if (index1 !== -1 && index2 === -1) {
				return -1;
			} else if (index1 === -1 && index2 !== -1) {
				return 1;
			} else if (index1 !== -1 && index2 !== -1) {
				return index1 - index2;
			}

			if (val1 === val2) {
				return 0;
			} else if (val1 === null || val1 === undefined || val1 < val2) {
				return -1;
			}
			return 1;
		};
	} else {
		sortFunc = function sortFunc(obj1, obj2) {
			var val1 = (0, _pathUtil.getValue)(obj1, path);
			var val2 = (0, _pathUtil.getValue)(obj2, path);

			var index1 = findIndex(val1, sortList);
			var index2 = findIndex(val2, sortList);

			if (index1 !== -1 && index2 === -1) {
				return -1;
			} else if (index1 === -1 && index2 !== -1) {
				return 1;
			} else if (index1 !== -1 && index2 !== -1) {
				return index1 - index2;
			}

			if (val1 === val2) {
				return 0;
			} else if (val1 === null || val1 === undefined || val1 < val2) {
				return 1;
			}
			return -1;
		};
	}

	return list.sort(sortFunc);
}

module.exports = {
	findIndex: findIndex,
	sort: sort
};