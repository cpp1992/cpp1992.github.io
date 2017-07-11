import React from 'react';
import PropTypes from 'prop-types';

class Collapse extends React.Component {
	constructor() {
		super();
		this.state = {
			collapse: false,
		};
	}

	componentWillMount() {
		const { collapse = false } = this.props;
		this.setState({ collapse });
	}

	onCollapse = () => {
		this.setState({ collapse: !this.state.collapse });
	};

	render() {
		const { collapse } = this.state;
		const { className, title, children, passState, collapseContent } = this.props;

		const $title = passState ? React.cloneElement(title, { collapse }) : title;

		return (
			<div className={className}>
				<div role="button" onClick={this.onCollapse}>{$title}</div>
				{collapse && collapseContent }
				{!collapse && children }
			</div>
		);
	}
}

Collapse.propTypes = {
	className: PropTypes.string,
	collapse: PropTypes.bool,
	title: PropTypes.node,
	passState: PropTypes.bool,
	children: PropTypes.node,
	collapseContent: PropTypes.node,
};

export default Collapse;
