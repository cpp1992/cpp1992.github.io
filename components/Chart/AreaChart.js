import React from 'react';
import Chart, { commonPropTypes } from './Chart';
import { setValue } from '../utils/pathUtil';

class AreaChart extends React.Component {
	preUpdateConfig = (config) => {
		setValue(config, ['chart', 'type'], 'area');
		setValue(config, 'tooltip', {
			shared: true,
			crosshairs: true,
		});
		setValue(config, ['plotOptions', 'area', 'stacking'], 'normal');
		setValue(config, ['plotOptions', 'area', 'marker', 'enabled'], false);
		return config;
	};

	render() {
		return <Chart {...this.props} preUpdateConfig={this.preUpdateConfig} />;
	}
}

AreaChart.propTypes = commonPropTypes;

export default AreaChart;
