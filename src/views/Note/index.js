import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import $ from 'jquery';
import { markdown } from 'markdown';

import { Box, ButtonGroup, Button, A } from '../../../components';

import { mdFilesRead } from '../../actions/md';

import styles from './index.scss';

class Note extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentWillMount() {
		//const { dispatch } = this.props;
		//dispatch(mdFilesRead('maxiang'));
	}

	componentDidMount() {
		$(window).resize();
	}

	render() {
		const $mdInter = markdown.toHTML('*Coming Soon...*!');
		const mdInterObj = {
			__html: $mdInter,
		}
		const $toolbar = (
			<ButtonGroup active={0}>
				<Button type="default"><span className="fa fa-th" /> Heatmap</Button>
				<Button type="default"><span className="fa fa-th-list" /> List</Button>
			</ButtonGroup>
		);

		return (
			<div>
				<section className="content-header">
					<h1>
						Note
						<small>This is a note page.</small>
					</h1>
				</section>
				<section className="content">
					<Box title="Button Group" toolBar={$toolbar}>
						<p>Hello world</p>
						<A href="https://github.com/evilstreak/markdown-js">https://github.com/evilstreak/markdown-js</A>
						{$mdInter}
						<div dangerouslySetInnerHTML={mdInterObj} />
					</Box>
				</section>
			</div>
		);
	}
}

Note.propTypes = {
	dispatch: PropTypes.func,
};

const mapState = ({
	mdfiles,
}) => ({
	mdfilesList: mdfiles,
});

export default connect(mapState)(cssModules(Note, styles));
