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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchInput = function (_React$Component) {
	_inherits(SearchInput, _React$Component);

	function SearchInput() {
		_classCallCheck(this, SearchInput);

		var _this = _possibleConstructorReturn(this, (SearchInput.__proto__ || Object.getPrototypeOf(SearchInput)).call(this));

		_this.onChange = function (event) {
			var delay = Number(_this.props.delay || 0);
			var value = event.target.value;

			_this.setState({ value: value });

			if (delay > 0) {
				clearTimeout(_this.id);
				_this.id = setTimeout(function () {
					_this.doUpdate(value);
				}, delay);
			} else {
				_this.doUpdate(value);
			}
		};

		_this.doUpdate = function (value) {
			var onChange = _this.props.onChange;

			if (onChange) {
				onChange({
					target: { value: value }
				});
			}
		};

		_this.state = {
			value: ''
		};
		_this.id = 0;
		return _this;
	}

	_createClass(SearchInput, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setState({ value: this.props.value });
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.value !== nextProps.value) {
				this.setState({ value: nextProps.value });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    description = _props.description,
			    placeholder = _props.placeholder,
			    props = _objectWithoutProperties(_props, ['description', 'placeholder']);

			delete props.delay;

			return _react2.default.createElement(
				'div',
				{ className: 'fry-search-input' },
				_react2.default.createElement('input', _extends({}, props, { type: 'text', className: 'form-control',
					value: this.state.value, onChange: this.onChange,
					placeholder: placeholder || description || 'Search...'
				})),
				_react2.default.createElement('span', { className: 'fa fa-search' })
			);
		}
	}]);

	return SearchInput;
}(_react2.default.Component);

SearchInput.propTypes = {
	delay: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	onChange: _propTypes2.default.func,
	value: _propTypes2.default.string,
	description: _propTypes2.default.string,
	placeholder: _propTypes2.default.string
};

exports.default = SearchInput;