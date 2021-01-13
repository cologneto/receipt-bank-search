// webpack.config.js

const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './client/src/js/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, 'client/dist/'),
        publicPath: 'client/dist/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, "client/public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
    },
}