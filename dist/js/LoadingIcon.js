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
	var _ref$icon = _ref.icon,
	    icon = _ref$icon === undefined ? 'refresh' : _ref$icon,
	    hide = _ref.hide;

	if (hide) {
		return null;
	}
	return _react2.default.createElement('span', { className: (0, _classnames2.default)('fa fa-' + icon + ' fa-spin') });
};

LoadingIcon.propTypes = {
	icon: _propTypes2.default.string,
	hide: _propTypes2.default.bool
};

exports.default = LoadingIcon;