import React from 'react';
import $ from 'jquery';
import { markdown } from 'markdown';

import { Box, ButtonGroup, Button, A } from '../../../components';

class Note extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		$(window).resize();
	}

	render() {
		const $mdInter = markdown.toHTML('Hello *World*!');
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
};

export default Note;
