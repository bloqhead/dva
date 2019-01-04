//webpack.config.js
const webpack = require('webpack');
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
	return {
		entry: {
			main: './src/js/index.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js'
		},
		resolve: {
			modules: [
				'node_modules',
				path.resolve(__dirname, 'src')
			]
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader'
					}
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader'
					]
				}
			]
		},
		plugins: [
			new BrowserSyncPlugin({
				host: 'localhost',
				port: '3000',
				server: {
					baseDir: ['dist']
				}
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css'
			}),
			new HtmlWebpackPlugin({
				inject: false,
				hash: false,
				template: path.resolve(__dirname, 'src/index.html'),
				filename: 'index.html'
			})
		]
	}
}
