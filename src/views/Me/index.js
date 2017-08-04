import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import $ from 'jquery';
import { markdown } from 'markdown';

import { Box, ButtonGroup, Button, A } from '../../../components';

import styles from './index.scss';

class Me extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		$(window).resize();
	}

	render() {
		const $mdInter = markdown.toHTML('*Coming Soon...*!');
		const mdInterObj = {
			__html: $mdInter,
		}

		return (
			<div>
				<section className="content-header">
					<h1>
						我的简历
						<small>有梦想就去追，别觉得累。</small>
					</h1>
				</section>
				<section className="content">
					<Box title="个人简历">
						<div dangerouslySetInnerHTML={mdInterObj} />
					</Box>
				</section>
			</div>
		);
	}
}

Me.propTypes = {
	dispatch: PropTypes.func,
};

const mapState = ({
	mdfiles,
}) => ({
	mdfilesList: mdfiles,
});

export default connect(mapState)(cssModules(Me, styles));
