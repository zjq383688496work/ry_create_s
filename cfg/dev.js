'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
// let HtmlWebpackPlugin  = require('html-webpack-plugin');

let config = Object.assign({}, baseConfig, {
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
		'webpack/hot/only-dev-server',
		'./src/index'
	],
	cache: true,
	devtool: 'eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			ENV: JSON.stringify('dev'),
		}),
		new BowerWebpackPlugin({
			searchResolveModulesDirectories: false
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// new HtmlWebpackPlugin({
  //           inject: 'body',
  //           template: './src/index.html',
  //           filename: 'index.html'
  //       })
	],
	module: defaultSettings.getDevModules()
});

let target = 'http://java1.rongyi.com'

config.devServer = {
	contentBase: './src/',
	historyApiFallback: true,
	stats: 'errors-only',
	hot: true,
	host: '0.0.0.0',
	disableHostCheck: true,
	port: defaultSettings.port,
	publicPath: defaultSettings.publicPath,
	noInfo: false,
	proxy: {
	}
}

// Add needed loaders to the defaults here
config.module.loaders.push({
	test: /\.jsx?$/,
	loader: 'react-hot!babel-loader',
	include: [].concat(
		config.additionalPaths,
		[ path.join(__dirname, '/../src') ]
	)
});

module.exports = config;
