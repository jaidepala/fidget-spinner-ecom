const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
	mode: "production",
	output: {
		publicPath: "http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/cart/",
	},

	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},

	devServer: {
		port: 3002,
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
			name: "cart",
			filename: "remoteEntry.js",
			remotes: {
				home: "home@http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/home/remoteEntry.js",
				pdp: "pdp@http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/pdp/remoteEntry.js",
				cart: "cart@http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/cart/remoteEntry.js",
			},
			exposes: {
				"./cart": "./src/cart.js",
				"./Login": "./src/Login.jsx",
				"./MiniCart": "./src/MiniCart.jsx",
				"./CartContent": "./src/CartContent.jsx",
			},
			shared: {
				...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		}),
	],
};
