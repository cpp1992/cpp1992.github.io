import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withProps } from '../PropsComponent';

export const FRY_BUTTON = 'FRY_BUTTON';

const Button = ({ className, type = 'primary', size, active, children, ...props }) => (
	<button
		className={className || classNames('btn', `btn-${type}`, size && `btn-${size}`, active && 'active')}
		{...props}
	>{children}</button>
);

Button.propTypes = {
	type: PropTypes.string,
	size: PropTypes.string,
	active: PropTypes.bool,
	onClick: PropTypes.func,
	className: PropTypes.string,
	children: PropTypes.node,
};

const PropsButton = withProps(Button);

PropsButton[FRY_BUTTON] = FRY_BUTTON;

export default PropsButton;
