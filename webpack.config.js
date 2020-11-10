const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackFixStyleOnlyEntries = require('webpack-fix-style-only-entries');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        albumAudio: './public/scripts/albumAudio.js',
        audio: './public/scripts/audio.js',
        header: './public/scripts/header.js',
        latest: './public/scripts/latest.js',
        singleAudio: './public/scripts/singleAudio.js',
        'album-audio': './public/stylesheets/album-audio.css',
        album: './public/stylesheets/album.css',
        artiste: './public/stylesheets/artiste.css',
        artistes: './public/stylesheets/artistes.css',
        error: './public/stylesheets/error.css',
        genre: './public/stylesheets/genre.css',
        headter: './public/stylesheets/headter.css',
        'latest-releases': './public/stylesheets/latest-releases.css',
        release: './public/stylesheets/release.css',
        'single-audio': './public/stylesheets/single-audio.css',
        singleps: './public/stylesheets/singleps.css',
        today: './public/stylesheets/today.css'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'stylesheets/[name].bundle.css'
        }),
        new WebpackFixStyleOnlyEntries()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin()
        ]
    }
}