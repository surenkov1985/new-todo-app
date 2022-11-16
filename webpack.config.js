const webpack = require("webpack");
const path = require("path");
const ES6Promise = require("es6-promise");
ES6Promise.polyfill();

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV;

const build = {
	context: path.resolve(__dirname, "./src"),
	mode: mode,

	plugins: [
		new MiniCssExtractPlugin({
			filename: "assets/styles/[name].[contenthash].css",
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./index.html",
			chunks: ["index"],
		}),
		new CopyPlugin({
			patterns: [{ from: "static", to: "", noErrorOnMissing: true }],
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
		}),
	],
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	entry: {
		index: ["whatwg-fetch", "@babel/polyfill", "./index.js"],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"": path.resolve(__dirname, "src/"),
		},
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
		minimize: true,
		minimizer: [
			new OptimizeCssPlugin(),
			new TerserWebpackPlugin({
				extractComments: false,
			}),
		],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "assets/js/[name].[contenthash].js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				use: ["html-loader"],
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { importLoaders: 1 },
					},
					{
						loader: "postcss-loader",
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { importLoaders: 1 },
					},
					{
						loader: "postcss-loader",
					},
					{
						loader: "less-loader",
					},
				],
			},
			{
				test: /\.(jpg|png|svg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/img/[name][ext]",
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[name][ext]",
				},
			},
			{
				test: /\.[jt]sx?$/,
				exclude: /node-modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
					},
				},
			},
		],
	},
};

const dev = {
	devtool: "source-map",
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, "src"),
		},
		open: true,
		port: 3000,
		host: "localhost",
		compress: false,
		hot: true,
		liveReload: true,
		client: {
			overlay: {
				warnings: true,
				errors: true,
			},
		},
	},
	optimization: {
		minimize: false,
	},
};

module.exports = Object.assign(build, mode === "development" ? dev : {});
