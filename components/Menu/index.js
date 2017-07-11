import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MenuList from './MenuList';

class Menu extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		window.addEventListener('click', this.hideMenu);
		window.addEventListener('contextmenu', this.hideMenu);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.hideMenu);
		window.removeEventListener('contextmenu', this.hideMenu);
	}

	onContextMenu = (event) => {
		event.preventDefault();

		const { menu = [] } = this.props;
		this.showMenu(menu, event.clientX, event.clientY);
	};

	hideMenu = () => {
		this.setState({ list: null });
	};

	showMenu = (list = [], x, y) => {
		setTimeout(() => {
			this.setState({
				list,
				x,
				y,
			});
		}, 0);
	};

	render() {
		const { children, className } = this.props;
		const { list, x, y } = this.state;

		return (
			<div
				className={classNames('fry-menu', className)}
				onContextMenu={this.onContextMenu}
			>
				{children}

				{list ? <MenuList list={list} x={x} y={y} onMenuTrigger={this.hideMenu} /> : null}
			</div>
		);
	}
}

Menu.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	menu: PropTypes.array,
};

export default Menu;
