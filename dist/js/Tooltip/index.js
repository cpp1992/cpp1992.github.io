'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ARROW_OFFSET = 8;

var Tooltip = function (_React$Component) {
	_inherits(Tooltip, _React$Component);

	function Tooltip() {
		_classCallCheck(this, Tooltip);

		var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this));

		_this.onMouseEnter = function () {
			if (!_this.$holder || !_this.$tooltip) return;

			var placement = _this.props.placement;

			var _$$offset = (0, _jquery2.default)(_this.$holder).offset(),
			    holderTop = _$$offset.top,
			    holderLeft = _$$offset.left;

			var holderRect = _this.$holder.getBoundingClientRect();
			var tooltipRect = _this.$tooltip.getBoundingClientRect();
			var holderWidth = holderRect.width,
			    holderHeight = holderRect.height;
			var tooltipWidth = tooltipRect.width,
			    tooltipHeight = tooltipRect.height;


			var offset = void 0;
			switch (placement) {
				case 'bottom':
					offset = {
						top: holderTop + holderHeight + ARROW_OFFSET,
						left: holderLeft + holderWidth / 2 - tooltipWidth / 2
					};
					break;
				case 'left':
					offset = {
						top: holderTop + holderHeight / 2 - tooltipHeight / 2,
						left: holderLeft - tooltipWidth - ARROW_OFFSET
					};
					break;
				case 'right':
					offset = {
						top: holderTop + holderHeight / 2 - tooltipHeight / 2,
						left: holderLeft + holderWidth + ARROW_OFFSET
					};
					break;
				default:
					offset = {
						top: holderTop - tooltipHeight - ARROW_OFFSET,
						left: holderLeft + holderWidth / 2 - tooltipWidth / 2
					};
			}

			(0, _jquery2.default)(_this.$tooltip).offset(offset);
			_this.setState({ show: true });
		};

		_this.onMouseLeave = function () {
			_this.setState({ show: false });
		};

		_this.setHolderRef = function (ele) {
			_this.$holder = ele;
		};

		_this.setTooltipRef = function (ele) {
			_this.$tooltip = ele;
		};

		_this.state = {};
		return _this;
	}

	_createClass(Tooltip, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    inline = _props.inline,
			    title = _props.title,
			    _props$placement = _props.placement,
			    placement = _props$placement === undefined ? 'top' : _props$placement,
			    children = _props.children;
			var show = this.state.show;


			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('fry-tooltip clearfix', className), ref: this.setHolderRef,
					style: { display: inline !== false ? 'inline-block' : 'block' },
					onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave
				},
				children,
				title ? _react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)('fry-tooltip-container', placement, show && 'fry-tooltip-show'), ref: this.setTooltipRef },
					_react2.default.createElement('div', { className: 'fry-tooltip-arrow' }),
					_react2.default.createElement(
						'div',
						{ className: 'fry-tooltip-content' },
						_react2.default.createElement(
							'div',
							{ className: 'fry-tooltip-inner' },
							title
						)
					)
				) : null
			);
		}
	}]);

	return Tooltip;
}(_react2.default.Component);

Tooltip.propTypes = {
	className: _propTypes2.default.string,
	inline: _propTypes2.default.bool,
	title: _propTypes2.default.node,
	placement: _propTypes2.default.string,
	children: _propTypes2.default.node
};

exports.default = Tooltip;