import React from 'react';
import PropTypes from 'prop-types';

class SearchInput extends React.Component {
	constructor() {
		super();
		this.state = {
			value: '',
		};
		this.id = 0;
	}

	componentWillMount() {
		this.setState({ value: this.props.value });
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.value !== nextProps.value) {
			this.setState({ value: nextProps.value });
		}
	}

	onChange = (event) => {
		const delay = Number(this.props.delay || 0);
		const value = event.target.value;

		this.setState({ value });

		if (delay > 0) {
			clearTimeout(this.id);
			this.id = setTimeout(() => {
				this.doUpdate(value);
			}, delay);
		} else {
			this.doUpdate(value);
		}
	};

	doUpdate = (value) => {
		const { onChange } = this.props;
		if (onChange) {
			onChange({
				target: { value },
			});
		}
	};

	render() {
		const { description, placeholder, ...props } = this.props;
		delete props.delay;

		return (
			<div className="fry-search-input">
				<input
					{...props} type="text" className="form-control"
					value={this.state.value} onChange={this.onChange}
					placeholder={placeholder || description || 'Search...'}
				/>
				<span className="fa fa-search" />
			</div>
		);
	}
}

SearchInput.propTypes = {
	delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	value: PropTypes.string,
	description: PropTypes.string,
	placeholder: PropTypes.string,
};

export default SearchInput;
