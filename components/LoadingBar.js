import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LoadingIcon = ({ type = 'primary', hide, className, style }) => {
	if (hide) return null;

	return (
		<div className={classNames('progress active', className)} style={style}>
			<div className={classNames(`progress-bar progress-bar-${type} progress-bar-striped`)} style={{ width: '100%' }} />
		</div>
	);
};

LoadingIcon.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	type: PropTypes.string,
	hide: PropTypes.bool,
};

export default LoadingIcon;
