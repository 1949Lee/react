const path = require('path');
const merge = require('webpack-merge');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {resolve} = require('./utils.js');
const webpack = require('webpack');
const common = require('./webpack.common.js');


module.exports = merge(common,{
	output: {
		filename: '[name].bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude:[resolve('src/styles'),/\.g\.scss$/],
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]--[hash:base64:5]'
							},
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.scss$/,
				include:[resolve('src/styles'),/\.g\.scss$/],
				loader: ['style-loader','css-loader','sass-loader'],
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				loader: ['style-loader', 'css-loader', 'less-loader']
			}
		]
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: resolve('public'),
		historyApiFallback:true,
		hot: true,
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	]
});
