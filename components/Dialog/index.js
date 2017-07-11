import React from 'react';
import $ from 'jquery';

import DialogInstance from './Dialog';

class Dialog extends React.Component {
	constructor() {
		super();
		this.state = {
			list: [],
		};

		this.show = this.show.bind(this);
		this.onHidden = this.onHidden.bind(this);
	}

	onHidden(dialog) {
		const { index } = dialog.props;
		const { list } = this.state;

		list.splice(index, 1);
		this.setState({ list });

		this.updateBodyState();

		if (dialog.props.dlgOnHidden) {
			dialog.props.dlgOnHidden(dialog);
		}
	}

	updateBodyState = () => {
		const $body = $('body');
		const hasModal = $('.modal.fade.in').length > 0;

		if (hasModal) {
			$body.addClass('modal-open');
			$body.css('padding-right', $(window).height() < $body.height() ? '17px' : 0);
		} else {
			$body.css('padding-right', 0);
		}
	};

	show(dialog) {
		const { list } = this.state;
		const entity = {
			id: +new Date(),
			dialog,
		};
		list.push(entity);
		this.setState({ list });

		setTimeout(() => {
			entity.ref.show();

			// Repeat for process the padding style of bootstrap modal
			const $dlg = $(entity.ref.dialog);
			setTimeout(() => {
				this.updateBodyState();
				if (list.length > 1) {
					$dlg.css('padding-right', $('body').css('padding-right'));
				}
			}, 150);
			$dlg.one('bsTransitionEnd', () => {
				this.updateBodyState();
				if (list.length > 1) {
					$dlg.css('padding-right', $('body').css('padding-right'));
				}
			});
		}, 1);

		// TODO: Dialog scrollbar logic

		return {
			entity,
			refresh: () => { this.forceUpdate(); },
		};
	}

	render() {
		const { list } = this.state;

		return (
			<div>
				{list.map((item, index) => {
					const entity = item;
					const dlgOnHidden = entity.dialog.onHidden;
					return (<DialogInstance
						key={entity.id}
						index={index}
						ref={(element) => { entity.ref = element; }}
						{...entity.dialog}
						dlgOnHidden={dlgOnHidden}
						onHidden={this.onHidden}
					/>);
				})}
			</div>
		);
	}
}

export {
	Dialog as DialogInstance,
};

export default Dialog;
