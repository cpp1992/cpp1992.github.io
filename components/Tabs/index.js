import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import A from '../A';
import Footer from '../Box/Footer';

class Tabs extends React.Component {
	constructor() {
		super();

		this.state = {
			current: 0,
		};
	}

	onTabClick = (event, props) => {
		const { onTabChange } = this.props;
		const current = props['data-index'];
		if (this.state.current !== current) {
			this.setState({ current }, () => {
				if (onTabChange) onTabChange(this.getList()[current]);
			});
		}
	};

	getList = () => {
		const { children, list } = this.props;
		if (list) return list;

		const tabList = children ? React.Children.map(children, (cell) => {
			if (typeof cell !== 'object' || cell === null) return null;

			const { content, children: cellChildren, ...props } = cell.props || {};
			return {
				content: content || cellChildren,
				...props,
			};
		}) : [];

		return tabList.filter(tab => tab);
	};

	getCurrentTab() {
		const { current } = this.state;
		const list = this.getList();
		return list[current];
	}

	setCurrentTab(index) {
		this.setState({ current: index });
	}

	render() {
		const {
			className, isPill, isBox, hasContent,
			toolBar, footer, loading, onlyOne,
		} = this.props;
		const { current } = this.state;
		const list = this.getList();
		let $content;

		if (hasContent !== false) {
			$content = (
				<div className="tab-content">
					{list.map((tab, index) => {
						const { content, className: tabClass } = tab;
						if (content && (!onlyOne || current === index)) {
							return (
								<div className={classNames('tab-pane', { active: current === index }, tabClass)} key={index}>
									{content}
								</div>
							);
						}
						return null;
					})}
				</div>
			);
		}

		let $footer;
		if (footer) {
			$footer = (footer.type || {})._isBoxFooter ? footer : <Footer>{footer}</Footer>;
		}

		const $loading = loading ? (
			<div className="overlay">
				<span className="fa fa-refresh fa-spin" />
			</div>
		) : null;

		return (
			<div className={classNames(className, 'fry-tabs', isBox && 'nav-tabs-custom overlay-wrapper')}>
				<ul className={classNames('nav', isPill ? 'nav-pills' : 'nav-tabs')}>
					{list.map(({ name }, index) => (
						<li className={classNames({ active: current === index })} key={index}>
							<A role="button" onClick={this.onTabClick} data-index={index}>{name}</A>
						</li>
					))}
					{toolBar &&
						<div className="fry-tabs-tools">{toolBar}</div>
					}
				</ul>
				{$content}
				{$footer}

				{$loading}
			</div>
		);
	}
}

Tabs.propTypes = {
	className: PropTypes.string,
	isPill: PropTypes.bool,
	isBox: PropTypes.bool,
	hasContent: PropTypes.bool,
	list: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.node,
	})),
	toolBar: PropTypes.node,
	footer: PropTypes.node,
	loading: PropTypes.bool,
	children: PropTypes.node,
	onlyOne: PropTypes.bool,

	onTabChange: PropTypes.func,
};

export default Tabs;
