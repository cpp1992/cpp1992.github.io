import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Footer from './Footer';

const Box = ({ type = 'primary', title, children, footer, loading, toolBar }) => {
	let $head;
	let $body;
	let $footer;

	if (title || toolBar) {
		$head = (
			<div className="box-header with-border">
				<h3 className="box-title">{title}</h3>
				{toolBar &&
					<div className="box-header-tools">{toolBar}</div>
				}
			</div>
		);
	}

	if (children) {
		$body = (
			<div className="box-body">
				{children}
			</div>
		);
	}

	if (footer) {
		$footer = (footer.type || {})._isBoxFooter ? footer : <Footer>{footer}</Footer>;
	}

	const $loading = loading ? (
		<div className="overlay">
			<span className="fa fa-refresh fa-spin" />
		</div>
	) : null;

	return (
		<div className={classNames('box', 'fry-box', `box-${type}`)}>
			{$head}
			{$body}
			{$footer}
			{$loading}
		</div>
	);
};

Box.propTypes = {
	type: PropTypes.string,
	title: PropTypes.node,
	children: PropTypes.node,
	footer: PropTypes.node,
	loading: PropTypes.bool,
	toolBar: PropTypes.node,
};


export {
	Footer,
};

export default Box;
