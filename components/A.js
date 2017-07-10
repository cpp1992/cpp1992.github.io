import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from './PropsComponent';

const A = ({ children, ...props }) => (
	<a {...props}>{children}</a>
);

A.propTypes = {
	children: PropTypes.node,
};

export default withProps(A);
