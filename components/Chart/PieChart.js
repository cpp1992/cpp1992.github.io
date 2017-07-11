import React from 'react';
import Chart, { commonPropTypes } from './Chart';
import { setValue } from '../utils/pathUtil';

class PieChart extends React.Component {
	preUpdateConfig = (config) => {
		setValue(config, ['chart', 'type'], 'pie');
		setValue(config, ['plotOptions', 'pie', 'dataLabels', 'enabled'], false);
		setValue(config, ['plotOptions', 'pie', 'showInLegend'], true);
		return config;
	};

	render() {
		return <Chart {...this.props} preUpdateConfig={this.preUpdateConfig} />;
	}
}

PieChart.propTypes = commonPropTypes;

export default PieChart;
