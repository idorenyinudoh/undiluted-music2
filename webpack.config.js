const path = require('path');

module.exports = {
    entry: {
        'album-audio': './public/scripts/album-audio.js',
        audio: './public/scripts/audio.js',
        header: './public/scripts/header.js',
        latest: './public/scripts/latest.js',
        singleaudio: './public/scripts/singleaudio.js'
    },
    output: {
        path: path.resolve(__dirname, 'views'),
        filename: 'scripts/[name].bundle.js'
    },
    module: {
        rules: [
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
    }
}