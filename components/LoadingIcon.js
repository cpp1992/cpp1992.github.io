import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LoadingIcon = ({ icon = 'refresh', hide }) => {
	if (hide) {
		return null;
	}
	return <span className={classNames(`fa fa-${icon} fa-spin`)} />;
};

LoadingIcon.propTypes = {
	icon: PropTypes.string,
	hide: PropTypes.bool,
};

export default LoadingIcon;
