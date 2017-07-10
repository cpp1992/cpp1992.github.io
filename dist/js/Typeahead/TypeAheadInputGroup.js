'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TypeAheadInput = require('./TypeAheadInput');

var _TypeAheadInput2 = _interopRequireDefault(_TypeAheadInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeAheadInputGroup = function (_React$Component) {
	_inherits(TypeAheadInputGroup, _React$Component);

	function TypeAheadInputGroup() {
		_classCallCheck(this, TypeAheadInputGroup);

		var _this = _possibleConstructorReturn(this, (TypeAheadInputGroup.__proto__ || Object.getPrototypeOf(TypeAheadInputGroup)).call(this));

		_this.onClick = _this.onClick.bind(_this);
		return _this;
	}

	_createClass(TypeAheadInputGroup, [{
		key: 'onClick',
		value: function onClick() {
			var _props = this.props,
			    onSelectValue = _props.onSelectValue,
			    value = _props.value;

			if (onSelectValue) {
				onSelectValue(value);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    _props2$type = _props2.type,
			    type = _props2$type === undefined ? 'primary' : _props2$type,
			    _props2$text = _props2.text,
			    text = _props2$text === undefined ? 'Confirm' : _props2$text,
			    queryFunc = _props2.queryFunc,
			    onChange = _props2.onChange,
			    props = _objectWithoutProperties(_props2, ['type', 'text', 'queryFunc', 'onChange']);

			return _react2.default.createElement(
				'div',
				{ className: 'input-group' },
				_react2.default.createElement(_TypeAheadInput2.default, _extends({ queryFunc: queryFunc, onChange: onChange }, props)),
				_react2.default.createElement(
					'span',
					{ className: 'input-group-btn' },
					_react2.default.createElement(
						'button',
						{ className: (0, _classnames2.default)('btn', 'btn-' + type), onClick: this.onClick },
						text
					)
				)
			);
		}
	}]);

	return TypeAheadInputGroup;
}(_react2.default.Component);

TypeAheadInputGroup.propTypes = {
	queryFunc: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.array]).isRequired,
	value: _propTypes2.default.string,
	onChange: _propTypes2.default.func,
	onSelectValue: _propTypes2.default.func,
	type: _propTypes2.default.string,
	text: _propTypes2.default.string
};

exports.default = TypeAheadInputGroup;