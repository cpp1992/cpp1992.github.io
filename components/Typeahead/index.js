import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from '../PropsComponent';

const Li = withProps(({ children, ...props }) => (
	<li {...props}>{children}</li>
));

Li.propTypes = {
	children: PropTypes.node,
};

export default (Component, queryFunction) => {
	class TypeAhead extends React.Component {
		constructor() {
			super();
			this.state = {
				selected: 0,
				show: false,
			};
			this.prevValue = null;
			this.cacheList = [];
			this.latestPromise = null;

			this.onKeyDown = this.onKeyDown.bind(this);
			this.onBlur = this.onBlur.bind(this);
			this.onOptionSelect = this.onOptionSelect.bind(this);
			this.updateValue = this.updateValue.bind(this);
			this.getList = this.getList.bind(this);
		}

		onKeyDown(event) {
			const { onKeyDown } = this.props;

			if (event.keyCode === 38) {
				this.setSelect(-1);
			} else if (event.keyCode === 40) {
				this.setSelect(1);
			} else if (event.keyCode === 13) {
				const { selected } = this.state;
				const list = this.getList();
				const option = list[selected];
				if (option) {
					this.updateValue(typeof option === 'string' ? option : option.value);
				}
			} else {
				this.setState({ show: true });
			}

			if (onKeyDown) onKeyDown(event);
		}

		onBlur() {
			this.setState({ show: false });
		}

		onOptionSelect(event, props) {
			const value = props['data-value'];
			this.updateValue(value);
		}

		setSelect(value) {
			const { selected } = this.state;
			const len = this.getList().length;
			this.setState({
				selected: (selected + value + len) % len,
			});
		}

		getList() {
			const { value, queryFunc } = this.props;
			if (this.prevValue !== value) {
				const func = (queryFunc || queryFunction);
				if (!func) {
					// No function provided
					this.cacheList = [];
					this.state.selected = 0;
					console.warn('\'queryFunc\' is empty!');
				} else if (Array.isArray(func)) {
					// If is Array, query inline
					const queryStr = String(value).toUpperCase();

					this.latestPromise = null;
					this.state.selected = 0;
					this.cacheList = func.filter((option) => {
						const optionEntity = typeof option === 'string' ? { value: option } : option;
						return String(optionEntity.item || '').toUpperCase().indexOf(queryStr) >= 0 ||
							String(optionEntity.description || '').toUpperCase().indexOf(queryStr) >= 0 ||
							String(optionEntity.value || '').toUpperCase().indexOf(queryStr) >= 0;
					});
				} else if (typeof func === 'function') {
					// Call provided function. Support promise result
					const result = func(value) || [];
					if (result.then) {
						this.latestPromise = result;
						result.then((list) => {
							if (this.latestPromise !== result) return;

							this.cacheList = list;
							this.state.selected = 0;
							this.forceUpdate();
						});
					} else {
						this.latestPromise = null;
						this.cacheList = result;
						this.state.selected = 0;
					}
				} else {
					// Type not support
					console.error('`queryFunc` type not support:', typeof queryFunc, queryFunc);
				}
				this.prevValue = value;
			}
			return this.cacheList;
		}

		updateValue(value) {
			const { onChange, onSelectValue } = this.props;
			const mockEvent = {
				type: 'change',
				target: {
					value,
				},
			};
			if (onChange) onChange(mockEvent);
			if (onSelectValue) onSelectValue(value);
			this.setState({ show: false });
		}

		render() {
			const list = this.getList();
			const { selected, show } = this.state;
			const props = Object.assign({}, this.props);
			delete props.queryFunc;
			delete props.onSelectValue;

			return (
				<div className="typeAhead clearfix">
					<Component
						{...props}
						onKeyDown={this.onKeyDown}
						onBlur={this.onBlur}
					/>
					{show && list.length ? (
						<ul className="typeAhead-list">
							{list.map((option, index) => {
								const optionEntity = typeof option === 'string' ? { value: option } : option;

								return (
									<Li
										key={index} role="button" data-value={optionEntity.value}
										className={index === selected && 'active'}
										onMouseDown={this.onOptionSelect}
									>
										{optionEntity.item || optionEntity.description || optionEntity.value}
									</Li>
								);
							})}
						</ul>
					) : null}
				</div>
			);
		}
	}

	TypeAhead.propTypes = {
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		queryFunc: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
		onChange: PropTypes.func,
		onSelectValue: PropTypes.func,
		onKeyDown: PropTypes.func,
	};

	return TypeAhead;
};
