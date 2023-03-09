const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
	mode: "production",
	output: {
		publicPath: "http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/addtocart/",
	},

	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},

	devServer: {
		port: 3003,
		historyApiFallback: true,
	},

	module: {
		rules: [
			{
				test: /\.m?js/,
				type: "javascript/auto",
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},

	plugins: [
		new ModuleFederationPlugin({
			name: "addtocart",
			filename: "remoteEntry.js",
			remotes: {
				cart: "cart@http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/cart/remoteEntry.js",
			},
			exposes: {
				"./AddToCart": "./src/AddToCart.jsx",
				"./placeAddToCart": "./src/placeAddToCart.js"
			},
			shared: {
				...deps,
				"solid-js": {
					singleton: true,
					requiredVersion: deps["solid-js"],
				},
			},
		}),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		}),
	],
};
