import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';

import Pagination from './Pagination';
import Th from './Th';
import { withProps } from '../PropsComponent';
import { getValue } from '../utils/pathUtil';
import { sort as sortArray } from '../utils/arrayUtils';
import { toUnit } from '../utils/uiUtils';

export Column from './Column';

const TABLE_CLASS_REGEX = /\btable\b/;

const Tr = withProps(({ children, ...props }) => (
	<tr {...props}>{children}</tr>
));

Tr.propTypes = {
	children: PropTypes.node,
};

function getSortPath(props) {
	return props.sortPath || (props.sort && props.field);
}

/**
 * Convert string or array to array
 * @param path
 */
function pathToArray(path) {
	if (path && !Array.isArray(path)) {
		return [path];
	}
	return path;
}

function arrayLike(list1 = [], list2 = []) {
	if (list1.length !== list2.length) return false;

	for (let i = 0; i < list1.length; i += 1) {
		if (list1[i] !== list2[i]) return false;
	}
	return true;
}

function getSortConfig(sort, columnList = []) {
	let sortConfig = {
		path: null,
		asc: true,
	};
	if (Array.isArray(sort)) {
		sortConfig.path = sort;
	} else if (typeof sort === 'object') {
		sortConfig = Object.assign(sortConfig, sort);
	} else {
		sortConfig.path = sort;
	}

	if (sortConfig.path) {
		sortConfig.path = pathToArray(sortConfig.path);
	}

	for (let i = 0; i < columnList.length; i += 1) {
		if (arrayLike(sortConfig.path, pathToArray(getSortPath(columnList[i])))) {
			sortConfig.index = i;
			break;
		}
	}

	return sortConfig;
}

class Table extends React.Component {
	constructor(props) {
		super(props);

		this.sort = getSortConfig(this.props.sort, this.getColumns());

		this.state = {
			page: 1,
			sortList: this.getSortList(),
		};
		this.getPageCount = this.getPageCount.bind(this);
		this.gotoPage = this.gotoPage.bind(this);
		this.doSort = this.doSort.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const nextSort = getSortConfig(nextProps.sort, this.getColumns());
		if (this.sort.sortPath !== nextSort.sortPath || this.props.list !== nextProps.list) {
			this.sort = nextSort;
			this.setState({ sortList: this.getSortList(nextProps) });
		}
	}

	onRowClick(event, props) {
		const { onRowClick } = this.props;
		if (onRowClick) {
			onRowClick(event, props['data-item'], props['data-index']);
		}
	}

	getPageCount() {
		const { list, size = 10 } = this.props;
		const len = list instanceof Immutable.List ? list.size : list.length;
		return Math.ceil(len / size);
	}

	getSortList(props) {
		const list = ((props || this.props).list || []).concat();
		return this.sort.path ? sortArray(list, this.sort.path, this.sort.asc) : list;
	}

	getColumns() {
		const { children } = this.props;
		return children ? React.Children.map(children, cell => cell.props) : [];
	}

	gotoPage(newPage) {
		const page = newPage === -1 ? this.getPageCount() : newPage;
		this.setState({ page });
	}

	doSort(e, props) {
		const sortPath = getSortPath(props['data-col']);
		if (!sortPath) return;

		const sort = getSortConfig(sortPath, this.getColumns());
		if (arrayLike(sort.path, this.sort.path)) {
			this.sort.asc = !this.sort.asc;
			this.setState({ sortList: this.state.sortList.reverse() });
		} else {
			this.sort = sort;
			this.setState({ sortList: this.getSortList() });
		}
	}

	render() {
		const { className, size = 10, range } = this.props;
		const { sortList } = this.state;
		let { page } = this.state;
		const columns = this.getColumns();

		const len = sortList instanceof Immutable.List ? sortList.size : sortList.length;
		const totalPages = this.getPageCount();
		if ((totalPages === 0 && page !== 1) || page < 1) {
			page = 1;
		} else if (page > totalPages) {
			page = totalPages;
		}

		// Get current page list
		const start = (page - 1) * size;
		const end = page * size;
		const _list = sortList.slice(start, end);

		// Table class
		const tableClass = className || 'table table-bordered';

		return (
			<div className="clearfix sort-table">
				<div className={TABLE_CLASS_REGEX.test(tableClass) && 'table-responsive'}>
					<table className={tableClass}>
						<thead>
							<tr>
								{columns.map((col, j) => {
									const style = {};
									if (col.contentWidth) {
										style.minWidth = toUnit(col.contentWidth);
									}

									return (
										<Th
											key={j} width={col.width}
											data-col={col} onClick={this.doSort}
											className={classNames({
												sortable: col.sort || col.sortPath,
												up: this.sort.index === j && this.sort.asc,
												down: this.sort.index === j && !this.sort.asc,
											})}
										>
											<div style={style}>
												{col.head || col.field}
											</div>
										</Th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{_list.map((item, index) => (
								<Tr key={index} onClick={this.onRowClick} data-item={item} data-index={index}>
									{columns.map((col, j) => {
										let content;

										const { className: colClass, styleName: colStyle, ...colProps } = col;
										const styleProps = {};
										const value = getValue(item, col.field);

										if (colClass) styleProps.className = colClass;
										if (colStyle) styleProps.styleName = colStyle;

										if (col.cell) {
											content = <col.cell item={item} value={value} {...colProps} />;
										} else if (col.render) {
											content = col.render({
												item,
												value,
												...colProps,
											});
										} else {
											content = value === undefined ? col.default : value;
										}
										if (col.th) {
											return <th key={j} {...styleProps}>{content}</th>;
										}
										return <td key={j} {...styleProps}>{content}</td>;
									})}
								</Tr>
							))}
						</tbody>
					</table>
				</div>

				<p className="pull-left">show {Math.min(len, Math.max(1, start + 1))} to {Math.min(len, end)} of {len} items</p>

				<Pagination count={len} size={size} page={page} range={range} gotoPage={this.gotoPage} />
			</div>
		);
	}
}

Table.propTypes = {
	className: PropTypes.string,
	sort: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.object,
	]),
	size: PropTypes.number,
	range: PropTypes.number,
	list: PropTypes.arrayOf(PropTypes.object),
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	onRowClick: PropTypes.func,
};

export default Table;
