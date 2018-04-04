/**
 * webpack 开发模式配置
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function join(p) {
	return path.join(__dirname, p);
}

module.exports = {
	entry: {
		app: join('../src/index.jsx'),
		vendor: ['react', 'react-dom', 'babel-polyfill']
	},
	output: {
		path: join('../dist'),
		filename: '[name].js',
		hashDigestLength: 6
	},
	resolve: {
		extensions: ['.js', '.jsx', '*']
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: 'babel-loader',
			exclude: /node_modules/
		},
		{
			test: /\.less$/,
			use: [
				'style-loader', 
				'css-loader', 
				'postcss-loader',
				'less-loader'
			]
		},
		{
			test: /\.(png|gif|jpg|jpeg|bmp|woff|woff2|svg|ttf|eot|mp3)$/i,
			use : {
				loader : 'url-loader',
				options : {
					limit : '8192'
				}
			}
		}]
	},
	plugins: [
		new webpack.DefinePlugin({ 
			'process.env': {
				NODE_ENV: JSON.stringify('development') // 环境定义
			}
		}),
		new HtmlWebpackPlugin({
			filename: path.join(__dirname, '../dist/index.html'),
			template: path.join(__dirname, '../src/index.html')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		port: 8000,
		hot: true,
		compress: true,
		host: '0.0.0.0',
		public: 'localhost:8000'
	}
};