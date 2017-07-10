import React from 'react';
import PropTypes from 'prop-types';

import { capitalize } from '../utils/stringUtils';

import { withProps } from '../PropsComponent';
import A from '../A';
import Condition from '../Condition';

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

const wrapEvent = (value, event = { target: {} }) => ({
	...event,
	target: {
		...event.target,
		value,
	},
});

const Input = withProps(props => (
	<input {...props} />
));

class StateFormField extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	onChange = (event) => {
		const { name, onChange } = this.props;
		const { onFieldChange } = this.context;
		const value = event.target.value;

		onFieldChange(this.doFilter(value), name);
		if (onChange) onChange(event);
	};

	onSingleCheckBoxChange = (event) => {
		const value = !this.getValue();
		this.onChange(wrapEvent(value, event));
	};

	onGroupCheckBoxChange = (event, checkProps) => {
		const value = checkProps['data-value'];
		const values = this.getValue() || [];
		if (values.indexOf(value) === -1) {
			this.onChange(wrapEvent([...values, value], event));
		} else {
			this.onChange(wrapEvent(values.filter(val => val !== value), event));
		}
	};

	onListItemRemove = (event, btnProps) => {
		const index = btnProps['data-index'];
		const value = (this.getValue() || []).concat();
		value.splice(index, 1);
		this.onChange(wrapEvent(value, event));
	};

	onNewListValue = (event) => {
		const value = this.getValue() || [];
		this.onChange(wrapEvent([...value, undefined], event));
	};

	getValue = () => {
		const { getFieldValue } = this.context;
		if (this.props.value) return this.props.value;

		return getFieldValue(this.props.name);
	};

	doFilter = (value) => {
		const { filter } = this.props;
		if (!filter) return value;
		return filter(value);
	};

	isChecked = value => (this.getValue() || []).indexOf(value) >= 0;

	render() {
		const {
			name, displayName, description,
			type, inline, values, rows, isList,
			component: Component, passStateProps, ...props
		} = this.props;
		const { getFormDisabled } = this.context;

		let $input = null;
		const myName = getName(name);
		const myFormatName = capitalize(myName);
		const value = this.getValue();
		const disabled = getFormDisabled();

		delete props.onChange;
		delete props.filter;
		delete props.value;

		if (isList) {
			const path = Array.isArray(name) ? name : [name];
			const lastName = path[path.length - 1];

			return (
				<div className="fry-state-form-list">
					<p className="fry-state-form-list-title">{displayName || myFormatName}</p>
					<div className="fry-state-form-list-content">
						<Condition is={!(value || []).length}>
							<p className="text-muted fry-state-form-list-content-empty">(Empty List)</p>
						</Condition>
						{(value || []).map((_, index) => {
							const subProps = {
								...this.props,
								name: [...path, index],
								displayName: (
									<span>
										[<A className="fa fa-times" data-index={index} onClick={this.onListItemRemove} />]
										{' '}{lastName} - {index}
									</span>
								),
								isList: false,
							};
							return <StateFormField key={index} {...subProps} />;
						})}
						<a role="button" onClick={this.onNewListValue}>+ New Value</a>
					</div>
				</div>
			);
		}

		if (Component) {
			if (passStateProps) props.stateProps = this.props;

			$input = (
				<Component
					{...props} type={type} value={value} disabled={disabled} onChange={this.onChange}
				/>
			);
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
										disabled={disabled}
										onChange={this.onSingleCheckBoxChange} {...props}
									/> {displayName || myFormatName}
								</label>
							</div>
						);
					}
					return (
						<div className={inline && 'form-group'}>
							{parseValues(values).map((item, index) => {
								const $checkbox = (
									<label
										key={index}
										htmlFor={`${myName}_${index}`}
										className={inline && 'checkbox-inline'}
									>
										<Input
											id={`${myName}_${index}`} type="checkbox"
											disabled={disabled}
											onChange={this.onGroupCheckBoxChange}
											data-value={item.value}
											checked={this.isChecked(item.value)} {...props}
										/> {item.description || item.value}
									</label>
								);

								return inline ? $checkbox : (
									<div className="checkbox" key={index}>
										{$checkbox}
									</div>
									);
							})}
						</div>
					);

				case 'radio':
					return (
						<div className={inline && 'form-group'}>
							{parseValues(values).map((item, index) => {
								const $radio = (
									<label
										key={index}
										htmlFor={`${myName}_${index}`}
										className={inline && 'radio-inline'}
									>
										<input
											type="radio" name={myName} id={`${myName}_${index}`} value={item.value}
											disabled={disabled}
											onChange={this.onChange} {...props}
										/> {item.description || item.value}
									</label>
								);

								return inline ? $radio : (
									<div className="radio" key={index}>
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
						if (parsedValues.every(item => item.value !== parsedValue)) {
							miss = true;
						}

						$input = (
							<select
								className="form-control" value={parsedValue}
								disabled={disabled}
								onChange={this.onChange} {...props}
							>
								{miss && <option value={parsedValue}>{parsedValue}</option>}
								{parseValues(values).map((item, index) => (
									<option key={index} value={item.value}>{item.description || item.value}</option>
								))}
							</select>
						);
					} else if (rows || type === 'textarea' || type === 'blob') {
						$input = (
							<textarea
								className="form-control" id={myName} placeholder={description}
								disabled={disabled}
								value={value || ''} onChange={this.onChange} rows={rows || 5} {...props}
							/>
						);
					} else {
						$input = (
							<input
								type={type || 'text'} className="form-control" id={myName} placeholder={description}
								disabled={disabled}
								value={value || ''} onChange={this.onChange} {...props}
							/>
						);
					}
			}
		}

		return (
			<div className="form-group">
				{displayName !== '' &&
					<label htmlFor={myName}>{displayName || myFormatName}</label>
				}
				{$input}
			</div>
		);
	}
}

StateFormField.propTypes = {
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
	isList: PropTypes.bool,
	passStateProps: PropTypes.bool,

	filter: PropTypes.func,
	onChange: PropTypes.func,
	onValueChange: PropTypes.func,
};

StateFormField.contextTypes = {
	onFieldChange: PropTypes.func,
	getFieldValue: PropTypes.func,
	getFormDisabled: PropTypes.func,
};

export default StateFormField;
