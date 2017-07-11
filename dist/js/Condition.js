'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Else = exports.ElseIf = exports.If = exports.Default = exports.Case = exports.FRY_SWITCH_ELSE = exports.FRY_SWITCH_IF = exports.FRY_SWITCH_DEFAULT = exports.FRY_SWITCH_CASE = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pathUtil = require('./utils/pathUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FRY_SWITCH_CASE = exports.FRY_SWITCH_CASE = 'FRY_SWITCH_CASE';
var FRY_SWITCH_DEFAULT = exports.FRY_SWITCH_DEFAULT = 'FRY_SWITCH_DEFAULT';
var FRY_SWITCH_IF = exports.FRY_SWITCH_IF = 'FRY_SWITCH_IF';
var FRY_SWITCH_ELSE = exports.FRY_SWITCH_ELSE = 'FRY_SWITCH_ELSE';

var Case = exports.Case = function Case() {
	return null;
};
Case[FRY_SWITCH_CASE] = FRY_SWITCH_CASE;

var Default = exports.Default = function Default() {
	return null;
};
Default[FRY_SWITCH_DEFAULT] = FRY_SWITCH_DEFAULT;

var If = exports.If = function If() {
	return null;
};
If[FRY_SWITCH_IF] = FRY_SWITCH_IF;

var ElseIf = exports.ElseIf = If;

var Else = exports.Else = function Else() {
	return null;
};
Else[FRY_SWITCH_ELSE] = FRY_SWITCH_ELSE;

var Condition = function Condition(_ref) {
	var value = _ref.value,
	    is = _ref.is,
	    children = _ref.children;

	var subMatch = false;
	var $content = null;

	var nodeList = _react2.default.Children.toArray(children);
	nodeList.some(function () {
		var cell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		var isCase = !!(0, _pathUtil.getValue)(cell, ['type', FRY_SWITCH_CASE]);
		var isDefault = !!(0, _pathUtil.getValue)(cell, ['type', FRY_SWITCH_DEFAULT]);
		var isIf = !!(0, _pathUtil.getValue)(cell, ['type', FRY_SWITCH_IF]);
		var isElse = !!(0, _pathUtil.getValue)(cell, ['type', FRY_SWITCH_ELSE]);

		if (isCase) {
			if (value === cell.props.value) {
				$content = cell.props.children;
				return true;
			}
		} else if (isIf) {
			if (cell.props.value) {
				$content = cell.props.children;
				return true;
			}
		} else if (isDefault) {
			$content = cell.props.children;
			return true;
		} else if (isElse) {
			$content = cell.props.children;
			return true;
		}

		if (isCase || isIf || isDefault || isElse) {
			subMatch = true;
		}

		return false;
	});

	if (subMatch) {
		return $content;
	}
	return is ? children : null;
};

var valueType = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.object, _propTypes2.default.array, _propTypes2.default.func]);

Case.propTypes = If.propTypes = ElseIf.propTypes = {
	value: valueType,
	children: _propTypes2.default.node
};

Default.propTypes = Else.propTypes = {
	children: _propTypes2.default.node
};

Condition.propTypes = {
	value: valueType,
	is: valueType,
	children: _propTypes2.default.node
};

exports.default = Condition;