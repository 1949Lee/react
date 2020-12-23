const path = require('path');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common,{
	module:{
		rules:[
			{
				test: /\.scss$/,
				exclude:[resolve('src/styles'),/\.g\.scss$/],
				use: [
					{
						loader: MiniCssExtractPlugin.loader
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
				loader: [MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
			},
			{
				test: /\.css$/,
				loader: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.less$/,
				loader: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin(), // 清空dist目录
		new MiniCssExtractPlugin({
			filename: "[name].[contentHash:6].css",
			chunkFilename: "[id].[contentHash:6].css"
		}),
	]
});
