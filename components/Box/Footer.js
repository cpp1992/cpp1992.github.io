import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Footer = ({ className = 'text-right', children }) => (
	<div className={classNames('box-footer', className)}>
		{ children }
	</div>
);

Footer._isBoxFooter = true;

Footer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Footer;
