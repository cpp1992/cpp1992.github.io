'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_React$Component) {
	_inherits(Dialog, _React$Component);

	function Dialog() {
		_classCallCheck(this, Dialog);

		var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));

		_this.forceClose = false;
		_this.show = _this.show.bind(_this);
		_this.hide = _this.hide.bind(_this);
		_this.onConfirm = _this.onConfirm.bind(_this);
		_this.state = {};
		return _this;
	}

	_createClass(Dialog, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.client = true;

			(0, _jquery2.default)(this.dialog).on('show.bs.modal', function () {
				var onShow = _this2.props.onShow;

				if (onShow) onShow(_this2);
			});

			(0, _jquery2.default)(this.dialog).on('shown.bs.modal', function () {
				var onShown = _this2.props.onShown;

				if (onShown) onShown(_this2);
			});

			(0, _jquery2.default)(this.dialog).on('hide.bs.modal', function () {
				if (_this2.forceClose) return true;

				var result = void 0;
				var onHide = _this2.props.onHide;

				if (onHide) {
					result = onHide(_this2, _this2.value);
				}
				_this2.value = undefined;
				if (result && result.then) {
					_this2.setState({ lock: true });
					result.then(function (promiseResult) {
						if (promiseResult !== false) {
							_this2.hide(true);
						} else {
							_this2.setState({ lock: false });
						}
					});
					return false;
				}
				return result;
			});

			(0, _jquery2.default)(this.dialog).on('hidden.bs.modal', function () {
				var onHidden = _this2.props.onHidden;

				if (onHidden) onHidden(_this2);
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.client) {
				(0, _jquery2.default)(this.dialog).off('show.bs.modal');
				(0, _jquery2.default)(this.dialog).off('shown.bs.modal');
				(0, _jquery2.default)(this.dialog).off('hide.bs.modal');
				(0, _jquery2.default)(this.dialog).off('hidden.bs.modal');
			}
		}
	}, {
		key: 'onConfirm',
		value: function onConfirm() {
			this.value = true;
			this.hide();
		}
	}, {
		key: 'show',
		value: function show() {
			(0, _jquery2.default)(this.dialog).modal();
		}
	}, {
		key: 'hide',
		value: function hide(force) {
			this.forceClose = force;
			(0, _jquery2.default)(this.dialog).modal('hide');
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    title = _props.title,
			    content = _props.content,
			    footer = _props.footer,
			    size = _props.size,
			    confirm = _props.confirm;
			var lock = this.state.lock;


			var $content = typeof content === 'function' ? content() : content;

			var $footer = footer || _react2.default.createElement(
				'div',
				{ className: 'modal-footer' },
				_react2.default.createElement(
					'button',
					{ type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal', disabled: lock },
					'Close'
				),
				confirm && _react2.default.createElement(
					'button',
					{ type: 'button', className: 'btn btn-primary', disabled: lock, onClick: this.onConfirm },
					'Confirm'
				)
			);

			return _react2.default.createElement(
				'div',
				{ className: 'modal fade', tabIndex: '-1', role: 'dialog', ref: function ref(dialog) {
						_this3.dialog = dialog;
					} },
				_react2.default.createElement(
					'div',
					{
						className: (0, _classnames2.default)('modal-dialog', {
							'modal-lg': size === 'large',
							'modal-sm': size === 'small'
						}),
						role: 'document'
					},
					_react2.default.createElement(
						'div',
						{ className: 'modal-content' },
						_react2.default.createElement(
							'div',
							{ className: 'modal-header' },
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
								_react2.default.createElement(
									'span',
									{ 'aria-hidden': 'true' },
									'\xD7'
								)
							),
							_react2.default.createElement(
								'h4',
								{ className: 'modal-title', id: 'myModalLabel' },
								title
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'modal-body' },
							$content
						),
						$footer
					)
				)
			);
		}
	}]);

	return Dialog;
}(_react2.default.Component);

Dialog.propTypes = {
	title: _propTypes2.default.node,
	content: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
	footer: _propTypes2.default.node,
	size: _propTypes2.default.string,
	confirm: _propTypes2.default.bool,

	onShow: _propTypes2.default.func,
	onShown: _propTypes2.default.func,
	onHide: _propTypes2.default.func,
	onHidden: _propTypes2.default.func
};

exports.default = Dialog;