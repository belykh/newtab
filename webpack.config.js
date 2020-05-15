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
			index: './src/index.ts'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			library: 'src'
		},
		watchOptions: { aggregateTimeout: 200 },
		devtool: PROD ? false : 'inline-source-map',
		plugins,
		resolve: {
			extensions: ['.ts', '.js', '.vue'],
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					exclude: /node_modules/,
					options: {
						loaders: {
							less: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
						}
					}
				},
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
					options: {
						appendTsSuffixTo: [/\.vue$/],
					}
				},
				{
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