'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Field = require('./Field');

var _pathUtil = require('../utils/pathUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isBaseType = function isBaseType(type) {
	return type === 'string' || type === 'number' || type === 'boolean';
};

var linkElement = function linkElement(children, instance, option, fields) {
	var mergedFields = fields || {};
	var childrenType = typeof children === 'undefined' ? 'undefined' : _typeof(children);

	if (isBaseType(childrenType)) {
		return {
			element: children,
			fields: fields
		};
	}if (!children) {
		return {
			element: [],
			fields: fields
		};
	}

	var element = _react2.default.Children.map(children, function (component) {
		// Loop for children elements
		if (!component) {
			return null;
		} else if (isBaseType(typeof component === 'undefined' ? 'undefined' : _typeof(component))) {
			return component;
		} else if (!component.type || component.type[_Field.FRY_FORM_FILED] !== _Field.FRY_FORM_FILED) {
			var entity = component.props ? linkElement(component.props.children, instance, option, mergedFields) : { element: [] };

			return _react2.default.cloneElement(component, entity.element.length && {
				children: entity.element
			});
		}

		// Parse Field component
		return _react2.default.cloneElement(component, {
			disabled: option.disabled,
			onValueChange: option.onFieldChange,
			value: component.props.value || (0, _pathUtil.getValue)(instance, component.props.name),
			ref: function ref(field) {
				mergedFields[component.props.name] = field;
			}
		});
	});
	return {
		element: element,
		fields: mergedFields
	};
};

var Form = function (_React$Component) {
	_inherits(Form, _React$Component);

	function Form() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Form);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.onFieldChange = function (value, name) {
			var _this$props = _this.props,
			    instance = _this$props.instance,
			    onChange = _this$props.onChange,
			    forceRefresh = _this$props.forceRefresh;

			(0, _pathUtil.setValue)(instance, name, value);

			if (onChange !== false) {
				if (typeof onChange === 'function') {
					onChange({
						target: {
							value: instance
						}
					});
				} else if (onChange === undefined) {
					var parent = (0, _pathUtil.getValue)(_this, ['_reactInternalInstance', '_currentElement', '_owner', '_instance']);
					if (!parent) {
						if (forceRefresh) {
							_this.setState({});
						} else {
							console.warn('Fairy - Form injection failed. Can\'t find parent component.');
						}
					} else {
						parent.setState({});
					}
				}
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Form, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    instance = _props.instance,
			    disabled = _props.disabled;

			var entity = linkElement(children, instance, {
				disabled: disabled,
				onFieldChange: this.onFieldChange
			});
			this.fields = entity.fields;

			return _react2.default.createElement(
				'div',
				{ className: 'fry-form' },
				entity.element
			);
		}
	}]);

	return Form;
}(_react2.default.Component);

Form.propTypes = {
	forceRefresh: _propTypes2.default.bool,
	instance: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]).isRequired,
	children: _propTypes2.default.node.isRequired,
	onChange: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.bool]),
	disabled: _propTypes2.default.bool
};

exports.default = Form;