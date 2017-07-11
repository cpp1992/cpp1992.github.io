'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FRY_BUTTON = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PropsComponent = require('../PropsComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FRY_BUTTON = exports.FRY_BUTTON = 'FRY_BUTTON';

var Button = function Button(_ref) {
	var className = _ref.className,
	    _ref$type = _ref.type,
	    type = _ref$type === undefined ? 'primary' : _ref$type,
	    size = _ref.size,
	    active = _ref.active,
	    children = _ref.children,
	    props = _objectWithoutProperties(_ref, ['className', 'type', 'size', 'active', 'children']);

	return _react2.default.createElement(
		'button',
		_extends({
			className: className || (0, _classnames2.default)('btn', 'btn-' + type, size && 'btn-' + size, active && 'active')
		}, props),
		children
	);
};

Button.propTypes = {
	type: _propTypes2.default.string,
	size: _propTypes2.default.string,
	active: _propTypes2.default.bool,
	onClick: _propTypes2.default.func,
	className: _propTypes2.default.string,
	children: _propTypes2.default.node
};

var PropsButton = (0, _PropsComponent.withProps)(Button);

PropsButton[FRY_BUTTON] = FRY_BUTTON;

exports.default = PropsButton;