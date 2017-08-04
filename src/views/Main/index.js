/**
 * Created by cpp1992 on 2016/10/12.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import Home from '../Home';
import Dev from '../Dev';
import Note from '../Note';
import Me from '../Me';

import styles from './index.scss';

const isProd = process.env.NODE_ENV === 'production';

const Main = () => (
	<div className="wrapper">
		<header className="main-header">
			<Link to="/" className="logo">
				<span className="logo-mini">Fairy</span>
				<span className="logo-lg">Fairy 小仙女❥(^_-)</span>
			</Link>
			<nav className="navbar navbar-static-top">
				<a className="sidebar-toggle" data-toggle="offcanvas" role="button">
					<span className="sr-only">Toggle navigation</span>
				</a>
			</nav>
		</header>
		<aside className="main-sidebar">
			<section className="sidebar">
				<ul className="sidebar-menu">
					<li>
						<Link to="/">
							<i className="fa fa-home" />{' '}
							<span>主页</span>
						</Link>
					</li>
					{!isProd && <li>
						<Link to="/dev">
							<i className="fa fa-shower" />{' '}
							<span>Dev</span>
						</Link>
					</li>}
					<li>
						<Link to="/me">
							<i className="fa fa-user" />{' '}
							<span>关于我</span>
						</Link>
					</li>
					<li>
						<Link to="/note">
							<i className="fa fa-book" />{' '}
							<span>笔记本</span>
						</Link>
					</li>
				</ul>
			</section>
		</aside>
		<div className="content-wrapper">
			<Route exact path="/" component={Home} />
			<Route exact path="/dev" component={Dev} />
			<Route exact path="/note" component={Note} />
			<Route exact path="/me" component={Me} />
		</div>
		<footer className="main-footer clearfix">
			<div className="pull-right hidden-xs">
				Component Library
			</div>
		</footer>
	</div>
);

Main.propTypes = {
	dispatch: PropTypes.func,
};

export default connect()(cssModules(Main, styles));
