import React from 'react';
import PropTypes from 'prop-types';
import * as components from '../components';

const list = [];

// ==================================================================
// =                             Button                             =
// ==================================================================
list.push({
	name: 'Button',
	class: components.Button,
	preview: [
		{
			children: 'Button',
		},
		{
			type: 'danger',
			disabled: true,
			children: 'Button',
		},
	],
	props: {
		type: '[string] Set display type: primary, info, warning, danger',
		size: '[string] Set display size: lg, sm, xs',
	},
	description: 'Same as `<button>`. But will pass props with `onClick` (event, props).',
});

// ==================================================================
// =                          Button Group                          =
// ==================================================================
{
	class Container extends React.Component {
		constructor() {
			super();
			this.state = {
				active: 0,
			};
		}

		onChange = ({ target: { value } }) => {
			this.setState({ active: value });
		};

		render() {
			const { active } = this.state;

			return (
				<div>
					<div className="text-center">
						<components.ButtonGroup active={active} onChange={this.onChange}>
							<components.Button>Btn 1</components.Button>
							<components.Button>Btn 2</components.Button>
						</components.ButtonGroup>
					</div>
				</div>
			);
		}
	}

	list.push({
		name: 'ButtonGroup',
		class: Container,
		preview: {},
		description: `
\`\`\`javascript
<ButtonGroup active={0} onChange={this.onChange}>
	<Button>Btn 1</Button>
	<Button>Btn 2</Button>
</ButtonGroup>
\`\`\`
		`,
		props: {
			active: '[number] Current button group active button index',
			onChange: '[function] Trigger when button click. Use `event.target.value` to get click index',
		},
	});
}

// ==================================================================
// =                                A                               =
// ==================================================================
list.push({
	name: 'A',
	class: components.A,
	preview: {
		children: 'Link',
	},
	description: 'Same as `<a>`. But will pass props with `onClick` (event, props).',
});

// ==================================================================
// =                              Tabs                              =
// ==================================================================
list.push({
	name: 'Tabs',
	class: components.Tabs,
	preview: [
		{
			onTabChange: (tab) => {
				console.log('Tab Change:', tab);
			},
			onlyOne: true,
			children: [
				<components.TabContent key="1" name="Tab1" content="Test Tab1!" />,
				<components.TabContent key="2" name="Tab2">Test Tab2!</components.TabContent>,
			],
		},
		{
			isPill: true,
			list: [
				{
					name: 'Tab1',
				},
				{
					name: 'Tab2',
				},
			],
			hasContent: false,
		},
		{
			isBox: true,
			list: [
				{
					name: 'Tab1',
					content: 'test Tab1',
				},
				{
					name: <strong>Tab2</strong>,
					content: 'test Tab2',
				},
			],
			toolBar: (
				<div>
					<button className="fa fa-cog" />
				</div>
			),
			footer: (
				<p>This is footer!</p>
			),
			loading: true,
		},
	],
	containerStyle: {
		background: '#ecf0f5',
	},
	props: {
		className: '[string] Set tab outer class',
		isPill: '[bool] Set pill style',
		isBox: '[bool] Set box style',
		hasContent: '[bool] Default: true. Set false will hide tab content',
		toolBar: '[node] Set top-right tool bar content',
		loading: '[bool] Display loading icon',
		onlyOne: '[bool] Set true will only keep one tab content in the page at a time',
		list: '[Array] Set tab list',
		'list.name': '[string] tab name',
		'list.content': '[string] tab content',
		'list.className': '[string] Append additional class for tab content',
		'ref->getCurrentTab()': 'Call to get current tab props',
		'ref->setCurrentTab(index)': 'Call to set current tab',
		children: '[TabContent[]] Same as `list` prop. Wrapped with `TabContent` component.',
		onTabChange: '[function] Trigger when focus tab changed',
	},
});

// ==================================================================
// =                              Table                             =
// ==================================================================
{
	const Column = require('../components/SortTable').Column;

	const englishHead = <span className="label label-primary">English</span>;
	const Cell = ({ value }) => (
		<span className="text-danger">{value}</span>
	);

	Cell.propTypes = {
		value: PropTypes.node,
	};

	const sampleList = [];
	for (let i = 0; i < 99; i += 1) {
		sampleList.push({
			name: `Sample_${i}`,
			math: Math.floor(Math.random() * 100),
			english: Math.floor(Math.random() * 100),
			test: {
				t: `${i % 9}`,
			},
		});
	}

	list.push({
		name: 'SortTable',
		class: components.SortTable,
		preview: {
			sort: 'name',
			size: 5,
			range: 5,
			onRowClick: (event, item, index) => {
				console.log('Row click:', event, item, index);
			},
			className: 'table table-bordered',
			children: [
				<Column key={0} field="name" sortPath="name" cell={Cell} />,
				<Column
					key={1} field="math" sortPath="math"
					render={({ value }) => (<span className="text-warning">{value}</span>)}
				/>,
				<Column key={2} field="english" head={englishHead} contentWidth="80" />,
				<Column key={3} field={['test', 't']} sort />,
			],
			list: sampleList,
		},
		props: {
			list: '[array] Set table list',
			size: '[number] Set row count in one page',
			range: '[number] Set max display page count in page navigation',
			onRowClick: '[function] Row click handler. args(event, item)',
			sort: '[string | array | object] Default sort',
			'sort.path': '[string | array] Sort path',
			'sort.asc': '[bool] Sort order ascending',
			children: '[SortTable.Column[]] Set the column data',
			'children.*.field': '[string | array] Set display field',
			'children.*.head': '[*] Set head content',
			'children.*.th': '[bool] Display as <th>',
			'children.*.sort': '[bool] `true` will set column sortable',
			'children.*.sortPath': '[string | array] Set column sort path',
			'children.*.className': '[string] th/td class name',
			'children.*.styleName': '[string] th/td style name (css modules)',
			'children.*.cell': '[string | Component] Set cell content',
			'children.*.render': '[function] Render function',
			'children.*.width': '[string | number] Set column width',
			'children.*.contentWidth': '[string | number] Set column content width. It will prevent table auto collapse',
			'children.*.default': '[*] Set default content. Only when `cell` & `render` does not set',
		},
	});
}

// ==================================================================
// =                           Pagination                           =
// ==================================================================
list.push({
	name: 'Pagination',
	class: components.Pagination,
	preview: {
		count: 233,
		size: 5,
		range: 5,
		disabled: true,
	},
	props: {
		gotoPage: '[function] Handle page switch. args: (page)',
		count: '[number] Total item count',
		size: '[number] Set row count in one page',
		range: '[number] Set max display page count in page navigation',
		page: '[number] Current page number',
		disabled: '[bool] Disable interactive',
	},
});

// ==================================================================
// =                             Tooltip                            =
// ==================================================================
list.push({
	name: 'Tooltip',
	class: components.Tooltip,
	preview: [
		{
			title: 'Top Tooltip!',
			// container: 'body',
			children: <span id="tooltipSam">Hover Me!</span>,
		},
		{
			inline: false,
			title: 'Right Tooltip!',
			placement: 'right',
			children: <input type="text" className="form-control" readOnly value="Some Text" />,
		},
		{
			title: 'Bottom Tooltip!',
			placement: 'bottom',
			children: <span id="tooltipSam">Bottom</span>,
		},
		{
			title: 'Left Tooltip!',
			placement: 'left',
			children: <span id="tooltipSam">Left</span>,
		},
	],
	props: {
		title: '[string] Tooltip content',
		placement: '[string] Set tooltip display position: top | bottom | left | right | auto',
		inline: '[bool] Set `false` will display tooltip container as block element',
		children: '[element] (Only one) Set tooltip element',
	},
	description: 'Pure react tooltip component. Wrap element for display tooltip.' +
	' (Pure css render)',
});

// ==================================================================
// =                              Tree                              =
// ==================================================================
{
	const Item = ({ title, children }) => (
		<div>
			<p>{title}</p>
			<div style={{ marginLeft: 10 }}>{children}</div>
		</div>
	);

	Item.propTypes = {
		title: PropTypes.string,
		children: PropTypes.node,
	};

	const TreeItem = components.withTree(Item, props => props.list);

	list.push({
		name: 'Tree',
		class: TreeItem,
		preview: {
			title: 'Root',
			list: [
				{
					title: 'Lv2-1',
				},
				{
					title: 'Lv2-2',
					list: [
						{
							title: 'Lv3-2',
							list: [
								{
									title: 'Lv4-1',
								},
								{
									title: 'Lv4-2',
								},
							],
						},
						{
							title: 'Lv3-3',
						},
					],
				},
			],
		},
		props: {
			withTree: '(Component, getList)',
			Component: '[Component] Set tree item component. Render should contain { children } for sub item display.',
			getList: '[function] Provide tree to get sub-list. It will pass current component props as argument.',
		},
		description: 'Link `Component` with tree structure. By call `withTree` function.',
	});
}

// ==================================================================
// =                            CheckBox                            =
// ==================================================================
{
	const previewProps = {
		checked: true,
		onClick: () => {
			previewProps.checked = !previewProps.checked;
		},
	};

	list.push({
		name: 'Checkbox',
		class: components.Checkbox,
		preview: previewProps,
		props: {
			checked: '[bool] Set check status.',
		},
		description: 'Same as `<input type="checkbox">`. But will pass props with `onClick` (event, props).',
	});
}

// ==================================================================
// =                           SearchInput                           =
// ==================================================================
{
	class Container extends React.Component {
		constructor() {
			super();
			this.state = {
				value: 'Some key',
			};
		}

		onChange = (event) => {
			this.setState({ value: event.target.value });
		};

		render() {
			return (
				<div>
					<components.SearchInput value={this.state.value} onChange={this.onChange} delay="500" />
					<p>Search: {this.state.value}</p>
				</div>
			);
		}
	}

	list.push({
		name: 'SearchInput',
		class: Container,
		preview: {},
		description: 'Wrap `<input type="text">` with search icon. Props is same as `input`.',
		props: {
			delay: '[number | string] Number format. Set will trigger `onChange` only when the user stop type after delay duration.',
		},
	});
}

// ==================================================================
// =                              Box                               =
// ==================================================================
list.push({
	name: 'Box',
	class: components.Box,
	preview: [{
		title: 'Box',
		children: 'Box Content...',
		footer: 'Box Footer',
		type: 'success',
		toolBar: (
			<div className="form-group">
				<button className="fa fa-times" />
			</div>
		),
	}, {
		children: 'Box without title',
	}],
	containerStyle: {
		background: '#ecf0f5',
	},
	props: {
		type: '[string] Set box type: primary | success | danger | warning | default',
		title: '[node] Set title',
		children: '[node] Set box content',
		footer: '[node | Box.Footer] Set box footer content',
		loading: '[bool] Display loading tip',
		toolBar: '[node] Set top-right tool bar content',
	},
});

// ==================================================================
// =                             Dialog                             =
// ==================================================================
{
	const Dialog = components.Dialog;
	class DialogContainer extends React.Component {
		showDialog = () => {
			this.dialog.show({
				title: 'title',
				content: <h2>Hi, Content!</h2>,
				size: 'large',
				confirm: true,
				onHide: (dialog, result) => {
					if (result) {
						this.dialog.show({
							content: () => 'Will close 1 second delay.',
							onHide: () => {
								const promise = new Promise((resolve) => {
									setTimeout(resolve, 1000);
								});
								return promise;
							},
							onHidden: (dlg) => {
								console.log('Hidden:', dlg);
							},
						});
						return false;
					}
					return true;
				},
			});
		};

		showDialog2 = () => {
			this.dialog2.show({
				title: 'Normal Size',
				content: 'Will popup another dialog when this dialog close',
				onHide: () => (
					new Promise((resolve) => {
						setTimeout(resolve, 200);
					}).then(() => {
						this.dialog2.show({
							title: 'Yo!',
						});
					})
				),
			});
		};

		render() {
			return (
				<div>
					<p><a href="javascript:;" onClick={this.showDialog}>Show Dialog</a></p>
					<p><a href="javascript:;" onClick={this.showDialog2}>Show Dialog2</a></p>
					<Dialog
						ref={(dialog) => {
							this.dialog = dialog;
						}}
					/>

					<Dialog
						ref={(dialog) => {
							this.dialog2 = dialog;
						}}
					/>
				</div>
			);
		}
	}

	list.push({
		name: 'Dialog',
		class: DialogContainer,
		preview: {},
		props: {
			title: '[node] Dialog title',
			content: '[node] Dialog content',
			footer: '[node] Dialog content',
			size: '[string] Set dialog size: `small`, `middle`(default), `large`',
			confirm: '[confirm] Display with confirm button',

			onShow: '[func] This event fires immediately when the show instance method is called',
			onShown: '[func] This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete)',
			onHide: '[func] Check the hide event. Return false will prevent dialog close. Return `Promise` will wait for promise finished',
			onHidden: '[func] Trigger after dialog close',

			show: '[func] Dialog instance function. Display dialog.',
			hide: '[func] Dialog instance function. Close dialog. Pass argument `true` will force close without trigger `onHide` event',
		},
		description: 'Dialog container. Use `ref` of this component call `show` to create dialog.',
	});
}

// ==================================================================
// =                            Loading                             =
// ==================================================================
list.push({
	name: 'LoadingBar',
	class: components.LoadingBar,
	preview: {
		type: 'success',
	},
	props: {
		type: '[string] Set box type: primary (default) | success | danger | warning',
		hide: '[bool] true will hide the loading bar',
	},
});

list.push({
	name: 'LoadingIcon',
	class: components.LoadingIcon,
	preview: {
		icon: 'cog',
	},
	props: {
		icon: '[string] Set the loading icon by FontAwesome. Default: refresh',
		hide: '[bool] true will hide the loading icon',
	},
});

// ==================================================================
// =                            TypeAhead                           =
// ==================================================================
{
	const queryList = [
		{ item: 'ABC(123)', value: '123' },
		{ item: 'DEF(456)', value: '456' },
		{ item: 'GHI(789)', value: '789' },
	];
	const TypeAhead = components.withTypeAhead(props => (
		<input type="text" {...props} />
	), query => (
		new Promise((resolve) => {
			const qry = (query || '').toUpperCase().trim();
			if (!qry) resolve([]);
			setTimeout(() => {
				resolve(queryList.filter(obj => obj.item.toUpperCase().indexOf(qry) >= 0));
			}, 500);
		})
	));

	class Container extends React.Component {
		static onSelectValue(value) {
			console.log('Select value:', value);
		}

		constructor() {
			super();
			this.state = {
				value: '',
			};
			this.onChange = this.onChange.bind(this);
		}

		onChange(event) {
			this.setState({ value: event.target.value });
		}

		render() {
			const { value } = this.state;

			return (
				<div className="input-group">
					<TypeAhead
						className="form-control" placeholder="User NT login..." value={value}
						onChange={this.onChange} onSelectValue={Container.onSelectValue}
					/>
					<span className="input-group-btn">
						<button className="btn btn-default">Add</button>
					</span>
				</div>
			);
		}
	}

	list.push({
		name: 'TypeAhead',
		class: Container,
		preview: {},
		props: {
			withTypeAhead: '(Component, queryFunc)',
			'- Component': '[Component] Set need type ahead component.',
			'- queryFunc': '[function | array] Accept the `value` of Component. Return `Promise` or array list. Or you can pass as `props`',
			'queryFunc[result]': '[String | Object] accept display content. Format: { value[string], description[string]: display in list, item[node]: display component in list }',
			onSelectValue: '[function] When select value, will call this function. With argument: `value`',
		},
		description: 'Link `Component` with type ahead. By call `withTypeAhead` function.',
	});
}

// ==================================================================
// =                         TypeAheadInput                         =
// ==================================================================
{
	const queryList = [
		'12345',
		'67890',
		'abcde',
		'fghij',
		'klmno',
		'pqrst',
		{ description: 'uvw(xyz)', value: '233' },
	];

	class Container extends React.Component {
		constructor() {
			super();
			this.state = {
				value: '',
			};
		}

		onChange = (event) => {
			this.setState({ value: event.target.value });
		};

		render() {
			const { value } = this.state;

			return (
				<components.TypeAheadInput
					value={value} queryFunc={queryList} onChange={this.onChange}
				/>
			);
		}
	}

	list.push({
		name: 'TypeAheadInput',
		class: Container,
		preview: {},
		props: {
			queryFunc: '[function | array] Accept the `value` of Component. Return `Promise` or array list. Or you can pass as `props`',
			'queryFunc[result]': '[String | Object] accept display content. Format: { value[string], description[string]: display in list, item[node]: display component in list }',
			onSelectValue: '[function] When select value, will call this function. With argument: `value`',
		},
		description: `Text input with type ahead:
\`\`\` javascript
<TypeAheadInput value={value} queryFunc={queryList} onChange={this.onChange} />
\`\`\`
`,
	});
}

// ==================================================================
// =                       TypeAheadInputGroup                      =
// ==================================================================
{
	const queryList = [
		'12345',
		'67890',
		'abcde',
		'fghij',
		'klmno',
		'pqrst',
		{ description: 'uvw(xyz)', value: '233' },
	];

	class Container extends React.Component {
		constructor() {
			super();
			this.state = {
				value: '',
				selectedValue: '',
			};
		}

		onChange = (event) => {
			console.log('=>', event);
			this.setState({ value: event.target.value });
		};

		render() {
			const { value, selectedValue } = this.state;

			return (
				<div>
					<p>Select Value: {selectedValue}</p>
					<components.TypeAheadInputGroup
						value={value} queryFunc={queryList} onChange={this.onChange}
						onSelectValue={(val) => {
							this.setState({ selectedValue: val });
						}}
					/>
				</div>
			);
		}
	}

	list.push({
		name: 'TypeAheadInputGroup',
		class: Container,
		preview: {},
		props: {
			type: '[string] Set button type: primary, warning, danger, info, default',
			text: '[string] Set button text.',
		},
		description: 'Like `TypeAheadInput` but provide additional confirm button. See follow other props',
	});
}

// ==================================================================
// =                            StateForm                           =
// ==================================================================
{
	const groupValueList = [
		'group value1',
		{ description: 'group value2: { description, value }', value: 'group check2' },
	];
	class FormContainer extends React.Component {
		constructor() {
			super();
			this.state = {
				form: {
					name: '',
					pass: '',
					singleCheck: false,
					groupCheck: [],
					radio: '',
					customize2: ['with init value'],
					select: '',
					textarea: '',
					search: '',

					itemList: [],
				},
				lock: false,
				inline: false,
			};
		}

		onChange = (event) => {
			console.log('Form Change:', event.target.value);
		};

		triggerLock = () => {
			this.setState(preState => ({ lock: !preState.lock }));
		};

		triggerInline = () => {
			this.setState(preState => ({ inline: !preState.inline }));
		};

		render() {
			const { lock, inline, form: { pass } } = this.state;

			return (
				<div>
					<components.StateForm
						instance={this} path="form" onChange={this.onChange}
						disabled={lock}
					>
						<div className="row">
							<div className="col-md-6">
								<components.StateFormField name="name" description="Type your name here..." />
							</div>
							<div className="col-md-6">
								<components.StateFormField name="pass" type="password" displayName="Password" />
							</div>
						</div>
						<components.StateFormField name={['number', 'only']} type="text" filter={value => value.replace(/[^0-9]*/g, '')} />
						<components.StateFormField name="singleCheck" type="bool" />
						<components.StateFormField name="groupCheck" type="bool" inline={inline} values={groupValueList} />
						<components.StateFormField name="radio" type="radio" inline={inline} values={groupValueList} />
						<components.StateFormField name="customize2" component={components.InlineList} displayName="" />
						<components.StateFormField name="select" type="select" values={groupValueList} />
						<components.StateFormField name="textarea" rows="3" />
						<components.StateFormField name="itemList" isList />
						<components.StateFormField name="search" delay="300" component={components.SearchInput} />
					</components.StateForm>
					<div>
						<components.Button onClick={this.triggerLock}>Lock or not</components.Button>{' '}
						<components.Button onClick={this.triggerInline}>Inline or not</components.Button>{' '}
						<components.Button
							onClick={() => {
								this.setState({
									form: {
										name: 'my name',
										customize2: ['111', '222', '333'],
									},
								});
							}}
						>
							Set Form Value
						</components.Button>{' '}
						{pass || '-'}
					</div>
				</div>
			);
		}
	}

	list.push({
		name: 'StateForm',
		class: FormContainer,
		preview: {},
		props: {
			instance: '[object] Set component instance. Normally: this',
			path: '[string|array] path of instance state',
			onChange: '[function] Form change function. Will trigger after `setState` finished.',
			disabled: '[bool] True will pass disabled props to all the `Field`',
			forceRefresh: '[bool] Force form refresh whatever parent element exist or not.',
			className: '[string] Set container class',
			children: '[Form.Field[]] Set the field data',
			'children.*.name': '[string|array] Bind key name / path',
			'children.*.displayName': '[string] Field display name. None will follow the `name`. Set to "" will hide label.',
			'children.*.description': '[string] Description. Some component like `Text Input` will display in placeholder',
			'children.*.type': '[string] Field type: (default)text, textarea | blob, password, bool | checkbox, radio, select',
			'children.*.isList': '[bool] true will make value as array. If you want to make checkbox as array, fill `values` instead',
			'children.*.passStateProps': '[bool] true will pass `StateFormField` props as `stateProps`. Only work with `Component`',
			'children.*.inline': '[bool] Let element display inline. Only support `checkbox` & `radio`',
			'children.*.component': '[Component] Set customize component. Will ignore `type` prop',
			'children.*.values': '[array] Provide the value list. Support string or object({ description, value }). Used for: radio, checkbox, select',
			'children.*.rows': '[number|string] When set rows, will display as textarea',
			'children.*.filter': '[function] Value update filter. Will not modify value with `onChange` event',
		},
		description: `An easy way for two-way binding. This form will help for data bind with \`state\`.
For example, bind the data in the \`this.state.form\`:
\`\`\`javascript
<StateForm instance={this} path="form">
	<div className="row">
		<div className="col-md-6">
			<StateFormField name="name" description="Type your name here..." />
		</div>
		<div className="col-md-6">
			<StateFormField name="pass" type="password" displayName="Password" />
		</div>
	</div>
</StateForm>
\`\`\`
`,
	});
}

// ==================================================================
// =                              Form                              =
// ==================================================================
{
	const sampleValues = ['type1', 'type2', {
		value: 'type3',
		description: 'Object value: [value, description]',
	}];

	const CustomComponent = ({ value, onChange }) => {
		const desc = value ? 'Yes' : 'No';
		return (
			<components.Button
				className="btn btn-success btn-sm" style={{ display: 'block' }}
				onClick={() => {
					if (onChange) {
						onChange({
							target: {
								value: !value,
							},
						});
					}
				}}
			>{desc}</components.Button>
		);
	};
	CustomComponent.propTypes = {
		value: PropTypes.bool,
		onChange: PropTypes.func,
	};

	class FormContainer extends React.Component {
		constructor() {
			super();
			this.state = {
				disabled: false,
				form: {
					username: 'default Value',
					customize2: ['with init value'],
				},
			};
		}

		render() {
			const { disabled, form: { password } } = this.state;

			return (
				<div>
					<components.Form instance={this.state.form} disabled={disabled}>
						<h1>Demo of Form</h1>
						<div className="row">
							<div className="col-sm-6">
								<components.Field name="username" />
							</div>
							<div className="col-sm-6">
								<components.Field name="password" type="password" />
							</div>
						</div>
						<components.Field
							name={['deep', 'test']} displayName="Number only"
							filter={value => value.replace(/[^0-9]*/g, '')}
						/>
						<components.Field name="remember" displayName="Remember Me" type="bool" />
						<components.Field name="radioType" type="radio" values={sampleValues} inline />
						<components.Field name="checkType" type="checkbox" values={sampleValues} />
						<components.Field name="select" values={sampleValues} />
						<components.Field name="textarea" rows="3" />
						<components.Field name="customize1" component={CustomComponent} />
						<components.Field name="customize2" component={components.InlineList} displayName="" />
						<components.Button className="hide">Test</components.Button>
						<hr />
					</components.Form>
					<components.Button
						onClick={() => {
							console.log(this.state.form);
						}}
					>
						Print Form in console
					</components.Button>
					{' '}
					<components.Button
						onClick={() => {
							this.setState({
								form: {
									username: 'my name',
									customize2: ['111', '222', '333'],
								},
							});
						}}
					>
						Set Form Value
					</components.Button>
					{' '}
					<components.Button
						onClick={() => {
							this.setState({ disabled: !this.state.disabled });
						}}
					>
						Lock/Unlock
					</components.Button>
					<span>Password: {password || '-'}</span>
				</div>
			);
		}
	}

	list.push({
		name: 'Form',
		deprecated: true,
		class: FormContainer,
		preview: {},
		props: {
			instance: '[object] Set form auto fill data object. When input update, the `instance` will be auto updated.',
			onChange: '[function | false] Form change function. `false` will prevent form auto update.',
			disabled: '[bool] True will pass disabled props to all the `Field`',
			forceRefresh: '[bool] Force form refresh whatever parent element exist or not.',
			children: '[Form.Field[]] Set the field data',
			'children.*.name': '[string|array] Bind key name / path',
			'children.*.displayName': '[string] Field display name. None will follow the `name`. Set to "" will hide label.',
			'children.*.description': '[string] Description. Some component like `Text Input` will display in placeholder',
			'children.*.type': '[string] Field type: (default)text, textarea, password, bool | checkbox, radio, select',
			'children.*.inline': '[bool] Let element display inline. Only support `checkbox` & `radio`',
			'children.*.component': '[Component] Set customize component. Will ignore `type` prop',
			'children.*.values': '[array] Provide the value list. Support string or object({ description, value }). Used for: radio, checkbox, select',
			'children.*.rows': '[number|string] When set rows, will display as textarea',
			'children.*.filter': '[function] Value update filter. Will not modify value with `onChange` event',
		},
		description: `Deprecated! Use \`StateForm\` instead.  
Form group. This component help inner form state management. Support nest structure like:
\`\`\` javascript
<Form instance={this.state.form}>
	<div className="row">
		<div className="col-sm-6">
			<Field name="username" />
		</div>
		<div className="col-sm-6">
			<Field name="password" type="password" />
		</div>
	</div>
</Form>
\`\`\`
`,
	});
}

// ==================================================================
// =                           InlineList                           =
// ==================================================================
{
	const defaultValue = [
		'User1',
		'User2',
		{ value: 'User3', description: 'Object value: [value, readOnly, description, type]' },
		{ value: 'Read Only', readOnly: true },
		{ value: 'type: danger', type: 'danger' },
	];

	class InlineListContainer extends React.Component {
		constructor() {
			super();
			this.state = {
				values: defaultValue,
				lock: false,
				readOnly: false,
			};
			this.onChange = this.onChange.bind(this);
			this.reset = this.reset.bind(this);
			this.triggerLock = this.triggerLock.bind(this);
			this.clearAll = this.clearAll.bind(this);
		}

		onChange(event) {
			this.setState({ values: event.target.value });
		}

		reset() {
			this.setState({
				values: defaultValue,
			});
		}

		clearAll() {
			this.setState({
				values: [],
			});
		}

		triggerLock() {
			this.setState({
				lock: !this.state.lock,
			});
			console.log('trigger', this.state);
		}

		triggerReadOnly = () => {
			this.setState({
				readOnly: !this.state.readOnly,
			});
			console.log('trigger', this.state);
		};

		render() {
			const { values, lock, readOnly } = this.state;

			return (
				<div>
					<components.InlineList
						value={values} onChange={this.onChange}
						disabled={lock} readOnly={readOnly}
					/>
					<a href="javascript:;" onClick={this.triggerLock}>Lock or not</a>
					{' | '}
					<a href="javascript:;" onClick={this.triggerReadOnly}>ReadOnly or not</a>
					{' | '}
					<a href="javascript:;" onClick={this.reset}>Reset Value</a>
					{' | '}
					<a href="javascript:;" onClick={this.clearAll}>Clear All</a>
				</div>
			);
		}
	}

	list.push({
		name: 'InlineList',
		class: InlineListContainer,
		preview: {},
		props: {
			className: '[string] Set container class',
			onChange: '[func] Return change event object',
			onRemoveItem: '[func] Return removed item when remove triggered',
			onItemClick: '[func] Return click item',
			type: '[string] Set display type: primary, info, warning, danger',
			icon: '[string] Set button icon with `font awesome` class. Default: times',
			disabled: '[bool] True will prevent interactive',
			readOnly: '[bool] True will hide operation icon',
			value: '[(string|object)[]] Item value list',
			'value.*.value': '[string] value of item',
			'value.*.description': '[string] Display of item',
			'value.*.readOnly': '[bool] True will prevent interactive',
			'value.*.type': '[string] Set display type: primary, info, warning, danger',
		},
		description: 'Inline item list. Can used in `Form` as `Field` Component',
	});
}

// ==================================================================
// =                            Collapse                            =
// ==================================================================
list.push({
	name: 'Collapse',
	class: components.Collapse,
	preview: {
		title: <a>click me!</a>,
		children: <pre>This is children content</pre>,
		collapseContent: 'this is collapseContent',
	},
	props: {
		className: '[string] Set container class',
		passState: '[bool] true will pass collapse state to `title`',
		collapse: '[bool] Set default collapse state',
		title: '[node] Set title. Support element title',
		children: '[node] Set collapse content',
		collapseContent: '[node] Set collapse content when is collapsed',
	},
	description: 'Inline item list. Can used in `Form` as `Field` Component',
});

// ==================================================================
// =                             Switch                             =
// ==================================================================
list.push({
	name: 'Switch',
	class: components.Condition,
	preview: [
		{
			is: true,
			children: <span>Is!</span>,
		},
		{
			children: [
				<components.If value={false}><span>If</span></components.If>,
				<components.ElseIf value={null}><span>Else If</span></components.ElseIf>,
				<components.Else><span>Else</span></components.Else>,
			],
		},
		{
			value: 'case3',
			children: [
				<components.Case value="case1"><span>case 1</span></components.Case>,
				<components.Case value="case2"><span>case 2</span></components.Case>,
				<components.Default><span>case default</span></components.Default>,
			],
		},
	],
	description: `Shortcut for component render wrapper. e.g.
\`\`\`javasctipt
<Condition is={TrueOrFalse}>
	// Only support Element or Component. String, number, bool is not allowed
</Condition>
or
<Condition>
	<If value={TrueOrFalse}>{Element / Component}</If>
	<ElseIf value={TrueOrFalse}>{Element / Component}</ElseIf>
	<Else>{Element / Component}</ElseIf>
</Condition>
or
<Condition value="case1">
	<Case value="case1">{Element / Component}</Case>
	<Case value="case2">{Element / Component}</Case>
	<Default>{Element / Component}</Default>
</Condition>
\`\`\`
`,
});

// ==================================================================
// =                              Menu                              =
// ==================================================================
{
	const menu = [
		{ title: 'title 1', onClick: () => { console.log('Click!!!'); } },
		{ split: true },
		{ title: 'disabled', disabled: true, icon: 'user' },
		{
			title: '{ title: string, disabled: bool, icon: string, onClick: function }',
		},
	];

	class MenuContainer extends React.Component {
		showMenu = (event) => {
			const { clientX, clientY } = event;
			setTimeout(() => {
				this.menu.showMenu([{ title: 'test' }], clientX, clientY);
			}, 1000);
		};

		render() {
			return (
				<ul className="list-unstyled">
					<li>
						<components.Menu menu={menu} ref={(ele) => { this.menu = ele; }}>
							<input type="text" className="form-control" value="Right Click Me To Show the Menu" readOnly />
						</components.Menu>
					</li>
					<li>
						<a role="button" onClick={this.showMenu}>Click to show menu after 1 second</a>
					</li>
				</ul>
			);
		}
	}

	list.push({
		name: 'Menu',
		class: MenuContainer,
		preview: {},
		description: `Support customize menu. e.g.
\`\`\`javascript
<Menu menu={[{ title: 'title', disabled: true }]}>
	<a>Wrap with Menu</a>
</Menu>
\`\`\`
`,
		props: {
			className: '[string] Set container class',
			menu: '[array] Set popup menu list',
			'ref->showMenu(list, x, y)': 'Call show menu in script',
			'menu.*.title': '[string] Set menu item title',
			'menu.*.disabled': '[bool] true will disable current menu item',
			'menu.*.split': '[bool] Create a split line',
			'menu.*.icon': '[string] Set menu item icon',
			'menu.*.onClick': '[func] Callback when user click the menu item',
		},
	});
}

// ==================================================================
// =                              Chart                             =
// ==================================================================
{
	function genSeries(id = 1, len = 10) {
		let now = Date.now();
		const series = {
			name: `Demo ${id}`,
			data: [],
		};
		for (let i = 0; i < len; i += 1) {
			series.data.push([
				now, Math.random(),
			]);
			now += 1000 * 60 * 60;
		}
		return series;
	}

	class ChartHolder extends React.Component {
		constructor() {
			super();
			this.state = {
				config: {
					series: [genSeries()],
				},
			};
		}

		onNewPoint = () => {
			const { config } = this.state;
			const firstSeries = config.series[0];
			const newConfig = {
				series: [
					{
						...firstSeries,
						data: firstSeries.data.concat([
							[firstSeries.data[firstSeries.data.length - 1][0] + (1000 * 60 * 60), Math.random()],
						]),
					},
				],
			};

			this.setState({ config: newConfig });
		};

		onNewSeries = () => {
			const { config } = this.state;
			const newConfig = {
				series: [
					...config.series,
					genSeries(config.series.length + 1, config.series[0].data.length),
				],
			};

			newConfig.series = newConfig.series.map((series) => {
				const newSeries = { ...series };
				delete newSeries._colorIndex;
				delete newSeries._symbolIndex;
				return newSeries;
			});

			this.setState({ config: newConfig });
		};

		render() {
			return (
				<div>
					<components.Chart config={this.state.config} height="255" timestamp percentage="decimal" />
					<components.Button onClick={this.onNewPoint}>New Point</components.Button>
					<components.Button onClick={this.onNewSeries}>New Series</components.Button>
				</div>
			);
		}
	}

	list.push({
		name: 'Chart',
		class: ChartHolder,
		preview: {},
		description: `HighCharts basic Wrapper. e.g:
\`\`\`javascript
<Chart config={config} />
\`\`\`

* Chart component will auto refresh when \`config\` updated. So please do not dynamic generate config in \`render\` function.`,
		props: {
			className: '[string] Set container class',
			config: '[object] Highcharts configuration',
			timestamp: '[bool] true will display as timeline based',
			percentage: '[bool | string] true will display value with `%`. When set to `decimal`, value will be auto multiple 100 by calculation',
			// preUpdateConfig: '[func] Process the template config before config is merged',
			postUpdateConfig: '[func] Process the merged config',
			height: '[string | number] Set chart height',
			width: '[string | number] Set chart width',
			loading: '[bool] Display loading icon',

			onItemClick: '[func] Series item click',
		},
	});
}

// ==================================================================
// =                           Line Chart                           =
// ==================================================================
list.push({
	name: 'LineChart',
	class: components.LineChart,
	preview: {
		config: {
			series: [{
				name: 'line demo',
				data: [5, 2, 3, 9, 3, 6],
			}],
		},
	},
	previewStyle: {
		height: '200px',
	},
	description: 'Wrapping line chart config with `Chart`. Props please refer to the `Chart`.',
});

// ==================================================================
// =                           Bar Chart                            =
// ==================================================================
list.push({
	name: 'BarChart',
	class: components.BarChart,
	preview: {
		config: {
			series: [{
				name: 'bar demo',
				data: [5, 2, 3, 9, 3, 6],
			}],
		},
		onItemClick(event, point) {
			console.log('click:', event, point);
		},
	},
	previewStyle: {
		height: '200px',
	},
	props: {
		stack: '[bool] `true` will make chart as stack view',
	},
	description: 'Wrapping bar chart config with `Chart`. Props please refer to the `Chart`.',
});

// ==================================================================
// =                           Area Chart                           =
// ==================================================================
list.push({
	name: 'AreaChart',
	class: components.AreaChart,
	preview: {
		config: {
			series: [{
				name: 'area 1',
				data: [5, 2, 3, 9, 3, 6],
			}, {
				name: 'area 2',
				data: [1, 1, 2, 8, 9, 3],
			}],
		},
	},
	previewStyle: {
		height: '200px',
	},
	description: 'Wrapping area chart config with `Chart`. Props please refer to the `Chart`.',
});

// ==================================================================
// =                           Pie Chart                            =
// ==================================================================
list.push({
	name: 'PieChart',
	class: components.PieChart,
	preview: {
		config: {
			series: [{
				name: 'Pie',
				data: [{
					name: 'name 1',
					y: 3,
				}, {
					name: 'name 2',
					y: 1,
				}, {
					name: 'name 3',
					y: 5,
				}, {
					name: 'name 4',
					y: 6,
				}, {
					name: 'name 5',
					y: 23,
				}],
			}],
		},
	},
	previewStyle: {
		height: '400px',
	},
	description: 'Wrapping pie chart config with `Chart`. Props please refer to the `Chart`.',
});

export default list;
