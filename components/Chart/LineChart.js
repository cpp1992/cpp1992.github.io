import React from 'react';
import Chart, { commonPropTypes } from './Chart';
import { setValue } from '../utils/pathUtil';

class LineChart extends React.Component {
	preUpdateConfig = (config) => {
		setValue(config, 'tooltip', {
			shared: true,
			crosshairs: true,
		});
		setValue(config, ['plotOptions', 'line', 'marker', 'enabled'], false);
		return config;
	};

	render() {
		return <Chart {...this.props} preUpdateConfig={this.preUpdateConfig} />;
	}
}

LineChart.propTypes = commonPropTypes;

export default LineChart;
