'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _A = require('../A');

var _A2 = _interopRequireDefault(_A);

var _Footer = require('../Box/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_React$Component) {
	_inherits(Tabs, _React$Component);

	function Tabs() {
		_classCallCheck(this, Tabs);

		var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this));

		_this.onTabClick = function (event, props) {
			var onTabChange = _this.props.onTabChange;

			var current = props['data-index'];
			if (_this.state.current !== current) {
				_this.setState({ current: current }, function () {
					if (onTabChange) onTabChange(_this.getList()[current]);
				});
			}
		};

		_this.getList = function () {
			var _this$props = _this.props,
			    children = _this$props.children,
			    list = _this$props.list;

			if (list) return list;

			var tabList = children ? _react2.default.Children.map(children, function (cell) {
				if ((typeof cell === 'undefined' ? 'undefined' : _typeof(cell)) !== 'object' || cell === null) return null;

				var _ref = cell.props || {},
				    content = _ref.content,
				    cellChildren = _ref.children,
				    props = _objectWithoutProperties(_ref, ['content', 'children']);

				return _extends({
					content: content || cellChildren
				}, props);
			}) : [];

			return tabList.filter(function (tab) {
				return tab;
			});
		};

		_this.state = {
			current: 0
		};
		return _this;
	}

	_createClass(Tabs, [{
		key: 'getCurrentTab',
		value: function getCurrentTab() {
			var current = this.state.current;

			var list = this.getList();
			return list[current];
		}
	}, {
		key: 'setCurrentTab',
		value: function setCurrentTab(index) {
			this.setState({ current: index });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    className = _props.className,
			    isPill = _props.isPill,
			    isBox = _props.isBox,
			    hasContent = _props.hasContent,
			    toolBar = _props.toolBar,
			    footer = _props.footer,
			    loading = _props.loading,
			    onlyOne = _props.onlyOne;
			var current = this.state.current;

			var list = this.getList();
			var $content = void 0;

			if (hasContent !== false) {
				$content = _react2.default.createElement(
					'div',
					{ className: 'tab-content' },
					list.map(function (tab, index) {
						var content = tab.content,
						    tabClass = tab.className;

						if (content && (!onlyOne || current === index)) {
							return _react2.default.createElement(
								'div',
								{ className: (0, _classnames2.default)('tab-pane', { active: current === index }, tabClass), key: index },
								content
							);
						}
						return null;
					})
				);
			}

			var $footer = void 0;
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
				{ className: (0, _classnames2.default)(className, 'fry-tabs', isBox && 'nav-tabs-custom overlay-wrapper') },
				_react2.default.createElement(
					'ul',
					{ className: (0, _classnames2.default)('nav', isPill ? 'nav-pills' : 'nav-tabs') },
					list.map(function (_ref2, index) {
						var name = _ref2.name;
						return _react2.default.createElement(
							'li',
							{ className: (0, _classnames2.default)({ active: current === index }), key: index },
							_react2.default.createElement(
								_A2.default,
								{ role: 'button', onClick: _this2.onTabClick, 'data-index': index },
								name
							)
						);
					}),
					toolBar && _react2.default.createElement(
						'div',
						{ className: 'fry-tabs-tools' },
						toolBar
					)
				),
				$content,
				$footer,
				$loading
			);
		}
	}]);

	return Tabs;
}(_react2.default.Component);

Tabs.propTypes = {
	className: _propTypes2.default.string,
	isPill: _propTypes2.default.bool,
	isBox: _propTypes2.default.bool,
	hasContent: _propTypes2.default.bool,
	list: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		name: _propTypes2.default.node
	})),
	toolBar: _propTypes2.default.node,
	footer: _propTypes2.default.node,
	loading: _propTypes2.default.bool,
	children: _propTypes2.default.node,
	onlyOne: _propTypes2.default.bool,

	onTabChange: _propTypes2.default.func
};

exports.default = Tabs;