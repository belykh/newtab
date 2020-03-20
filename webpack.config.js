/* global require module __dirname */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require("vue-loader");
//const CleanWebpackPlugin = require('clean-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
	var PROD = false;

	let plugins = [
		new VueLoaderPlugin(),
		new CopyWebpackPlugin([
			{ from: './src/*.json', to: './', flatten: true },
			{ from: './src/*.html', to: './', flatten: true },
			{ from: './src/img/', to: './img/', flatten: true },
		]),
		new MiniCssExtractPlugin({ filename: '[name].css' }),
	];

	return {
		mode: PROD ? 'production' : 'development',
		entry: {
			index: './src/index.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			library: 'src'
		},
		watchOptions: { aggregateTimeout: 200 },
		devtool: PROD ? false : 'inline-source-map',
		plugins,
		module: {
			rules: [{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					options: {
						plugins: ['@babel/plugin-transform-runtime'],
						presets: ['@babel/preset-env']
					}
				}, {
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						loaders: {
							less: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
							js: {
								loader: 'babel-loader',
								options: { 
									plugins: ['@babel/plugin-transform-runtime'],
									presets: ['@babel/preset-env'] 
								}
							}
						}
					}
				}, {
					test: /\.less$/,
					use: [
						{ loader: MiniCssExtractPlugin.loader },
						{ loader: 'css-loader' },
						{ loader: 'less-loader' }
					]
				}, {
					test: /\.css$/,
					use: [
						{ loader: MiniCssExtractPlugin.loader },
						{ loader: 'css-loader' }
					]
				}
			]
		},
	};
}