import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getValue, updateValue } from '../utils/pathUtil';

export const withStateForm = (Component) => {
	const WrapComponent = (props, context) => (
		<Component {...context} {...props} />
	);

	WrapComponent.contextTypes = {
		instance: PropTypes.object,
		path: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
	};

	return WrapComponent;
};

class StateForm extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	getChildContext() {
		return {
			onFieldChange: this.onFieldChange,
			getFieldValue: this.getFieldValue,
			getFormDisabled: this.getFormDisabled,
			instance: this.props.instance,
			path: this.props.path,
		};
	}

	onFieldChange = (value, name) => {
		const { instance, onChange, forceRefresh } = this.props;
		const myPath = this.getPath();
		let currentState;

		instance.setState((preState) => {
			currentState = updateValue(preState, myPath.concat(name), () => value);
			return currentState;
		}, () => {
			if (onChange) {
				onChange({
					target: { value: getValue(currentState, myPath) },
				});
			}
		});
		if (forceRefresh) {
			this.setState({});
		}
	};

	getFieldValue = (name) => {
		const { instance } = this.props;
		const entity = getValue(instance.state, this.getPath());
		if (!name || !name.length || !entity) return entity;

		return getValue(entity, name);
	};

	getFormDisabled = () => this.props.disabled;

	getPath = () => {
		const { path } = this.props;
		if (Array.isArray(path)) {
			return path;
		} else if (!path && typeof path !== 'number') {
			return [];
		}
		return [path];
	};

	render() {
		const { className, children } = this.props;

		return (
			<div className={classNames(className, 'fry-state-form')}>
				{children}
			</div>
		);
	}
}

StateForm.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	instance: PropTypes.object.isRequired,
	path: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	forceRefresh: PropTypes.bool,
};

StateForm.childContextTypes = {
	instance: PropTypes.object,
	path: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
	onFieldChange: PropTypes.func,
	getFieldValue: PropTypes.func,
	getFormDisabled: PropTypes.func,
};

export default StateForm;
