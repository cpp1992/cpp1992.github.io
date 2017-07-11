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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _PropsComponent = require('../PropsComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function parseValues() {
	var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	return values.map(function (value) {
		return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value : { value: value };
	});
}

var Li = (0, _PropsComponent.withProps)(function (_ref) {
	var entity = _ref.entity,
	    rest = _objectWithoutProperties(_ref, ['entity']);

	return (// eslint-disable-line no-unused-vars
		_react2.default.createElement('li', rest)
	);
});
Li.propTypes = {
	entity: _propTypes2.default.object
};

var InlineList = function (_React$Component) {
	_inherits(InlineList, _React$Component);

	function InlineList() {
		_classCallCheck(this, InlineList);

		var _this = _possibleConstructorReturn(this, (InlineList.__proto__ || Object.getPrototypeOf(InlineList)).call(this));

		_this.onRemoveItem = function (event, props) {
			var _this$props = _this.props,
			    value = _this$props.value,
			    onRemoveItem = _this$props.onRemoveItem,
			    onChange = _this$props.onChange;

			var index = props['data-index'];
			var item = value[index];
			var newValue = value.concat();
			newValue.splice(index, 1);

			if (onRemoveItem) onRemoveItem(item);
			if (onChange) {
				onChange({
					target: {
						value: newValue
					}
				});
			}
		};

		_this.onItemClick = function (event, _ref2) {
			var entity = _ref2.entity;
			var onItemClick = _this.props.onItemClick;

			if (onItemClick) onItemClick(entity);
		};

		_this.state = {};
		return _this;
	}

	_createClass(InlineList, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    values = _props.value,
			    disabled = _props.disabled,
			    readOnly = _props.readOnly,
			    className = _props.className,
			    _props$icon = _props.icon,
			    icon = _props$icon === undefined ? 'times' : _props$icon,
			    type = _props.type;

			var parsedValues = parseValues(values);

			return _react2.default.createElement(
				'ul',
				{ className: (0, _classnames2.default)('list-inline InlineList', className) },
				parsedValues.map(function (entity, index) {
					var value = entity.value,
					    description = entity.description,
					    itemReadOnly = entity.readOnly,
					    itemType = entity.type;

					var mergedType = itemType || type;

					return _react2.default.createElement(
						Li,
						{
							key: index, onClick: _this2.onItemClick, entity: entity,
							className: (0, _classnames2.default)('label', 'clearfix', {
								'label-primary': !mergedType && !readOnly && !disabled,
								'label-default': !mergedType && (readOnly || disabled)
							}, mergedType && 'label-' + mergedType)
						},
						description || value,
						!disabled && !readOnly && !itemReadOnly && _react2.default.createElement(_Button2.default, { className: (0, _classnames2.default)('fa', 'fa-' + icon), 'data-index': index, onClick: _this2.onRemoveItem }),
						disabled && !readOnly && !itemReadOnly && _react2.default.createElement('button', { className: 'fa fa-ban', disabled: true })
					);
				}),
				parsedValues.length === 0 && _react2.default.createElement(
					'li',
					{ className: 'text-muted' },
					'(Empty List)'
				)
			);
		}
	}]);

	return InlineList;
}(_react2.default.Component);

InlineList.propTypes = {
	className: _propTypes2.default.string,
	type: _propTypes2.default.string,
	icon: _propTypes2.default.string,
	value: _propTypes2.default.array.isRequired,
	disabled: _propTypes2.default.bool,
	readOnly: _propTypes2.default.bool,
	onRemoveItem: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	onItemClick: _propTypes2.default.func
};

exports.default = InlineList;