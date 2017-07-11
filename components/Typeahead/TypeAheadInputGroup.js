import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TypeAheadInput from './TypeAheadInput';

class TypeAheadInputGroup extends React.Component {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		const { onSelectValue, value } = this.props;
		if (onSelectValue) {
			onSelectValue(value);
		}
	}

	render() {
		const { type = 'primary', text = 'Confirm', queryFunc, onChange, ...props } = this.props;

		return (
			<div className="input-group">
				<TypeAheadInput queryFunc={queryFunc} onChange={onChange} {...props} />
				<span className="input-group-btn">
					<button className={classNames('btn', `btn-${type}`)} onClick={this.onClick}>{text}</button>
				</span>
			</div>
		);
	}
}

TypeAheadInputGroup.propTypes = {
	queryFunc: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onSelectValue: PropTypes.func,
	type: PropTypes.string,
	text: PropTypes.string,
};

export default TypeAheadInputGroup;
