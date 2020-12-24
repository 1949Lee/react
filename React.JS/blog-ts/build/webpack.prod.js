const path = require('path');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const {resolve} = require('./utils.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const {IgnorePlugin} = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


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
	optimization: {
		// 压缩 css
		// minimizer: [
		// 	new TerserWebpackPlugin({
		// 		terserOptions: {
		// 			compress: {
		// 				drop_console:true
		// 			}
		// 		},
		// 	})
		// ],
		// 分割代码块
		splitChunks: {
			chunks: 'all',

			// 缓存分组
			cacheGroups: {

				// 第三方模块
				vendorUI: {
					name: 'vendor-ui', // chunk 名称
					priority: 2, // 权限更高，优先抽离，重要！！！
					test: /antd|@ant-design/,
					minSize: 0,  // 大小限制
					minChunks: 1  // 最少复用过几次
				},

				// 第三方模块
				vendor: {
					name: 'vendor', // chunk 名称
					priority: 1, // 权限更高，优先抽离，重要！！！
					test: /node_modules/,
					minSize: 0,  // 大小限制
					minChunks: 1  // 最少复用过几次
				},

				// 公共的模块
				common: {
					name: 'common', // chunk 名称
					priority: 0, // 优先级
					minSize: 0,  // 公共模块的大小限制
					minChunks: 2  // 公共模块最少复用过几次
				}
			}
		}
	},
	plugins:[
		// new BundleAnalyzerPlugin(),
		new CleanWebpackPlugin(), // 清空dist目录
		new MiniCssExtractPlugin({
			filename: "[name].[contentHash:6].css",
			chunkFilename: "[id].[contentHash:6].css"
		}),
		new IgnorePlugin(/\.\/local/,/moment/),
		new OptimizeCSSAssetsPlugin({
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
			canPrint: true
		})
	]
});
