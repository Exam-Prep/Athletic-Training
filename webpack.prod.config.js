/** @format */

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
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
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[contenthash]",
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.(jpg|png|svg)$/,
				type: "asset",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/Athletic-Training/",
		filename: "main.[contenthash].wp.js",
		chunkFilename: "chunk.[contenthash].js",
	},
	optimization: {
		innerGraph: true,
		minimize: true,
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendor: {
					filename: "modules.[contenthash].js",
					reuseExistingChunk: true,
				},
			},
		},
		usedExports: false,
		minimizer: [new TerserPlugin(), new CssMinimizerWebpackPlugin({})],
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
