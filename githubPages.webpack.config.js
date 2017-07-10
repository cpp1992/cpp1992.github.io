/**
 * Created by cpp1992 on 2017/01/12.
 */

var config = require('./devServer.webpack.config');
config.output.publicPath = '';

module.exports = config;
