import { getValue } from './pathUtil';

function findIndex(val, list, path, findAll, caseSensitive) {
	const _list = [];
	const match = caseSensitive === false ? (`${val}`).toUpperCase() : val;

	for (let i = 0; i < list.length; i += 1) {
		const unit = list[i];
		let _val = getValue(unit, path);
		_val = caseSensitive === false ? (`${_val}`).toUpperCase() : _val;

		if (_val === match) {
			if (!findAll) return i;
			_list.push(i);
		}
	}

	return findAll ? _list : -1;
}

function sort(list, path, asc, customizeOrderList) {
	let sortFunc;
	const sortList = customizeOrderList || [];

	if (asc !== false) {
		sortFunc = (obj1, obj2) => {
			const val1 = getValue(obj1, path);
			const val2 = getValue(obj2, path);

			const index1 = findIndex(val1, sortList);
			const index2 = findIndex(val2, sortList);

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
		sortFunc = (obj1, obj2) => {
			const val1 = getValue(obj1, path);
			const val2 = getValue(obj2, path);

			const index1 = findIndex(val1, sortList);
			const index2 = findIndex(val2, sortList);

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
	findIndex,
	sort,
};
