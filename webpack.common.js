const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            // eslint-disable-next-line global-require
            manifest: require('./dist/vendors-manifest.json'),
        }),
        // https://www.npmjs.com/package/add-asset-html-webpack-plugin
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'dist', '*.dll.js'),
        }),
        // https://www.npmjs.com/package/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: 'react-app',
            template: path.resolve(__dirname, 'src/index.html'),
        }),
    ],
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        alias: {
            '@commons': path.resolve(__dirname, 'src/commons/'),
            '@resource': path.resolve(__dirname, 'src/resource/'),
        },
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'vendors',
                    chunks: 'initial',
                    minChunks: 2,
                },
            },
        },
        runtimeChunk: {
            name: 'manifest',
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    'file-loader',
                ],
                include: [path.join(__dirname, 'src')],
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
                include: [path.join(__dirname, 'src')],
            }, {
                test: /\.js$/,
                include: [path.join(__dirname, 'src')],
                use: [
                    'babel-loader',
                ],
            },
        ],
    },
}
