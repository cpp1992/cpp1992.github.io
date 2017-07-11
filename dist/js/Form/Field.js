'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FRY_FORM_FILED = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FRY_FORM_FILED = exports.FRY_FORM_FILED = 'FRY_FORM_FILED';

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

var Field = function (_React$Component) {
	_inherits(Field, _React$Component);

	function Field() {
		_classCallCheck(this, Field);

		var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this));

		_this.doFilter = function (value) {
			var filter = _this.props.filter;

			if (!filter) return value;
			return filter(value);
		};

		_this.isChecked = _this.isChecked.bind(_this);
		_this.onChange = _this.onChange.bind(_this);
		_this.onCheckBoxChange = _this.onCheckBoxChange.bind(_this);
		return _this;
	}

	_createClass(Field, [{
		key: 'onChange',
		value: function onChange(event) {
			var _props = this.props,
			    name = _props.name,
			    onChange = _props.onChange,
			    onValueChange = _props.onValueChange;

			var value = event.target.value;

			if (onValueChange) onValueChange(this.doFilter(value), name);
			if (onChange) onChange(event);
		}
	}, {
		key: 'onCheckBoxChange',
		value: function onCheckBoxChange(groupCheckBoxValue) {
			var _props2 = this.props,
			    name = _props2.name,
			    onChange = _props2.onChange,
			    onValueChange = _props2.onValueChange;


			var value = void 0;
			if (typeof groupCheckBoxValue !== 'string') {
				value = !this.props.value;
			} else if (this.isChecked(groupCheckBoxValue)) {
				value = this.props.value.filter(function (val) {
					return val !== groupCheckBoxValue;
				});
			} else {
				value = this.props.value || [];
				value.push(groupCheckBoxValue);
			}

			if (onValueChange) onValueChange(this.doFilter(value), name);
			if (onChange) onChange(groupCheckBoxValue);
		}
	}, {
		key: 'isChecked',
		value: function isChecked(value) {
			return (this.props.value || []).indexOf(value) >= 0;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props3 = this.props,
			    name = _props3.name,
			    displayName = _props3.displayName,
			    description = _props3.description,
			    type = _props3.type,
			    inline = _props3.inline,
			    values = _props3.values,
			    value = _props3.value,
			    rows = _props3.rows,
			    Component = _props3.component,
			    props = _objectWithoutProperties(_props3, ['name', 'displayName', 'description', 'type', 'inline', 'values', 'value', 'rows', 'component']);

			var $input = null;
			var myName = getName(name);

			delete props.onValueChange;
			delete props.onChange;
			delete props.filter;

			if (Component) {
				$input = _react2.default.createElement(Component, _extends({}, props, { value: value, onChange: this.onChange }));
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
										onChange: this.onCheckBoxChange }, props)),
									' ',
									displayName || myName
								)
							);
						}
						return _react2.default.createElement(
							'div',
							null,
							parseValues(values).map(function (item, index) {
								var $checkbox = _react2.default.createElement(
									'label',
									{
										key: index,
										htmlFor: myName + '_' + index,
										className: inline && 'checkbox-inline'
									},
									_react2.default.createElement('input', _extends({
										id: myName + '_' + index, type: 'checkbox',
										onChange: function onChange() {
											_this2.onCheckBoxChange(item.value);
										}, checked: _this2.isChecked(item.value) }, props)),
									' ',
									item.description || item.value
								);

								return inline ? $checkbox : _react2.default.createElement(
									'div',
									{ className: inline ? 'inline' : 'checkbox', key: index },
									$checkbox
								);
							})
						);

					case 'radio':
						return _react2.default.createElement(
							'div',
							null,
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
										onChange: _this2.onChange }, props)),
									' ',
									item.description || item.value
								);

								return inline ? $radio : _react2.default.createElement(
									'div',
									{ className: inline ? 'inline' : 'radio', key: index },
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
							if (!parsedValue && parsedValues.every(function (item) {
								return item.value !== parsedValue;
							})) {
								miss = true;
							}

							$input = _react2.default.createElement(
								'select',
								_extends({ className: 'form-control', value: parsedValue, onChange: this.onChange }, props),
								miss && _react2.default.createElement('option', { value: '' }),
								parseValues(values).map(function (item, index) {
									return _react2.default.createElement(
										'option',
										{ key: index, value: item.value },
										item.description || item.value
									);
								})
							);
						} else if (rows || type === 'textarea') {
							$input = _react2.default.createElement('textarea', _extends({
								className: 'form-control', id: myName, placeholder: description,
								value: value || '', onChange: this.onChange, rows: rows || 5 }, props));
						} else {
							$input = _react2.default.createElement('input', _extends({
								type: type || 'text', className: 'form-control', id: myName, placeholder: description,
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
					displayName || myName
				),
				$input
			);
		}
	}]);

	return Field;
}(_react2.default.Component);

Field.propTypes = {
	name: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired,
	displayName: _propTypes2.default.node,
	description: _propTypes2.default.string,
	type: _propTypes2.default.string,
	inline: _propTypes2.default.bool,
	rows: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	component: _propTypes2.default.func,
	value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.symbol]),
	values: _propTypes2.default.array,

	filter: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	onValueChange: _propTypes2.default.func
};

Field[FRY_FORM_FILED] = FRY_FORM_FILED;

exports.default = Field;