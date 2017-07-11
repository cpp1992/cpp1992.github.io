/*
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

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import A from '../A';

class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.gotoPage = this.gotoPage.bind(this);
		this.goPrevPage = this.goPrevPage.bind(this);
		this.goNextPage = this.goNextPage.bind(this);
		this.goFirstPage = this.goFirstPage.bind(this);
		this.goLastPage = this.goLastPage.bind(this);
	}

	gotoPage(e, props) {
		const { gotoPage } = this.props;
		if (gotoPage) {
			gotoPage(typeof e === 'number' ? e : props['data-page']);
		}
	}

	goPrevPage(e) {
		const { page } = this.props;
		e.preventDefault();
		if (page > 1) this.gotoPage(page - 1);
	}
	goNextPage(e) {
		const { page, count, size } = this.props;
		const totalPages = Math.ceil(count / size);
		e.preventDefault();
		if (page < totalPages) this.gotoPage(page + 1);
	}
	goFirstPage(e) {
		e.preventDefault();
		this.gotoPage(1);
	}
	goLastPage(e) {
		const { count, size } = this.props;
		const totalPages = Math.ceil(count / size);
		e.preventDefault();
		this.gotoPage(totalPages);
	}

	render() {
		const { count, size, page = 1, range = 9, disabled } = this.props;
		const totalPages = Math.ceil(count / size);

		const lRange = Math.floor((range - 1) / 2);
		const rRange = range - 1 - lRange;
		let minPage = page - lRange;
		let maxPage = page + rRange;

		if (minPage < 1) {
			maxPage += -minPage + 1;
			minPage = 1;
		}
		if (maxPage > totalPages) {
			minPage -= maxPage - totalPages;
			maxPage = totalPages;
		}
		if (minPage < 1) minPage = 1;

		const navItems = [];
		for (let i = minPage; i <= maxPage; i += 1) {
			navItems.push(
				<li className={classNames({ active: page === i, disabled })} key={i}>
					<A href="javascript:;" data-page={i} onClick={this.gotoPage}>{i}</A>
				</li>,
			);
		}

		return (
			<ul className="pagination pull-right">
				<li className={classNames({ disabled: page <= 1 || disabled })}>
					<a href="javascript:;" onClick={this.goFirstPage}>&laquo;</a>
				</li>
				<li className={classNames({ disabled: page <= 1 || disabled })}>
					<a href="javascript:;" onClick={this.goPrevPage}>&lsaquo;</a>
				</li>
				{ navItems }
				<li className={classNames({ disabled: page >= totalPages || disabled })}>
					<a href="javascript:;" onClick={this.goNextPage}>&rsaquo;</a>
				</li>
				<li className={classNames({ disabled: page >= totalPages || disabled })}>
					<a href="javascript:;" onClick={this.goLastPage}>&raquo;</a>
				</li>
			</ul>
		);
	}
}

Pagination.propTypes = {
	gotoPage: PropTypes.func,
	count: PropTypes.number.isRequired,
	size: PropTypes.number,
	page: PropTypes.number,
	range: PropTypes.number,
	disabled: PropTypes.bool,
};

export default Pagination;
