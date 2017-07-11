'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.commonPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _pathUtil = require('../utils/pathUtil');

var _uiUtils = require('../utils/uiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getDefaultConfig = function getDefaultConfig() {
	return {
		credits: { enabled: false },
		tooltip: {
			shared: true
		},
		title: {
			text: null
		},
		yAxis: {
			title: {
				text: null
			}
		},
		plotOptions: {},
		series: []
	};
};

function getPercentageLabelFunc(isDecimal) {
	var multiple = isDecimal ? 100 : 1;

	return function ptgLblFunc() {
		return this.value * multiple + '%';
	};
}

function getPercentagePointFormatterFunc(isDecimal) {
	var multiple = isDecimal ? 100 : 1;

	return function ptgLblFunc() {
		return '<span style="color: ' + this.color + '">\u25CF</span> ' + this.series.name + ':\n<b>' + (this.y * multiple).toFixed(0) + '%</b><br/>';
	};
}

var Chart = function (_React$Component) {
	_inherits(Chart, _React$Component);

	function Chart() {
		_classCallCheck(this, Chart);

		var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this));

		_this.setRef = function (ele) {
			_this.$ele = ele;
		};

		_this.checkUpdate = function (props) {
			var prevProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var config = props.config;

			if (config !== prevProps.config) {
				_this.refreshChart(config, props);
			}
		};

		_this.refreshChart = function (config, _ref) {
			var timestamp = _ref.timestamp,
			    percentage = _ref.percentage,
			    preUpdateConfig = _ref.preUpdateConfig,
			    postUpdateConfig = _ref.postUpdateConfig,
			    onItemClick = _ref.onItemClick;

			if (!_this.$ele) return;

			var myConfig = _extends({}, getDefaultConfig());

			if (onItemClick) {
				myConfig.plotOptions.series = {
					cursor: 'pointer',
					point: {
						events: {
							click: function click(event) {
								onItemClick(event, this);
							}
						}
					}
				};
			}

			// Pre of config
			if (preUpdateConfig) {
				myConfig = preUpdateConfig(myConfig);
			}

			// Merge config
			myConfig = _extends({}, myConfig, config);

			// Inner update
			if (timestamp) {
				myConfig = (0, _pathUtil.updateValue)(myConfig, ['xAxis', 'type'], function () {
					return 'datetime';
				});
			}

			if (percentage) {
				myConfig = (0, _pathUtil.updateValue)(myConfig, ['yAxis', 'labels', 'formatter'], function () {
					return getPercentageLabelFunc(percentage === 'decimal');
				});

				myConfig = (0, _pathUtil.updateValue)(myConfig, ['tooltip', 'pointFormatter'], function () {
					return getPercentagePointFormatterFunc(percentage === 'decimal');
				});
			}

			// Post of config
			if (postUpdateConfig) {
				myConfig = postUpdateConfig(myConfig);
			}

			if (!_this.chart || _this.chart.series.length !== myConfig.series.length) {
				_this.chart = _highcharts2.default.chart(_this.$ele, myConfig);
			} else {
				_this.chart.update(myConfig);
			}

			setTimeout(function () {
				if (!_this.$ele || !_this.chart) return;
				if (_this.$ele.offsetHeight < _this.$ele.scrollHeight) {
					_this.chart.reflow();
				}
			}, 0);
		};

		_this.state = {};
		_this.chart = null;
		return _this;
	}

	_createClass(Chart, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.checkUpdate(this.props);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.checkUpdate(nextProps, this.props);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.chart) {
				this.chart.destroy();
				this.chart = null;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    height = _props.height,
			    width = _props.width,
			    loading = _props.loading;

			var hasSize = !!(height || width);
			var style = {};
			if (height) style.height = (0, _uiUtils.toUnit)(height);
			if (width) style.width = (0, _uiUtils.toUnit)(width);

			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('fry-chart', 'overlay-wrapper', (!hasSize || !className) && 'fry-chart-noSize', className),
					style: style
				},
				_react2.default.createElement(
					'div',
					{ className: 'btn-chart-content', ref: this.setRef },
					'Chart Content'
				),
				loading && _react2.default.createElement(
					'div',
					{ className: 'overlay' },
					_react2.default.createElement('span', { className: 'fa fa-refresh fa-spin' })
				)
			);
		}
	}]);

	return Chart;
}(_react2.default.Component);

Chart.propTypes = {
	className: _propTypes2.default.string,
	preUpdateConfig: _propTypes2.default.func,
	postUpdateConfig: _propTypes2.default.func,
	config: _propTypes2.default.object,
	height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

	timestamp: _propTypes2.default.bool,
	percentage: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
	loading: _propTypes2.default.bool,

	onItemClick: _propTypes2.default.func
};

var commonPropTypes = exports.commonPropTypes = _extends({}, Chart.propTypes);
delete commonPropTypes.preUpdateConfig;

exports.default = Chart;