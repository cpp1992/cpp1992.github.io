import React from 'react';
import PropTypes from 'prop-types';

import { FRY_BUTTON } from './index';

class ButtonGroup extends React.Component {
	onChange = (activeIndex) => {
		const { onChange } = this.props;
		if (onChange) {
			onChange({
				target: {
					value: activeIndex,
				},
			});
		}
	};

	render() {
		const { children, active } = this.props;
		let index = 0;
		const $children = React.Children.map(children, (node) => {
			if (React.isValidElement(node) && node.type[FRY_BUTTON] === FRY_BUTTON) {
				const props = node.props;
				const myIndex = index;
				index += 1;

				return React.cloneElement(node, {
					active: String(myIndex) === String(active),
					onClick: (...args) => {
						if (props.onClick) props.onClick(...args);
						this.onChange(myIndex);
					},
				});
			}
			return node;
		});

		return (
			<div className="btn-group">
				{$children}
			</div>
		);
	}
}

ButtonGroup.propTypes = {
	active: PropTypes.number,
	children: PropTypes.node,
	onChange: PropTypes.func,
};

export default ButtonGroup;
