const path = require('path');
const merge = require('webpack-merge');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {resolve} = require('./utils.js');
const webpack = require('webpack');
const common = require('./webpack.common.js');


module.exports = merge(common,{
	output: {
		filename: '[name].bundle.js'
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
