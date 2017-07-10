import React from 'react';
import PropTypes from 'prop-types';
import { getValue } from './utils/pathUtil';

export const FRY_SWITCH_CASE = 'FRY_SWITCH_CASE';
export const FRY_SWITCH_DEFAULT = 'FRY_SWITCH_DEFAULT';
export const FRY_SWITCH_IF = 'FRY_SWITCH_IF';
export const FRY_SWITCH_ELSE = 'FRY_SWITCH_ELSE';

export const Case = () => null;
Case[FRY_SWITCH_CASE] = FRY_SWITCH_CASE;

export const Default = () => null;
Default[FRY_SWITCH_DEFAULT] = FRY_SWITCH_DEFAULT;

export const If = () => null;
If[FRY_SWITCH_IF] = FRY_SWITCH_IF;

export const ElseIf = If;

export const Else = () => null;
Else[FRY_SWITCH_ELSE] = FRY_SWITCH_ELSE;

const Condition = ({ value, is, children }) => {
	let subMatch = false;
	let $content = null;

	const nodeList = React.Children.toArray(children);
	nodeList.some((cell = {}) => {
		const isCase = !!getValue(cell, ['type', FRY_SWITCH_CASE]);
		const isDefault = !!getValue(cell, ['type', FRY_SWITCH_DEFAULT]);
		const isIf = !!getValue(cell, ['type', FRY_SWITCH_IF]);
		const isElse = !!getValue(cell, ['type', FRY_SWITCH_ELSE]);

		if (isCase) {
			if (value === cell.props.value) {
				$content = cell.props.children;
				return true;
			}
		} else if (isIf) {
			if (cell.props.value) {
				$content = cell.props.children;
				return true;
			}
		} else if (isDefault) {
			$content = cell.props.children;
			return true;
		} else if (isElse) {
			$content = cell.props.children;
			return true;
		}

		if (isCase || isIf || isDefault || isElse) {
			subMatch = true;
		}

		return false;
	});

	if (subMatch) {
		return $content;
	}
	return is ? children : null;
};

const valueType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number,
	PropTypes.bool,
	PropTypes.object,
	PropTypes.array,
	PropTypes.func,
]);

Case.propTypes = If.propTypes = ElseIf.propTypes = {
	value: valueType,
	children: PropTypes.node,
};

Default.propTypes = Else.propTypes = {
	children: PropTypes.node,
};

Condition.propTypes = {
	value: valueType,
	is: valueType,
	children: PropTypes.node,
};

export default Condition;
