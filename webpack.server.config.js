/** @format */

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

const SERVER_PATH = path.join(__dirname, "/server/server.ts");

module.exports = {
	mode: "production",
	entry: SERVER_PATH,
	output: {
		path: path.join(__dirname, "dist/"),
		publicPath: "/",
		filename: "server.wp.js",
	},
	target: "node",
	node: {
		__dirname: false,
		__filename: false,
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts"],
	},
	optimization: {
		innerGraph: true,
		minimize: true,
		splitChunks: {
			chunks: "async",
			cacheGroups: {
				vendor: {
					filename: "modules.[contenthash].js",
					reuseExistingChunk: true,
				},
			},
		},
		usedExports: false,
		minimizer: [new TerserPlugin()],
	},
};
