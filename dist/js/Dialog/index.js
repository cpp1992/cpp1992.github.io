'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DialogInstance = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_React$Component) {
	_inherits(Dialog, _React$Component);

	function Dialog() {
		_classCallCheck(this, Dialog);

		var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));

		_this.updateBodyState = function () {
			var $body = (0, _jquery2.default)('body');
			var hasModal = (0, _jquery2.default)('.modal.fade.in').length > 0;

			if (hasModal) {
				$body.addClass('modal-open');
				$body.css('padding-right', (0, _jquery2.default)(window).height() < $body.height() ? '17px' : 0);
			} else {
				$body.css('padding-right', 0);
			}
		};

		_this.state = {
			list: []
		};

		_this.show = _this.show.bind(_this);
		_this.onHidden = _this.onHidden.bind(_this);
		return _this;
	}

	_createClass(Dialog, [{
		key: 'onHidden',
		value: function onHidden(dialog) {
			var index = dialog.props.index;
			var list = this.state.list;


			list.splice(index, 1);
			this.setState({ list: list });

			this.updateBodyState();

			if (dialog.props.dlgOnHidden) {
				dialog.props.dlgOnHidden(dialog);
			}
		}
	}, {
		key: 'show',
		value: function show(dialog) {
			var _this2 = this;

			var list = this.state.list;

			var entity = {
				id: +new Date(),
				dialog: dialog
			};
			list.push(entity);
			this.setState({ list: list });

			setTimeout(function () {
				entity.ref.show();

				// Repeat for process the padding style of bootstrap modal
				var $dlg = (0, _jquery2.default)(entity.ref.dialog);
				setTimeout(function () {
					_this2.updateBodyState();
					if (list.length > 1) {
						$dlg.css('padding-right', (0, _jquery2.default)('body').css('padding-right'));
					}
				}, 150);
				$dlg.one('bsTransitionEnd', function () {
					_this2.updateBodyState();
					if (list.length > 1) {
						$dlg.css('padding-right', (0, _jquery2.default)('body').css('padding-right'));
					}
				});
			}, 1);

			// TODO: Dialog scrollbar logic

			return {
				entity: entity,
				refresh: function refresh() {
					_this2.forceUpdate();
				}
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var list = this.state.list;


			return _react2.default.createElement(
				'div',
				null,
				list.map(function (item, index) {
					var entity = item;
					var dlgOnHidden = entity.dialog.onHidden;
					return _react2.default.createElement(_Dialog2.default, _extends({
						key: entity.id,
						index: index,
						ref: function ref(element) {
							entity.ref = element;
						}
					}, entity.dialog, {
						dlgOnHidden: dlgOnHidden,
						onHidden: _this3.onHidden
					}));
				})
			);
		}
	}]);

	return Dialog;
}(_react2.default.Component);

exports.DialogInstance = Dialog;
exports.default = Dialog;