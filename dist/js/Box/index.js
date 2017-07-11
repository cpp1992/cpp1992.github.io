'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Footer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Box = function Box(_ref) {
	var _ref$type = _ref.type,
	    type = _ref$type === undefined ? 'primary' : _ref$type,
	    title = _ref.title,
	    children = _ref.children,
	    footer = _ref.footer,
	    loading = _ref.loading,
	    toolBar = _ref.toolBar;

	var $head = void 0;
	var $body = void 0;
	var $footer = void 0;

	if (title || toolBar) {
		$head = _react2.default.createElement(
			'div',
			{ className: 'box-header with-border' },
			_react2.default.createElement(
				'h3',
				{ className: 'box-title' },
				title
			),
			toolBar && _react2.default.createElement(
				'div',
				{ className: 'box-header-tools' },
				toolBar
			)
		);
	}

	if (children) {
		$body = _react2.default.createElement(
			'div',
			{ className: 'box-body' },
			children
		);
	}

	if (footer) {
		$footer = (footer.type || {})._isBoxFooter ? footer : _react2.default.createElement(
			_Footer2.default,
			null,
			footer
		);
	}

	var $loading = loading ? _react2.default.createElement(
		'div',
		{ className: 'overlay' },
		_react2.default.createElement('span', { className: 'fa fa-refresh fa-spin' })
	) : null;

	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)('box', 'fry-box', 'box-' + type) },
		$head,
		$body,
		$footer,
		$loading
	);
};

Box.propTypes = {
	type: _propTypes2.default.string,
	title: _propTypes2.default.node,
	children: _propTypes2.default.node,
	footer: _propTypes2.default.node,
	loading: _propTypes2.default.bool,
	toolBar: _propTypes2.default.node
};

exports.Footer = _Footer2.default;
exports.default = Box;