'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const nodePath = path.join(__dirname, '/../node_modules');
const dfltPort = 8111;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */

const modules = [
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
    },
    {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
    },
    {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)\??.*$/,
        loader: 'url-loader?limit=10000&name=[path][name]_[hash:8].[ext]'
    },
    {
        test: /\.(mp3|mp4|ogg)$/,
        loader: 'file-loader'
    }
]
function getDefaultModules() {
    return {
        preLoaders: [
            {
                test: /\.jsx?$/,
                include: srcPath,
                loader: 'eslint-loader'
            }
        ],
        loaders: modules
    };
}
function getDevModules() {
    return {
        loaders: modules
    };
}

module.exports = {
    srcPath,
    nodePath,
    publicPath: '/assets/',
    port: dfltPort,
    getDevModules: getDevModules,
    getDefaultModules: getDefaultModules
};
