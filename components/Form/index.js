import React from 'react';
import PropTypes from 'prop-types';
import { FRY_FORM_FILED } from './Field';

import { getValue, setValue } from '../utils/pathUtil';


const isBaseType = type => (
	type === 'string' || type === 'number' || type === 'boolean'
);

const linkElement = (children, instance, option, fields) => {
	const mergedFields = fields || {};
	const childrenType = typeof children;

	if (isBaseType(childrenType)) {
		return {
			element: children,
			fields,
		};
	} if (!children) {
		return {
			element: [],
			fields,
		};
	}

	const element = React.Children.map(children, (component) => {
		// Loop for children elements
		if (!component) {
			return null;
		} else if (isBaseType(typeof component)) {
			return component;
		} else if (!component.type || component.type[FRY_FORM_FILED] !== FRY_FORM_FILED) {
			const entity = component.props ?
				linkElement(component.props.children, instance, option, mergedFields) :
				{ element: [] };

			return React.cloneElement(component, entity.element.length && {
				children: entity.element,
			});
		}

		// Parse Field component
		return React.cloneElement(component, {
			disabled: option.disabled,
			onValueChange: option.onFieldChange,
			value: component.props.value || getValue(instance, component.props.name),
			ref: (field) => {
				mergedFields[component.props.name] = field;
			},
		});
	});
	return {
		element,
		fields: mergedFields,
	};
};

class Form extends React.Component {
	onFieldChange = (value, name) => {
		const { instance, onChange, forceRefresh } = this.props;
		setValue(instance, name, value);

		if (onChange !== false) {
			if (typeof onChange === 'function') {
				onChange({
					target: {
						value: instance,
					},
				});
			} else if (onChange === undefined) {
				const parent = getValue(this, ['_reactInternalInstance', '_currentElement', '_owner', '_instance']);
				if (!parent) {
					if (forceRefresh) {
						this.setState({});
					} else {
						console.warn('Fairy - Form injection failed. Can\'t find parent component.');
					}
				} else {
					parent.setState({});
				}
			}
		}
	};

	render() {
		const { children, instance, disabled } = this.props;
		const entity = linkElement(children, instance, {
			disabled,
			onFieldChange: this.onFieldChange,
		});
		this.fields = entity.fields;

		return (
			<div className="fry-form">
				{entity.element}
			</div>
		);
	}
}

Form.propTypes = {
	forceRefresh: PropTypes.bool,
	instance: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	children: PropTypes.node.isRequired,
	onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	disabled: PropTypes.bool,
};

export default Form;
