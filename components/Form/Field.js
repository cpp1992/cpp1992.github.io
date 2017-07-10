import React from 'react';
import PropTypes from 'prop-types';

export const FRY_FORM_FILED = 'FRY_FORM_FILED';

function parseValues(values) {
	return values.map(value => (
		typeof value === 'object' ? value : {
			value,
		}
	));
}

const getName = (name) => {
	if (Array.isArray(name)) return name.join('_');
	return name;
};

class Field extends React.Component {
	constructor() {
		super();
		this.isChecked = this.isChecked.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
	}

	onChange(event) {
		const { name, onChange, onValueChange } = this.props;
		const value = event.target.value;

		if (onValueChange) onValueChange(this.doFilter(value), name);
		if (onChange) onChange(event);
	}

	onCheckBoxChange(groupCheckBoxValue) {
		const { name, onChange, onValueChange } = this.props;

		let value;
		if (typeof groupCheckBoxValue !== 'string') {
			value = !this.props.value;
		} else if (this.isChecked(groupCheckBoxValue)) {
			value = this.props.value.filter(val => val !== groupCheckBoxValue);
		} else {
			value = (this.props.value || []);
			value.push(groupCheckBoxValue);
		}

		if (onValueChange) onValueChange(this.doFilter(value), name);
		if (onChange) onChange(groupCheckBoxValue);
	}

	doFilter = (value) => {
		const { filter } = this.props;
		if (!filter) return value;
		return filter(value);
	};

	isChecked(value) {
		return (this.props.value || []).indexOf(value) >= 0;
	}

	render() {
		const {
			name, displayName, description,
			type, inline, values, value, rows,
			component: Component, ...props
		} = this.props;

		let $input = null;
		const myName = getName(name);

		delete props.onValueChange;
		delete props.onChange;
		delete props.filter;

		if (Component) {
			$input = <Component {...props} value={value} onChange={this.onChange} />;
		} else {
			switch (type) {
				case 'bool':
				case 'checkbox':
					if (!values) {
						return (
							<div className="checkbox">
								<label htmlFor={myName}>
									<input
										id={myName} type="checkbox" checked={!!value}
										onChange={this.onCheckBoxChange} {...props}
									/> {displayName || myName}
								</label>
							</div>
						);
					}
					return (
						<div>
							{parseValues(values).map((item, index) => {
								const $checkbox = (
									<label
										key={index}
										htmlFor={`${myName}_${index}`}
										className={inline && 'checkbox-inline'}
									>
										<input
											id={`${myName}_${index}`} type="checkbox"
											onChange={() => {
												this.onCheckBoxChange(item.value);
											}} checked={this.isChecked(item.value)} {...props}
										/> {item.description || item.value}
									</label>
								);

								return inline ? $checkbox : (
									<div className={inline ? 'inline' : 'checkbox'} key={index}>
										{$checkbox}
									</div>
								);
							})}
						</div>
					);

				case 'radio':
					return (
						<div>
							{parseValues(values).map((item, index) => {
								const $radio = (
									<label
										key={index}
										htmlFor={`${myName}_${index}`}
										className={inline && 'radio-inline'}
									>
										<input
											type="radio" name={myName} id={`${myName}_${index}`} value={item.value}
											onChange={this.onChange} {...props}
										/> {item.description || item.value}
									</label>
								);

								return inline ? $radio : (
									<div className={inline ? 'inline' : 'radio'} key={index}>
										{$radio}
									</div>
								);
							})}
						</div>
					);

				case 'email':
				case 'number':
				case 'search':
				case 'password':
				default:
					if (values) {
						let miss = false;
						const parsedValue = value || '';
						const parsedValues = parseValues(values);
						if (!parsedValue && parsedValues.every(item => item.value !== parsedValue)) {
							miss = true;
						}

						$input = (
							<select className="form-control" value={parsedValue} onChange={this.onChange} {...props}>
								{miss && <option value="" />}
								{parseValues(values).map((item, index) => (
									<option key={index} value={item.value}>{item.description || item.value}</option>
								))}
							</select>
						);
					} else if (rows || type === 'textarea') {
						$input = (
							<textarea
								className="form-control" id={myName} placeholder={description}
								value={value || ''} onChange={this.onChange} rows={rows || 5} {...props}
							/>
						);
					} else {
						$input = (
							<input
								type={type || 'text'} className="form-control" id={myName} placeholder={description}
								value={value || ''} onChange={this.onChange} {...props}
							/>
						);
					}
			}
		}

		return (
			<div className="form-group">
				{displayName !== '' &&
					<label htmlFor={myName}>{displayName || myName}</label>
				}
				{$input}
			</div>
		);
	}
}

Field.propTypes = {
	name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
	displayName: PropTypes.node,
	description: PropTypes.string,
	type: PropTypes.string,
	inline: PropTypes.bool,
	rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	component: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.array,
		PropTypes.object,
		PropTypes.symbol,
	]),
	values: PropTypes.array,

	filter: PropTypes.func,
	onChange: PropTypes.func,
	onValueChange: PropTypes.func,
};

Field[FRY_FORM_FILED] = FRY_FORM_FILED;

export default Field;
