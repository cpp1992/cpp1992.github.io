import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../Button';
import { withProps } from '../PropsComponent';

function parseValues(values = []) {
	return values.map(value => (
		typeof value === 'object' ? value : { value }
	));
}

const Li = withProps(({ entity, ...rest }) => ( // eslint-disable-line no-unused-vars
	<li {...rest} />
));
Li.propTypes = {
	entity: PropTypes.object,
};

class InlineList extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	onRemoveItem = (event, props) => {
		const { value, onRemoveItem, onChange } = this.props;
		const index = props['data-index'];
		const item = value[index];
		const newValue = value.concat();
		newValue.splice(index, 1);

		if (onRemoveItem) onRemoveItem(item);
		if (onChange) {
			onChange({
				target: {
					value: newValue,
				},
			});
		}
	};

	onItemClick = (event, { entity }) => {
		const { onItemClick } = this.props;
		if (onItemClick) onItemClick(entity);
	};

	render() {
		const { value: values, disabled, readOnly, className, icon = 'times', type } = this.props;
		const parsedValues = parseValues(values);

		return (
			<ul className={classNames('list-inline InlineList', className)}>
				{parsedValues.map((entity, index) => {
					const {
						value, description, readOnly: itemReadOnly, type: itemType,
					} = entity;
					const mergedType = itemType || type;

					return (
						<Li
							key={index} onClick={this.onItemClick} entity={entity}
							className={classNames('label', 'clearfix', {
								'label-primary': !mergedType && (!readOnly && !disabled),
								'label-default': !mergedType && (readOnly || disabled),
							}, mergedType && `label-${mergedType}`)}
						>
							{description || value}
							{!disabled && !readOnly && !itemReadOnly &&
								<Button className={classNames('fa', `fa-${icon}`)} data-index={index} onClick={this.onRemoveItem} />
							}
							{disabled && !readOnly && !itemReadOnly &&
								<button className="fa fa-ban" disabled />
							}
						</Li>
					);
				})}
				{parsedValues.length === 0 &&
					<li className="text-muted">(Empty List)</li>
				}
			</ul>
		);
	}
}

InlineList.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,
	icon: PropTypes.string,
	value: PropTypes.array.isRequired,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	onRemoveItem: PropTypes.func,
	onChange: PropTypes.func,
	onItemClick: PropTypes.func,
};

export default InlineList;
