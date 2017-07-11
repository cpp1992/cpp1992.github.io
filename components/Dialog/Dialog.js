import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import classNames from 'classnames';

class Dialog extends React.Component {
	constructor() {
		super();
		this.forceClose = false;
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.onConfirm = this.onConfirm.bind(this);
		this.state = {};
	}

	componentDidMount() {
		this.client = true;

		$(this.dialog).on('show.bs.modal', () => {
			const { onShow } = this.props;
			if (onShow) onShow(this);
		});

		$(this.dialog).on('shown.bs.modal', () => {
			const { onShown } = this.props;
			if (onShown) onShown(this);
		});

		$(this.dialog).on('hide.bs.modal', () => {
			if (this.forceClose) return true;

			let result;
			const { onHide } = this.props;
			if (onHide) {
				result = onHide(this, this.value);
			}
			this.value = undefined;
			if (result && result.then) {
				this.setState({ lock: true });
				result.then((promiseResult) => {
					if (promiseResult !== false) {
						this.hide(true);
					} else {
						this.setState({ lock: false });
					}
				});
				return false;
			}
			return result;
		});

		$(this.dialog).on('hidden.bs.modal', () => {
			const { onHidden } = this.props;
			if (onHidden) onHidden(this);
		});
	}

	componentWillUnmount() {
		if (this.client) {
			$(this.dialog).off('show.bs.modal');
			$(this.dialog).off('shown.bs.modal');
			$(this.dialog).off('hide.bs.modal');
			$(this.dialog).off('hidden.bs.modal');
		}
	}

	onConfirm() {
		this.value = true;
		this.hide();
	}

	show() {
		$(this.dialog).modal();
	}

	hide(force) {
		this.forceClose = force;
		$(this.dialog).modal('hide');
	}

	render() {
		const { title, content, footer, size, confirm } = this.props;
		const { lock } = this.state;

		const $content = typeof content === 'function' ? content() : content;

		const $footer = footer || (
			<div className="modal-footer">
				<button type="button" className="btn btn-default" data-dismiss="modal" disabled={lock}>Close</button>
				{
					confirm &&
					<button type="button" className="btn btn-primary" disabled={lock} onClick={this.onConfirm}>Confirm</button>
				}
			</div>
		);

		return (
			<div className="modal fade" tabIndex="-1" role="dialog" ref={(dialog) => { this.dialog = dialog; }}>
				<div
					className={classNames('modal-dialog', {
						'modal-lg': size === 'large',
						'modal-sm': size === 'small',
					})}
					role="document"
				>
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title" id="myModalLabel">{title}</h4>
						</div>
						<div className="modal-body">
							{$content}
						</div>
						{$footer}
					</div>
				</div>
			</div>
		);
	}
}

Dialog.propTypes = {
	title: PropTypes.node,
	content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	footer: PropTypes.node,
	size: PropTypes.string,
	confirm: PropTypes.bool,

	onShow: PropTypes.func,
	onShown: PropTypes.func,
	onHide: PropTypes.func,
	onHidden: PropTypes.func,
};

export default Dialog;
