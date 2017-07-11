import React from 'react';
import PropTypes from 'prop-types';
import withTypeAhead from './index';

const TypeAheadInput = withTypeAhead(({ ...props }) => (
	<input type="text" className="form-control" {...props} />
));

TypeAheadInput.propTypes = {
	queryFunc: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onSelectValue: PropTypes.func,
};

export default TypeAheadInput;
