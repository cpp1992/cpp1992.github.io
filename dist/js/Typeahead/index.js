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

var _PropsComponent = require('../PropsComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Li = (0, _PropsComponent.withProps)(function (_ref) {
	var children = _ref.children,
	    props = _objectWithoutProperties(_ref, ['children']);

	return _react2.default.createElement(
		'li',
		props,
		children
	);
});

Li.propTypes = {
	children: _propTypes2.default.node
};

exports.default = function (Component, queryFunction) {
	var TypeAhead = function (_React$Component) {
		_inherits(TypeAhead, _React$Component);

		function TypeAhead() {
			_classCallCheck(this, TypeAhead);

			var _this = _possibleConstructorReturn(this, (TypeAhead.__proto__ || Object.getPrototypeOf(TypeAhead)).call(this));

			_this.state = {
				selected: 0,
				show: false
			};
			_this.prevValue = null;
			_this.cacheList = [];
			_this.latestPromise = null;

			_this.onKeyDown = _this.onKeyDown.bind(_this);
			_this.onBlur = _this.onBlur.bind(_this);
			_this.onOptionSelect = _this.onOptionSelect.bind(_this);
			_this.updateValue = _this.updateValue.bind(_this);
			_this.getList = _this.getList.bind(_this);
			return _this;
		}

		_createClass(TypeAhead, [{
			key: 'onKeyDown',
			value: function onKeyDown(event) {
				var onKeyDown = this.props.onKeyDown;


				if (event.keyCode === 38) {
					this.setSelect(-1);
				} else if (event.keyCode === 40) {
					this.setSelect(1);
				} else if (event.keyCode === 13) {
					var selected = this.state.selected;

					var list = this.getList();
					var option = list[selected];
					if (option) {
						this.updateValue(typeof option === 'string' ? option : option.value);
					}
				} else {
					this.setState({ show: true });
				}

				if (onKeyDown) onKeyDown(event);
			}
		}, {
			key: 'onBlur',
			value: function onBlur() {
				this.setState({ show: false });
			}
		}, {
			key: 'onOptionSelect',
			value: function onOptionSelect(event, props) {
				var value = props['data-value'];
				this.updateValue(value);
			}
		}, {
			key: 'setSelect',
			value: function setSelect(value) {
				var selected = this.state.selected;

				var len = this.getList().length;
				this.setState({
					selected: (selected + value + len) % len
				});
			}
		}, {
			key: 'getList',
			value: function getList() {
				var _this2 = this;

				var _props = this.props,
				    value = _props.value,
				    queryFunc = _props.queryFunc;

				if (this.prevValue !== value) {
					var func = queryFunc || queryFunction;
					if (!func) {
						// No function provided
						this.cacheList = [];
						this.state.selected = 0;
						console.warn('\'queryFunc\' is empty!');
					} else if (Array.isArray(func)) {
						// If is Array, query inline
						var queryStr = String(value).toUpperCase();

						this.latestPromise = null;
						this.state.selected = 0;
						this.cacheList = func.filter(function (option) {
							var optionEntity = typeof option === 'string' ? { value: option } : option;
							return String(optionEntity.item || '').toUpperCase().indexOf(queryStr) >= 0 || String(optionEntity.description || '').toUpperCase().indexOf(queryStr) >= 0 || String(optionEntity.value || '').toUpperCase().indexOf(queryStr) >= 0;
						});
					} else if (typeof func === 'function') {
						// Call provided function. Support promise result
						var result = func(value) || [];
						if (result.then) {
							this.latestPromise = result;
							result.then(function (list) {
								if (_this2.latestPromise !== result) return;

								_this2.cacheList = list;
								_this2.state.selected = 0;
								_this2.forceUpdate();
							});
						} else {
							this.latestPromise = null;
							this.cacheList = result;
							this.state.selected = 0;
						}
					} else {
						// Type not support
						console.error('`queryFunc` type not support:', typeof queryFunc === 'undefined' ? 'undefined' : _typeof(queryFunc), queryFunc);
					}
					this.prevValue = value;
				}
				return this.cacheList;
			}
		}, {
			key: 'updateValue',
			value: function updateValue(value) {
				var _props2 = this.props,
				    onChange = _props2.onChange,
				    onSelectValue = _props2.onSelectValue;

				var mockEvent = {
					type: 'change',
					target: {
						value: value
					}
				};
				if (onChange) onChange(mockEvent);
				if (onSelectValue) onSelectValue(value);
				this.setState({ show: false });
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var list = this.getList();
				var _state = this.state,
				    selected = _state.selected,
				    show = _state.show;

				var props = Object.assign({}, this.props);
				delete props.queryFunc;
				delete props.onSelectValue;

				return _react2.default.createElement(
					'div',
					{ className: 'typeAhead clearfix' },
					_react2.default.createElement(Component, _extends({}, props, {
						onKeyDown: this.onKeyDown,
						onBlur: this.onBlur
					})),
					show && list.length ? _react2.default.createElement(
						'ul',
						{ className: 'typeAhead-list' },
						list.map(function (option, index) {
							var optionEntity = typeof option === 'string' ? { value: option } : option;

							return _react2.default.createElement(
								Li,
								{
									key: index, role: 'button', 'data-value': optionEntity.value,
									className: index === selected && 'active',
									onMouseDown: _this3.onOptionSelect
								},
								optionEntity.item || optionEntity.description || optionEntity.value
							);
						})
					) : null
				);
			}
		}]);

		return TypeAhead;
	}(_react2.default.Component);

	TypeAhead.propTypes = {
		value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
		queryFunc: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.array]),
		onChange: _propTypes2.default.func,
		onSelectValue: _propTypes2.default.func,
		onKeyDown: _propTypes2.default.func
	};

	return TypeAhead;
};