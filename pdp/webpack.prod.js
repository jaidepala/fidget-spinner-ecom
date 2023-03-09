const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
    mode: "production",
    output: {
        publicPath: "http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/pdp/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 3001,
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
            name: "pdp",
            filename: "remoteEntry.js",
            remotes: {
                addtocart: "addtocart@http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/addtocart/remoteEntry.js",
				home: "home@http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/home/remoteEntry.js",
				pdp: "pdp@http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/pdp/remoteEntry.js",
				cart: "cart@http://fidget-spinner-micro-frontends.s3-website-us-east-1.amazonaws.com/cart/remoteEntry.js",
            },
            exposes: {
                "./PDPContent": "./src/PDPContent.jsx"
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
