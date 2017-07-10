'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withStateForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pathUtil = require('../utils/pathUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withStateForm = exports.withStateForm = function withStateForm(Component) {
	var WrapComponent = function WrapComponent(props, context) {
		return _react2.default.createElement(Component, _extends({}, context, props));
	};

	WrapComponent.contextTypes = {
		instance: _propTypes2.default.object,
		path: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array])
	};

	return WrapComponent;
};

var StateForm = function (_React$Component) {
	_inherits(StateForm, _React$Component);

	function StateForm() {
		_classCallCheck(this, StateForm);

		var _this = _possibleConstructorReturn(this, (StateForm.__proto__ || Object.getPrototypeOf(StateForm)).call(this));

		_this.onFieldChange = function (value, name) {
			var _this$props = _this.props,
			    instance = _this$props.instance,
			    onChange = _this$props.onChange,
			    forceRefresh = _this$props.forceRefresh;

			var myPath = _this.getPath();
			var currentState = void 0;

			instance.setState(function (preState) {
				currentState = (0, _pathUtil.updateValue)(preState, myPath.concat(name), function () {
					return value;
				});
				return currentState;
			}, function () {
				if (onChange) {
					onChange({
						target: { value: (0, _pathUtil.getValue)(currentState, myPath) }
					});
				}
			});
			if (forceRefresh) {
				_this.setState({});
			}
		};

		_this.getFieldValue = function (name) {
			var instance = _this.props.instance;

			var entity = (0, _pathUtil.getValue)(instance.state, _this.getPath());
			if (!name || !name.length || !entity) return entity;

			return (0, _pathUtil.getValue)(entity, name);
		};

		_this.getFormDisabled = function () {
			return _this.props.disabled;
		};

		_this.getPath = function () {
			var path = _this.props.path;

			if (Array.isArray(path)) {
				return path;
			} else if (!path && typeof path !== 'number') {
				return [];
			}
			return [path];
		};

		_this.state = {};
		return _this;
	}

	_createClass(StateForm, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				onFieldChange: this.onFieldChange,
				getFieldValue: this.getFieldValue,
				getFormDisabled: this.getFormDisabled,
				instance: this.props.instance,
				path: this.props.path
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    children = _props.children;


			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)(className, 'fry-state-form') },
				children
			);
		}
	}]);

	return StateForm;
}(_react2.default.Component);

StateForm.propTypes = {
	className: _propTypes2.default.string,
	children: _propTypes2.default.node,
	instance: _propTypes2.default.object.isRequired,
	path: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array]),
	onChange: _propTypes2.default.func,
	disabled: _propTypes2.default.bool,
	forceRefresh: _propTypes2.default.bool
};

StateForm.childContextTypes = {
	instance: _propTypes2.default.object,
	path: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array]),
	onFieldChange: _propTypes2.default.func,
	getFieldValue: _propTypes2.default.func,
	getFormDisabled: _propTypes2.default.func
};

exports.default = StateForm;