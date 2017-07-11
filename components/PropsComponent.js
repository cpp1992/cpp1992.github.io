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

const ACTIONS = ['onClick', 'onMouseDown', 'onChange'];

export const withProps = (Component) => {
	class PropsComponent extends React.Component {
		constructor() {
			super();

			ACTIONS.forEach((actionName) => {
				this[actionName] = (proxy, ...args) => {
					const action = this.props[actionName];

					if (action) {
						action(proxy, this.props, ...args);
					}
				};
			});
		}

		render() {
			const { children, ...props } = this.props;
			ACTIONS.forEach((actionName) => {
				props[actionName] = this[actionName];
			});

			return (
				<Component {...props} >
					{children}
				</Component>
			);
		}
	}

	PropsComponent.displayName = Component.displayName || Component.name;

	PropsComponent.propTypes = {
		onClick: PropTypes.func,
		onChange: PropTypes.func,
		children: PropTypes.node,
	};

	return PropsComponent;
};

export default withProps;
