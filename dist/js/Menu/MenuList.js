'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PropsComponent = require('../PropsComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var onContextMenu = function onContextMenu(event) {
	event.preventDefault();
};

var Li = (_temp2 = _class = function (_React$Component) {
	_inherits(Li, _React$Component);

	function Li() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Li);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Li.__proto__ || Object.getPrototypeOf(Li)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Li, [{
		key: 'render',
		value: function render() {
			var props = _objectWithoutProperties(this.props, []);

			delete props.disabled;
			delete props.onItemTrigger;
			return _react2.default.createElement('li', _extends({ role: 'button' }, props, { onClick: this.onClick }));
		}
	}]);

	return Li;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.onClick = function () {
		var _props = _this2.props,
		    disabled = _props.disabled,
		    onClick = _props.onClick,
		    onItemTrigger = _props.onItemTrigger;

		if (!disabled) {
			if (onClick) onClick.apply(undefined, arguments);
			onItemTrigger();
		}
	};
}, _temp2);


Li.propTypes = {
	disabled: _propTypes2.default.bool,
	onClick: _propTypes2.default.func,
	onItemTrigger: _propTypes2.default.func
};

var PLi = (0, _PropsComponent.withProps)(Li);

var MenuList = function (_React$Component2) {
	_inherits(MenuList, _React$Component2);

	function MenuList() {
		_classCallCheck(this, MenuList);

		var _this3 = _possibleConstructorReturn(this, (MenuList.__proto__ || Object.getPrototypeOf(MenuList)).call(this));

		_this3.onClick = function (event) {
			event.stopPropagation();
		};

		_this3.onItemTrigger = function () {
			_this3.props.onMenuTrigger();
		};

		_this3.setMenuRef = function (ele) {
			_this3.$menu = ele;
		};

		_this3.relocate = function (_ref2) {
			var x = _ref2.x,
			    y = _ref2.y;

			_this3.setState({ x: x, y: y, show: false });

			setTimeout(function () {
				var rect = _this3.$menu.getBoundingClientRect();
				var newX = x;
				var newY = y;

				if (window.innerHeight < rect.bottom) {
					newY = window.innerHeight - rect.height;
				}
				if (window.innerWidth < rect.right) {
					newX = x - rect.width;
				}

				_this3.setState({ x: newX, y: newY, show: true });
			});
		};

		_this3.state = {
			x: 0,
			y: 0,
			show: false
		};
		return _this3;
	}

	_createClass(MenuList, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _props2 = this.props,
			    x = _props2.x,
			    y = _props2.y;

			this.relocate({ x: x, y: y });
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.relocate(nextProps);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props$list = this.props.list,
			    list = _props$list === undefined ? [] : _props$list;
			var _state = this.state,
			    x = _state.x,
			    y = _state.y,
			    show = _state.show;

			var hasIcon = list.some(function (_ref3) {
				var icon = _ref3.icon;
				return icon;
			});

			return _react2.default.createElement(
				'ul',
				{
					role: 'button', className: (0, _classnames2.default)('fry-menu-list', show && 'active'), style: { left: x, top: y },
					onContextMenu: onContextMenu, onClick: this.onClick, ref: this.setMenuRef
				},
				list.map(function (_ref4, index) {
					var title = _ref4.title,
					    disabled = _ref4.disabled,
					    split = _ref4.split,
					    icon = _ref4.icon,
					    onClick = _ref4.onClick;
					return _react2.default.createElement(
						PLi,
						{
							key: index, role: 'button', className: (0, _classnames2.default)({ disabled: disabled, split: split, hasIcon: hasIcon }),
							disabled: disabled, onClick: onClick, onItemTrigger: _this4.onItemTrigger
						},
						hasIcon && _react2.default.createElement('span', { className: (0, _classnames2.default)('fry-menu-icon', 'fa', 'fa-' + icon) }),
						_react2.default.createElement(
							'div',
							{ className: 'btn-menu-title' },
							title
						)
					);
				}),
				list.length === 0 && _react2.default.createElement(
					'li',
					{ className: 'disabled' },
					'(Empty List)'
				)
			);
		}
	}]);

	return MenuList;
}(_react2.default.Component);

MenuList.propTypes = {
	list: _propTypes2.default.array,
	x: _propTypes2.default.number,
	y: _propTypes2.default.number,
	onMenuTrigger: _propTypes2.default.func
};

exports.default = MenuList;