'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stringUtils = require('../utils/stringUtils');

var _PropsComponent = require('../PropsComponent');

var _A = require('../A');

var _A2 = _interopRequireDefault(_A);

var _Condition = require('../Condition');

var _Condition2 = _interopRequireDefault(_Condition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function parseValues(values) {
	return values.map(function (value) {
		return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value : {
			value: value
		};
	});
}

var getName = function getName(name) {
	if (Array.isArray(name)) return name.join('_');
	return name;
};

var wrapEvent = function wrapEvent(value) {
	var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { target: {} };
	return _extends({}, event, {
		target: _extends({}, event.target, {
			value: value
		})
	});
};

var Input = (0, _PropsComponent.withProps)(function (props) {
	return _react2.default.createElement('input', props);
});

var StateFormField = function (_React$Component) {
	_inherits(StateFormField, _React$Component);

	function StateFormField() {
		_classCallCheck(this, StateFormField);

		var _this = _possibleConstructorReturn(this, (StateFormField.__proto__ || Object.getPrototypeOf(StateFormField)).call(this));

		_this.onChange = function (event) {
			var _this$props = _this.props,
			    name = _this$props.name,
			    onChange = _this$props.onChange;
			var onFieldChange = _this.context.onFieldChange;

			var value = event.target.value;

			onFieldChange(_this.doFilter(value), name);
			if (onChange) onChange(event);
		};

		_this.onSingleCheckBoxChange = function (event) {
			var value = !_this.getValue();
			_this.onChange(wrapEvent(value, event));
		};

		_this.onGroupCheckBoxChange = function (event, checkProps) {
			var value = checkProps['data-value'];
			var values = _this.getValue() || [];
			if (values.indexOf(value) === -1) {
				_this.onChange(wrapEvent([].concat(_toConsumableArray(values), [value]), event));
			} else {
				_this.onChange(wrapEvent(values.filter(function (val) {
					return val !== value;
				}), event));
			}
		};

		_this.onListItemRemove = function (event, btnProps) {
			var index = btnProps['data-index'];
			var value = (_this.getValue() || []).concat();
			value.splice(index, 1);
			_this.onChange(wrapEvent(value, event));
		};

		_this.onNewListValue = function (event) {
			var value = _this.getValue() || [];
			_this.onChange(wrapEvent([].concat(_toConsumableArray(value), [undefined]), event));
		};

		_this.getValue = function () {
			var getFieldValue = _this.context.getFieldValue;

			if (_this.props.value) return _this.props.value;

			return getFieldValue(_this.props.name);
		};

		_this.doFilter = function (value) {
			var filter = _this.props.filter;

			if (!filter) return value;
			return filter(value);
		};

		_this.isChecked = function (value) {
			return (_this.getValue() || []).indexOf(value) >= 0;
		};

		_this.state = {};
		return _this;
	}

	_createClass(StateFormField, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    name = _props.name,
			    displayName = _props.displayName,
			    description = _props.description,
			    type = _props.type,
			    inline = _props.inline,
			    values = _props.values,
			    rows = _props.rows,
			    isList = _props.isList,
			    Component = _props.component,
			    passStateProps = _props.passStateProps,
			    props = _objectWithoutProperties(_props, ['name', 'displayName', 'description', 'type', 'inline', 'values', 'rows', 'isList', 'component', 'passStateProps']);

			var getFormDisabled = this.context.getFormDisabled;


			var $input = null;
			var myName = getName(name);
			var myFormatName = (0, _stringUtils.capitalize)(myName);
			var value = this.getValue();
			var disabled = getFormDisabled();

			delete props.onChange;
			delete props.filter;
			delete props.value;

			if (isList) {
				var path = Array.isArray(name) ? name : [name];
				var lastName = path[path.length - 1];

				return _react2.default.createElement(
					'div',
					{ className: 'fry-state-form-list' },
					_react2.default.createElement(
						'p',
						{ className: 'fry-state-form-list-title' },
						displayName || myFormatName
					),
					_react2.default.createElement(
						'div',
						{ className: 'fry-state-form-list-content' },
						_react2.default.createElement(
							_Condition2.default,
							{ is: !(value || []).length },
							_react2.default.createElement(
								'p',
								{ className: 'text-muted fry-state-form-list-content-empty' },
								'(Empty List)'
							)
						),
						(value || []).map(function (_, index) {
							var subProps = _extends({}, _this2.props, {
								name: [].concat(_toConsumableArray(path), [index]),
								displayName: _react2.default.createElement(
									'span',
									null,
									'[',
									_react2.default.createElement(_A2.default, { className: 'fa fa-times', 'data-index': index, onClick: _this2.onListItemRemove }),
									']',
									' ',
									lastName,
									' - ',
									index
								),
								isList: false
							});
							return _react2.default.createElement(StateFormField, _extends({ key: index }, subProps));
						}),
						_react2.default.createElement(
							'a',
							{ role: 'button', onClick: this.onNewListValue },
							'+ New Value'
						)
					)
				);
			}

			if (Component) {
				if (passStateProps) props.stateProps = this.props;

				$input = _react2.default.createElement(Component, _extends({}, props, { type: type, value: value, disabled: disabled, onChange: this.onChange
				}));
			} else {
				switch (type) {
					case 'bool':
					case 'checkbox':
						if (!values) {
							return _react2.default.createElement(
								'div',
								{ className: 'checkbox' },
								_react2.default.createElement(
									'label',
									{ htmlFor: myName },
									_react2.default.createElement('input', _extends({
										id: myName, type: 'checkbox', checked: !!value,
										disabled: disabled,
										onChange: this.onSingleCheckBoxChange }, props)),
									' ',
									displayName || myFormatName
								)
							);
						}
						return _react2.default.createElement(
							'div',
							{ className: inline && 'form-group' },
							parseValues(values).map(function (item, index) {
								var $checkbox = _react2.default.createElement(
									'label',
									{
										key: index,
										htmlFor: myName + '_' + index,
										className: inline && 'checkbox-inline'
									},
									_react2.default.createElement(Input, _extends({
										id: myName + '_' + index, type: 'checkbox',
										disabled: disabled,
										onChange: _this2.onGroupCheckBoxChange,
										'data-value': item.value,
										checked: _this2.isChecked(item.value) }, props)),
									' ',
									item.description || item.value
								);

								return inline ? $checkbox : _react2.default.createElement(
									'div',
									{ className: 'checkbox', key: index },
									$checkbox
								);
							})
						);

					case 'radio':
						return _react2.default.createElement(
							'div',
							{ className: inline && 'form-group' },
							parseValues(values).map(function (item, index) {
								var $radio = _react2.default.createElement(
									'label',
									{
										key: index,
										htmlFor: myName + '_' + index,
										className: inline && 'radio-inline'
									},
									_react2.default.createElement('input', _extends({
										type: 'radio', name: myName, id: myName + '_' + index, value: item.value,
										disabled: disabled,
										onChange: _this2.onChange }, props)),
									' ',
									item.description || item.value
								);

								return inline ? $radio : _react2.default.createElement(
									'div',
									{ className: 'radio', key: index },
									$radio
								);
							})
						);

					case 'email':
					case 'number':
					case 'search':
					case 'password':
					default:
						if (values) {
							var miss = false;
							var parsedValue = value || '';
							var parsedValues = parseValues(values);
							if (parsedValues.every(function (item) {
								return item.value !== parsedValue;
							})) {
								miss = true;
							}

							$input = _react2.default.createElement(
								'select',
								_extends({
									className: 'form-control', value: parsedValue,
									disabled: disabled,
									onChange: this.onChange }, props),
								miss && _react2.default.createElement(
									'option',
									{ value: parsedValue },
									parsedValue
								),
								parseValues(values).map(function (item, index) {
									return _react2.default.createElement(
										'option',
										{ key: index, value: item.value },
										item.description || item.value
									);
								})
							);
						} else if (rows || type === 'textarea' || type === 'blob') {
							$input = _react2.default.createElement('textarea', _extends({
								className: 'form-control', id: myName, placeholder: description,
								disabled: disabled,
								value: value || '', onChange: this.onChange, rows: rows || 5 }, props));
						} else {
							$input = _react2.default.createElement('input', _extends({
								type: type || 'text', className: 'form-control', id: myName, placeholder: description,
								disabled: disabled,
								value: value || '', onChange: this.onChange }, props));
						}
				}
			}

			return _react2.default.createElement(
				'div',
				{ className: 'form-group' },
				displayName !== '' && _react2.default.createElement(
					'label',
					{ htmlFor: myName },
					displayName || myFormatName
				),
				$input
			);
		}
	}]);

	return StateFormField;
}(_react2.default.Component);

StateFormField.propTypes = {
	name: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired,
	displayName: _propTypes2.default.node,
	description: _propTypes2.default.string,
	type: _propTypes2.default.string,
	inline: _propTypes2.default.bool,
	rows: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	component: _propTypes2.default.func,
	value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.symbol]),
	values: _propTypes2.default.array,
	isList: _propTypes2.default.bool,
	passStateProps: _propTypes2.default.bool,

	filter: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	onValueChange: _propTypes2.default.func
};

StateFormField.contextTypes = {
	onFieldChange: _propTypes2.default.func,
	getFieldValue: _propTypes2.default.func,
	getFormDisabled: _propTypes2.default.func
};

exports.default = StateFormField;