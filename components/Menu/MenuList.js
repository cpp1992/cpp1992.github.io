import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withProps } from '../PropsComponent';

const onContextMenu = (event) => {
	event.preventDefault();
};

class Li extends React.Component {
	onClick = (...args) => {
		const { disabled, onClick, onItemTrigger } = this.props;
		if (!disabled) {
			if (onClick) onClick(...args);
			onItemTrigger();
		}
	};

	render() {
		const { ...props } = this.props;
		delete props.disabled;
		delete props.onItemTrigger;
		return <li role="button" {...props} onClick={this.onClick} />;
	}
}

Li.propTypes = {
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	onItemTrigger: PropTypes.func,
};

const PLi = withProps(Li);

class MenuList extends React.Component {
	constructor() {
		super();
		this.state = {
			x: 0,
			y: 0,
			show: false,
		};
	}

	componentWillMount() {
		const { x, y } = this.props;
		this.relocate({ x, y });
	}

	componentWillReceiveProps(nextProps) {
		this.relocate(nextProps);
	}

	onClick = (event) => {
		event.stopPropagation();
	};

	onItemTrigger = () => {
		this.props.onMenuTrigger();
	};

	setMenuRef = (ele) => {
		this.$menu = ele;
	};

	relocate = ({ x, y }) => {
		this.setState({ x, y, show: false });

		setTimeout(() => {
			const rect = this.$menu.getBoundingClientRect();
			let newX = x;
			let newY = y;

			if (window.innerHeight < rect.bottom) {
				newY = window.innerHeight - rect.height;
			}
			if (window.innerWidth < rect.right) {
				newX = x - rect.width;
			}

			this.setState({ x: newX, y: newY, show: true });
		});
	};

	render() {
		const { list = [] } = this.props;
		const { x, y, show } = this.state;
		const hasIcon = list.some(({ icon }) => icon);

		return (
			<ul
				role="button" className={classNames('fry-menu-list', show && 'active')} style={{ left: x, top: y }}
				onContextMenu={onContextMenu} onClick={this.onClick} ref={this.setMenuRef}
			>
				{list.map(({ title, disabled, split, icon, onClick }, index) => (
					<PLi
						key={index} role="button" className={classNames({ disabled, split, hasIcon })}
						disabled={disabled} onClick={onClick} onItemTrigger={this.onItemTrigger}
					>
						{hasIcon && <span className={classNames('fry-menu-icon', 'fa', `fa-${icon}`)} />}
						<div className="btn-menu-title">
							{title}
						</div>
					</PLi>
				))}
				{list.length === 0 && <li className="disabled">(Empty List)</li>}
			</ul>
		);
	}
}

MenuList.propTypes = {
	list: PropTypes.array,
	x: PropTypes.number,
	y: PropTypes.number,
	onMenuTrigger: PropTypes.func,
};

export default MenuList;
