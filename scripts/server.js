/**
 * Created by cpp1992 on 2016/10/12.
 */

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { start } from 'easy-stop';

start(__dirname + '/..').then(function () {
	const app = new (express)();
	const config = require('../devServer.webpack.config');
	const compiler = webpack(config);
	app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath.replace(/^\./, "")}));
	app.use(webpackHotMiddleware(compiler));

	app.use('/builds', express.static('builds'));
	app.use('/scripts', express.static('scripts'));

	app.get("/close", function (req, res) {
		res.send('close server...');
		console.log("Close server...");
		setTimeout(function () {
			process.exit();
		}, 100);
	});

	app.get("/", function (req, res) {
		res.sendFile(path.resolve(__dirname + '/../index.html'));
	});

	app.listen(2016, function () {
		console.log('Server listening [port:2016]...');
	});
});
