import React from 'react';
import PropTypes from 'prop-types';

class Column extends React.Component {
	render() {
		return null;
	}
}

Column.propTypes = {
	field: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	th: PropTypes.bool,
	head: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	cell: PropTypes.func,
	className: PropTypes.string,
	styleName: PropTypes.string,
	render: PropTypes.func,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	contentWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	sortPath: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	sort: PropTypes.bool,
	default: PropTypes.node,
};

export default Column;
