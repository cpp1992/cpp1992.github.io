'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _A = require('../A');

var _A2 = _interopRequireDefault(_A);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed to the Apache Software Foundation (ASF) under one
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * or more contributor license agreements.  See the NOTICE file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed with this work for additional information
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * regarding copyright ownership.  The ASF licenses this file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * to you under the Apache License, Version 2.0 (the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * "License"); you may not use this file except in compliance
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * with the License.  You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Pagination = function (_React$Component) {
	_inherits(Pagination, _React$Component);

	function Pagination(props) {
		_classCallCheck(this, Pagination);

		var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

		_this.gotoPage = _this.gotoPage.bind(_this);
		_this.goPrevPage = _this.goPrevPage.bind(_this);
		_this.goNextPage = _this.goNextPage.bind(_this);
		_this.goFirstPage = _this.goFirstPage.bind(_this);
		_this.goLastPage = _this.goLastPage.bind(_this);
		return _this;
	}

	_createClass(Pagination, [{
		key: 'gotoPage',
		value: function gotoPage(e, props) {
			var gotoPage = this.props.gotoPage;

			if (gotoPage) {
				gotoPage(typeof e === 'number' ? e : props['data-page']);
			}
		}
	}, {
		key: 'goPrevPage',
		value: function goPrevPage(e) {
			var page = this.props.page;

			e.preventDefault();
			if (page > 1) this.gotoPage(page - 1);
		}
	}, {
		key: 'goNextPage',
		value: function goNextPage(e) {
			var _props = this.props,
			    page = _props.page,
			    count = _props.count,
			    size = _props.size;

			var totalPages = Math.ceil(count / size);
			e.preventDefault();
			if (page < totalPages) this.gotoPage(page + 1);
		}
	}, {
		key: 'goFirstPage',
		value: function goFirstPage(e) {
			e.preventDefault();
			this.gotoPage(1);
		}
	}, {
		key: 'goLastPage',
		value: function goLastPage(e) {
			var _props2 = this.props,
			    count = _props2.count,
			    size = _props2.size;

			var totalPages = Math.ceil(count / size);
			e.preventDefault();
			this.gotoPage(totalPages);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    count = _props3.count,
			    size = _props3.size,
			    _props3$page = _props3.page,
			    page = _props3$page === undefined ? 1 : _props3$page,
			    _props3$range = _props3.range,
			    range = _props3$range === undefined ? 9 : _props3$range,
			    disabled = _props3.disabled;

			var totalPages = Math.ceil(count / size);

			var lRange = Math.floor((range - 1) / 2);
			var rRange = range - 1 - lRange;
			var minPage = page - lRange;
			var maxPage = page + rRange;

			if (minPage < 1) {
				maxPage += -minPage + 1;
				minPage = 1;
			}
			if (maxPage > totalPages) {
				minPage -= maxPage - totalPages;
				maxPage = totalPages;
			}
			if (minPage < 1) minPage = 1;

			var navItems = [];
			for (var i = minPage; i <= maxPage; i += 1) {
				navItems.push(_react2.default.createElement(
					'li',
					{ className: (0, _classnames2.default)({ active: page === i, disabled: disabled }), key: i },
					_react2.default.createElement(
						_A2.default,
						{ href: 'javascript:;', 'data-page': i, onClick: this.gotoPage },
						i
					)
				));
			}

			return _react2.default.createElement(
				'ul',
				{ className: 'pagination pull-right' },
				_react2.default.createElement(
					'li',
					{ className: (0, _classnames2.default)({ disabled: page <= 1 || disabled }) },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:;', onClick: this.goFirstPage },
						'\xAB'
					)
				),
				_react2.default.createElement(
					'li',
					{ className: (0, _classnames2.default)({ disabled: page <= 1 || disabled }) },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:;', onClick: this.goPrevPage },
						'\u2039'
					)
				),
				navItems,
				_react2.default.createElement(
					'li',
					{ className: (0, _classnames2.default)({ disabled: page >= totalPages || disabled }) },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:;', onClick: this.goNextPage },
						'\u203A'
					)
				),
				_react2.default.createElement(
					'li',
					{ className: (0, _classnames2.default)({ disabled: page >= totalPages || disabled }) },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:;', onClick: this.goLastPage },
						'\xBB'
					)
				)
			);
		}
	}]);

	return Pagination;
}(_react2.default.Component);

Pagination.propTypes = {
	gotoPage: _propTypes2.default.func,
	count: _propTypes2.default.number.isRequired,
	size: _propTypes2.default.number,
	page: _propTypes2.default.number,
	range: _propTypes2.default.number,
	disabled: _propTypes2.default.bool
};

exports.default = Pagination;