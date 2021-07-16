const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('./utils.js');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')

module.exports = {
	context: path.resolve(__dirname, '../'),// 上下文基础目录，绝对路径，用于从配置中解析入口起点。即，这个配置了之后。entry的路径就是相对于context的。
	entry: {
		app: './src/index.tsx'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json'],
		plugins: [
			new TsconfigPathsPlugin({
				configFile: resolve('tsconfig.json')
			})
		]
	},
	output: {
		filename: '[name].[hash:6].js',
		path: resolve('dist')
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				// loader: 'ts-loader',
				use: [
					{
						loader: 'ts-loader',
						options: {
							getCustomTransformers: () => ({
								before: [ TsImportPluginFactory({style:true}) ]
							})
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							name:"[name].[hash:6].[ext]"
						}
					}
				]
			},
			{
				test: /\.(woff|svg|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							name:"[name].[hash:6].[ext]"
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.API_ENV': JSON.stringify(process.env.API_ENV)
		}),
		new HtmlWebpackPlugin({ // 自动将打包出的js、css等资源引入到index.html中
			template: resolve('public/index.html'),
			favicon:resolve('public/favicon.ico')
		})
	],
};
