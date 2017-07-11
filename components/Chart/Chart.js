import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Highcharts from 'highcharts';

import { updateValue } from '../utils/pathUtil';
import { toUnit } from '../utils/uiUtils';

const getDefaultConfig = () => ({
	credits: { enabled: false },
	tooltip: {
		shared: true,
	},
	title: {
		text: null,
	},
	yAxis: {
		title: {
			text: null,
		},
	},
	plotOptions: {},
	series: [],
});

function getPercentageLabelFunc(isDecimal) {
	const multiple = isDecimal ? 100 : 1;

	return function ptgLblFunc() {
		return `${this.value * multiple}%`;
	};
}

function getPercentagePointFormatterFunc(isDecimal) {
	const multiple = isDecimal ? 100 : 1;

	return function ptgLblFunc() {
		return `<span style="color: ${this.color}">\u25CF</span> ${this.series.name}:
<b>${(this.y * multiple).toFixed(0)}%</b><br/>`;
	};
}

class Chart extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.chart = null;
	}

	componentDidMount() {
		this.checkUpdate(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkUpdate(nextProps, this.props);
	}

	componentWillUnmount() {
		if (this.chart) {
			this.chart.destroy();
			this.chart = null;
		}
	}

	setRef = (ele) => {
		this.$ele = ele;
	};

	checkUpdate = (props, prevProps = {}) => {
		const { config } = props;
		if (config !== prevProps.config) {
			this.refreshChart(config, props);
		}
	};

	refreshChart = (config, {
		timestamp, percentage, preUpdateConfig, postUpdateConfig,
		onItemClick,
	}) => {
		if (!this.$ele) return;

		let myConfig = { ...getDefaultConfig() };

		if (onItemClick) {
			myConfig.plotOptions.series = {
				cursor: 'pointer',
				point: {
					events: {
						click(event) {
							onItemClick(event, this);
						},
					},
				},
			};
		}

		// Pre of config
		if (preUpdateConfig) {
			myConfig = preUpdateConfig(myConfig);
		}

		// Merge config
		myConfig = {
			...myConfig,
			...config,
		};

		// Inner update
		if (timestamp) {
			myConfig = updateValue(myConfig, ['xAxis', 'type'], () => 'datetime');
		}

		if (percentage) {
			myConfig = updateValue(myConfig, ['yAxis', 'labels', 'formatter'],
				() => getPercentageLabelFunc(percentage === 'decimal'),
			);

			myConfig = updateValue(myConfig, ['tooltip', 'pointFormatter'],
				() => getPercentagePointFormatterFunc(percentage === 'decimal'),
			);
		}

		// Post of config
		if (postUpdateConfig) {
			myConfig = postUpdateConfig(myConfig);
		}

		if (!this.chart || this.chart.series.length !== myConfig.series.length) {
			this.chart = Highcharts.chart(this.$ele, myConfig);
		} else {
			this.chart.update(myConfig);
		}

		setTimeout(() => {
			if (!this.$ele || !this.chart) return;
			if (this.$ele.offsetHeight < this.$ele.scrollHeight) {
				this.chart.reflow();
			}
		}, 0);
	};

	render() {
		const { className, height, width, loading } = this.props;
		const hasSize = !!(height || width);
		const style = {};
		if (height) style.height = toUnit(height);
		if (width) style.width = toUnit(width);

		return (
			<div
				className={classNames('fry-chart', 'overlay-wrapper', (!hasSize || !className) && 'fry-chart-noSize', className)}
				style={style}
			>
				<div className="btn-chart-content" ref={this.setRef}>Chart Content</div>
				{loading && <div className="overlay"><span className="fa fa-refresh fa-spin" /></div>}
			</div>
		);
	}
}

Chart.propTypes = {
	className: PropTypes.string,
	preUpdateConfig: PropTypes.func,
	postUpdateConfig: PropTypes.func,
	config: PropTypes.object,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	timestamp: PropTypes.bool,
	percentage: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	loading: PropTypes.bool,

	onItemClick: PropTypes.func,
};

export const commonPropTypes = { ...Chart.propTypes };
delete commonPropTypes.preUpdateConfig;

export default Chart;
