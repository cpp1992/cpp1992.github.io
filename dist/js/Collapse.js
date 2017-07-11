'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collapse = function (_React$Component) {
	_inherits(Collapse, _React$Component);

	function Collapse() {
		_classCallCheck(this, Collapse);

		var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this));

		_this.onCollapse = function () {
			_this.setState({ collapse: !_this.state.collapse });
		};

		_this.state = {
			collapse: false
		};
		return _this;
	}

	_createClass(Collapse, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _props$collapse = this.props.collapse,
			    collapse = _props$collapse === undefined ? false : _props$collapse;

			this.setState({ collapse: collapse });
		}
	}, {
		key: 'render',
		value: function render() {
			var collapse = this.state.collapse;
			var _props = this.props,
			    className = _props.className,
			    title = _props.title,
			    children = _props.children,
			    passState = _props.passState,
			    collapseContent = _props.collapseContent;


			var $title = passState ? _react2.default.cloneElement(title, { collapse: collapse }) : title;

			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement(
					'div',
					{ role: 'button', onClick: this.onCollapse },
					$title
				),
				collapse && collapseContent,
				!collapse && children
			);
		}
	}]);

	return Collapse;
}(_react2.default.Component);

Collapse.propTypes = {
	className: _propTypes2.default.string,
	collapse: _propTypes2.default.bool,
	title: _propTypes2.default.node,
	passState: _propTypes2.default.bool,
	children: _propTypes2.default.node,
	collapseContent: _propTypes2.default.node
};

exports.default = Collapse;