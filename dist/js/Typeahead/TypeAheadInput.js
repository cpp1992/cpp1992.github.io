'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TypeAheadInput = (0, _index2.default)(function (_ref) {
	var props = _objectWithoutProperties(_ref, []);

	return _react2.default.createElement('input', _extends({ type: 'text', className: 'form-control' }, props));
});

TypeAheadInput.propTypes = {
	queryFunc: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.array]).isRequired,
	value: _propTypes2.default.string,
	onChange: _propTypes2.default.func,
	onSelectValue: _propTypes2.default.func
};

exports.default = TypeAheadInput;