'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MenuList = require('./MenuList');

var _MenuList2 = _interopRequireDefault(_MenuList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
	_inherits(Menu, _React$Component);

	function Menu() {
		_classCallCheck(this, Menu);

		var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

		_this.onContextMenu = function (event) {
			event.preventDefault();

			var _this$props$menu = _this.props.menu,
			    menu = _this$props$menu === undefined ? [] : _this$props$menu;

			_this.showMenu(menu, event.clientX, event.clientY);
		};

		_this.hideMenu = function () {
			_this.setState({ list: null });
		};

		_this.showMenu = function () {
			var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			var x = arguments[1];
			var y = arguments[2];

			setTimeout(function () {
				_this.setState({
					list: list,
					x: x,
					y: y
				});
			}, 0);
		};

		_this.state = {};
		return _this;
	}

	_createClass(Menu, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('click', this.hideMenu);
			window.addEventListener('contextmenu', this.hideMenu);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('click', this.hideMenu);
			window.removeEventListener('contextmenu', this.hideMenu);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    className = _props.className;
			var _state = this.state,
			    list = _state.list,
			    x = _state.x,
			    y = _state.y;


			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('fry-menu', className),
					onContextMenu: this.onContextMenu
				},
				children,
				list ? _react2.default.createElement(_MenuList2.default, { list: list, x: x, y: y, onMenuTrigger: this.hideMenu }) : null
			);
		}
	}]);

	return Menu;
}(_react2.default.Component);

Menu.propTypes = {
	className: _propTypes2.default.string,
	children: _propTypes2.default.node,
	menu: _propTypes2.default.array
};

exports.default = Menu;