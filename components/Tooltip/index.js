import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import $ from 'jquery';

const ARROW_OFFSET = 8;

class Tooltip extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	onMouseEnter = () => {
		if (!this.$holder || !this.$tooltip) return;

		const { placement } = this.props;
		const { top: holderTop, left: holderLeft } = $(this.$holder).offset();
		const holderRect = this.$holder.getBoundingClientRect();
		const tooltipRect = this.$tooltip.getBoundingClientRect();
		const { width: holderWidth, height: holderHeight } = holderRect;
		const { width: tooltipWidth, height: tooltipHeight } = tooltipRect;

		let offset;
		switch (placement) {
			case 'bottom':
				offset = {
					top: holderTop + holderHeight + ARROW_OFFSET,
					left: (holderLeft + (holderWidth / 2)) - (tooltipWidth / 2),
				};
				break;
			case 'left':
				offset = {
					top: (holderTop + (holderHeight / 2)) - (tooltipHeight / 2),
					left: holderLeft - tooltipWidth - ARROW_OFFSET,
				};
				break;
			case 'right':
				offset = {
					top: (holderTop + (holderHeight / 2)) - (tooltipHeight / 2),
					left: holderLeft + holderWidth + ARROW_OFFSET,
				};
				break;
			default:
				offset = {
					top: holderTop - tooltipHeight - ARROW_OFFSET,
					left: (holderLeft + (holderWidth / 2)) - (tooltipWidth / 2),
				};
		}

		$(this.$tooltip).offset(offset);
		this.setState({ show: true });
	};

	onMouseLeave = () => {
		this.setState({ show: false });
	};

	setHolderRef = (ele) => {
		this.$holder = ele;
	};

	setTooltipRef = (ele) => {
		this.$tooltip = ele;
	};

	render() {
		const { className, inline, title, placement = 'top', children } = this.props;
		const { show } = this.state;

		return (
			<div
				className={classNames('fry-tooltip clearfix', className)} ref={this.setHolderRef}
				style={{ display: inline !== false ? 'inline-block' : 'block' }}
				onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
			>
				{children}

				{title ?
					<div className={classNames('fry-tooltip-container', placement, show && 'fry-tooltip-show')} ref={this.setTooltipRef}>
						<div className="fry-tooltip-arrow" />
						<div className="fry-tooltip-content">
							<div className="fry-tooltip-inner">{title}</div>
						</div>
					</div> : null
				}
			</div>
		);
	}
}

Tooltip.propTypes = {
	className: PropTypes.string,
	inline: PropTypes.bool,
	title: PropTypes.node,
	placement: PropTypes.string,
	children: PropTypes.node,
};

export default Tooltip;
