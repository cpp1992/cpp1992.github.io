import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import list from '../../list';

import { updateFilter } from '../../actions/app';

import styles from './index.scss';

const Remarkable = require('remarkable');

const md = new Remarkable();

function getDescription(text) {
	return md.render(text || '`N/A`');
}

class Home extends React.Component {
	onFilter = (e) => {
		const { dispatch } = this.props;
		const filter = (e.target.value || '').trim();
		dispatch(updateFilter(filter));
	};

	getList = () => {
		const { filter } = this.props;
		const UFilter = filter.toUpperCase();
		return UFilter ? list.filter(({ name }) =>
			(name || '').toUpperCase().indexOf(UFilter) >= 0,
		) : list;
	};

	refresh = (func, ...args) => {
		this.forceUpdate();
		if (func) func(...args);
	};

	render() {
		const { filter } = this.props;
		const componentList = this.getList();

		return (
			<div>
				<section className="content-header">
					<h1>Components(简历请见左侧"关于我")</h1>
				</section>
				<section className="content">
					<div className="box box-primary">
						<div className="box-header with-border">
							<h3 className="box-title">Component</h3>
							<div className="box-tools pull-right">
								<input
									type="text" className="form-control" placeholder="filter..."
									onChange={this.onFilter} value={filter}
								/>
							</div>
						</div>
						<div className="box-body">
							{componentList.map((component, index) => {
								const Component = component.class;
								const {
									name, description, preview,
									containerStyle, previewStyle, props, deprecated,
								} = component;
								const propsList = Array.isArray(preview) ? preview : [preview];
								let $description;
								let $props;

								if (description) {
									$description = (
										<div>
											<h5>Description</h5>
											<div dangerouslySetInnerHTML={{ __html: getDescription(description) }} />
										</div>
									);
								}

								if (props) {
									$props = (
										<div>
											<h5>Properties</h5>
											<ul>
												{Object.keys(props).map(key => (
													<li key={key}>
														<strong className="text-primary">{key}: </strong>
														{props[key]}
													</li>
												))}
											</ul>
										</div>
									);
								}

								return (
									<div styleName="component" key={name || index}>
										<div className="row">
											<div className="col-md-4">
												<h5>Preview</h5>
												<div styleName="preview" style={containerStyle}>
													{propsList.map(({ onClick, onChange, ...itemProps }, itemIndex) => (
														<div styleName="preview-item" className="clearfix" style={previewStyle} key={itemIndex}>
															<Component
																onClick={(...args) => {
																	if (onClick) this.refresh(onClick, ...args);
																}}
																onChange={(...args) => {
																	if (onChange) this.refresh(onChange, ...args);
																}}
																{...itemProps}
															/>
														</div>
													))}
												</div>
											</div>
											<div className="col-md-8">
												<h1>
													<span className="fa fa-cubes" />{name}
													{deprecated && <span className="label label-default">Deprecated</span>}
												</h1>

												{$description}

												{$props}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>
			</div>
		);
	}
}

Home.propTypes = {
	filter: PropTypes.string,
	dispatch: PropTypes.func,
};

const mapState = ({ app: { filter } }) => ({
	filter,
});

export default connect(mapState)(cssModules(Home, styles));
