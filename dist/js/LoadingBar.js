'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingIcon = function LoadingIcon(_ref) {
	var _ref$type = _ref.type,
	    type = _ref$type === undefined ? 'primary' : _ref$type,
	    hide = _ref.hide,
	    className = _ref.className,
	    style = _ref.style;

	if (hide) return null;

	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)('progress active', className), style: style },
		_react2.default.createElement('div', { className: (0, _classnames2.default)('progress-bar progress-bar-' + type + ' progress-bar-striped'), style: { width: '100%' } })
	);
};

LoadingIcon.propTypes = {
	className: _propTypes2.default.string,
	style: _propTypes2.default.object,
	type: _propTypes2.default.string,
	hide: _propTypes2.default.bool
};

exports.default = LoadingIcon;