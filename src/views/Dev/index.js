import React from 'react';
import $ from 'jquery';
import { Box, ButtonGroup, Button } from '../../../components';

class Dev extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		$(window).resize();
	}

	render() {
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
						Dev
						<small>This is a dev page.</small>
					</h1>
				</section>
				<section className="content">
					<Box title="Button Group" toolBar={$toolbar}>
						Hello world
					</Box>
				</section>
			</div>
		);
	}
}

Dev.propTypes = {
};

export default Dev;
