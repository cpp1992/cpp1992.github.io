import React from 'react';
import PropTypes from 'prop-types';
import Chart, { commonPropTypes } from './Chart';
import { setValue } from '../utils/pathUtil';

class BarChart extends React.Component {
	preUpdateConfig = (config) => {
		const { stack } = this.props;

		setValue(config, ['chart', 'type'], 'column');

		if (stack) {
			setValue(config, ['plotOptions', 'column', 'stacking'], 'normal');
		}

		return config;
	};

	render() {
		return <Chart {...this.props} preUpdateConfig={this.preUpdateConfig} />;
	}
}

BarChart.propTypes = {
	...commonPropTypes,
	stack: PropTypes.bool,
};

export default BarChart;
