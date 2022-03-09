/** @format */

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	entry: path.join(__dirname, "/src/index.tsx"),
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(s*)css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[hash:base64]",
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: { name: "[name].[contenthash].[ext]" },
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/",
		filename: "main.[contenthash].wp.js",
		chunkFilename: "[contenthash].js",
	},
	optimization: {
		splitChunks: {
			chunks: "async",
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
		minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "athletic-training-exam-prep",
			minify: true,
			template: "./public/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
			chunkFilename: "[name].[contenthash].css",
			ignoreOrder: false,
		}),
	],
};
