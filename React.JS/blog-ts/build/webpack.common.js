const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('./utils.js');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TsImportPluginFactory = require('ts-import-plugin')

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
		filename: '[name].[chunkhash].js',
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
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240
						}
					}
				]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ // 自动将打包出的js、css等资源引入到index.html中
			template: resolve('public/index.html')
		})
	],
};
