'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Column = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Th = require('./Th');

var _Th2 = _interopRequireDefault(_Th);

var _PropsComponent = require('../PropsComponent');

var _pathUtil = require('../utils/pathUtil');

var _arrayUtils = require('../utils/arrayUtils');

var _uiUtils = require('../utils/uiUtils');

var _Column2 = require('./Column');

var _Column3 = _interopRequireDefault(_Column2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.Column = _Column3.default;


var TABLE_CLASS_REGEX = /\btable\b/;

var Tr = (0, _PropsComponent.withProps)(function (_ref) {
	var children = _ref.children,
	    props = _objectWithoutProperties(_ref, ['children']);

	return _react2.default.createElement(
		'tr',
		props,
		children
	);
});

Tr.propTypes = {
	children: _propTypes2.default.node
};

function getSortPath(props) {
	return props.sortPath || props.sort && props.field;
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

function arrayLike() {
	var list1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var list2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	if (list1.length !== list2.length) return false;

	for (var i = 0; i < list1.length; i += 1) {
		if (list1[i] !== list2[i]) return false;
	}
	return true;
}

function getSortConfig(sort) {
	var columnList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var sortConfig = {
		path: null,
		asc: true
	};
	if (Array.isArray(sort)) {
		sortConfig.path = sort;
	} else if ((typeof sort === 'undefined' ? 'undefined' : _typeof(sort)) === 'object') {
		sortConfig = Object.assign(sortConfig, sort);
	} else {
		sortConfig.path = sort;
	}

	if (sortConfig.path) {
		sortConfig.path = pathToArray(sortConfig.path);
	}

	for (var i = 0; i < columnList.length; i += 1) {
		if (arrayLike(sortConfig.path, pathToArray(getSortPath(columnList[i])))) {
			sortConfig.index = i;
			break;
		}
	}

	return sortConfig;
}

var Table = function (_React$Component) {
	_inherits(Table, _React$Component);

	function Table(props) {
		_classCallCheck(this, Table);

		var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

		_this.sort = getSortConfig(_this.props.sort, _this.getColumns());

		_this.state = {
			page: 1,
			sortList: _this.getSortList()
		};
		_this.getPageCount = _this.getPageCount.bind(_this);
		_this.gotoPage = _this.gotoPage.bind(_this);
		_this.doSort = _this.doSort.bind(_this);
		_this.onRowClick = _this.onRowClick.bind(_this);
		return _this;
	}

	_createClass(Table, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var nextSort = getSortConfig(nextProps.sort, this.getColumns());
			if (this.sort.sortPath !== nextSort.sortPath || this.props.list !== nextProps.list) {
				this.sort = nextSort;
				this.setState({ sortList: this.getSortList(nextProps) });
			}
		}
	}, {
		key: 'onRowClick',
		value: function onRowClick(event, props) {
			var onRowClick = this.props.onRowClick;

			if (onRowClick) {
				onRowClick(event, props['data-item'], props['data-index']);
			}
		}
	}, {
		key: 'getPageCount',
		value: function getPageCount() {
			var _props = this.props,
			    list = _props.list,
			    _props$size = _props.size,
			    size = _props$size === undefined ? 10 : _props$size;

			var len = list instanceof _immutable2.default.List ? list.size : list.length;
			return Math.ceil(len / size);
		}
	}, {
		key: 'getSortList',
		value: function getSortList(props) {
			var list = ((props || this.props).list || []).concat();
			return this.sort.path ? (0, _arrayUtils.sort)(list, this.sort.path, this.sort.asc) : list;
		}
	}, {
		key: 'getColumns',
		value: function getColumns() {
			var children = this.props.children;

			return children ? _react2.default.Children.map(children, function (cell) {
				return cell.props;
			}) : [];
		}
	}, {
		key: 'gotoPage',
		value: function gotoPage(newPage) {
			var page = newPage === -1 ? this.getPageCount() : newPage;
			this.setState({ page: page });
		}
	}, {
		key: 'doSort',
		value: function doSort(e, props) {
			var sortPath = getSortPath(props['data-col']);
			if (!sortPath) return;

			var sort = getSortConfig(sortPath, this.getColumns());
			if (arrayLike(sort.path, this.sort.path)) {
				this.sort.asc = !this.sort.asc;
				this.setState({ sortList: this.state.sortList.reverse() });
			} else {
				this.sort = sort;
				this.setState({ sortList: this.getSortList() });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    className = _props2.className,
			    _props2$size = _props2.size,
			    size = _props2$size === undefined ? 10 : _props2$size,
			    range = _props2.range;
			var sortList = this.state.sortList;
			var page = this.state.page;

			var columns = this.getColumns();

			var len = sortList instanceof _immutable2.default.List ? sortList.size : sortList.length;
			var totalPages = this.getPageCount();
			if (totalPages === 0 && page !== 1 || page < 1) {
				page = 1;
			} else if (page > totalPages) {
				page = totalPages;
			}

			// Get current page list
			var start = (page - 1) * size;
			var end = page * size;
			var _list = sortList.slice(start, end);

			// Table class
			var tableClass = className || 'table table-bordered';

			return _react2.default.createElement(
				'div',
				{ className: 'clearfix sort-table' },
				_react2.default.createElement(
					'div',
					{ className: TABLE_CLASS_REGEX.test(tableClass) && 'table-responsive' },
					_react2.default.createElement(
						'table',
						{ className: tableClass },
						_react2.default.createElement(
							'thead',
							null,
							_react2.default.createElement(
								'tr',
								null,
								columns.map(function (col, j) {
									var style = {};
									if (col.contentWidth) {
										style.minWidth = (0, _uiUtils.toUnit)(col.contentWidth);
									}

									return _react2.default.createElement(
										_Th2.default,
										{
											key: j, width: col.width,
											'data-col': col, onClick: _this2.doSort,
											className: (0, _classnames2.default)({
												sortable: col.sort || col.sortPath,
												up: _this2.sort.index === j && _this2.sort.asc,
												down: _this2.sort.index === j && !_this2.sort.asc
											})
										},
										_react2.default.createElement(
											'div',
											{ style: style },
											col.head || col.field
										)
									);
								})
							)
						),
						_react2.default.createElement(
							'tbody',
							null,
							_list.map(function (item, index) {
								return _react2.default.createElement(
									Tr,
									{ key: index, onClick: _this2.onRowClick, 'data-item': item, 'data-index': index },
									columns.map(function (col, j) {
										var content = void 0;

										var colClass = col.className,
										    colStyle = col.styleName,
										    colProps = _objectWithoutProperties(col, ['className', 'styleName']);

										var styleProps = {};
										var value = (0, _pathUtil.getValue)(item, col.field);

										if (colClass) styleProps.className = colClass;
										if (colStyle) styleProps.styleName = colStyle;

										if (col.cell) {
											content = _react2.default.createElement(col.cell, _extends({ item: item, value: value }, colProps));
										} else if (col.render) {
											content = col.render(_extends({
												item: item,
												value: value
											}, colProps));
										} else {
											content = value === undefined ? col.default : value;
										}
										if (col.th) {
											return _react2.default.createElement(
												'th',
												_extends({ key: j }, styleProps),
												content
											);
										}
										return _react2.default.createElement(
											'td',
											_extends({ key: j }, styleProps),
											content
										);
									})
								);
							})
						)
					)
				),
				_react2.default.createElement(
					'p',
					{ className: 'pull-left' },
					'show ',
					Math.min(len, Math.max(1, start + 1)),
					' to ',
					Math.min(len, end),
					' of ',
					len,
					' items'
				),
				_react2.default.createElement(_Pagination2.default, { count: len, size: size, page: page, range: range, gotoPage: this.gotoPage })
			);
		}
	}]);

	return Table;
}(_react2.default.Component);

Table.propTypes = {
	className: _propTypes2.default.string,
	sort: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.object]),
	size: _propTypes2.default.number,
	range: _propTypes2.default.number,
	list: _propTypes2.default.arrayOf(_propTypes2.default.object),
	children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)]),
	onRowClick: _propTypes2.default.func
};

exports.default = Table;