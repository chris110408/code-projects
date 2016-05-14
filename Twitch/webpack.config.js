
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');


module.exports = {
    devtool: 'eval-source-map',
    entry: [
        './app/assets/javascripts/ReactSrc/app.jsx'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /(\.js|\.jsx)$/,
            exclude: /node_modules/,
            loader: 'babel'
             },
            {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")}
            , {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }

        ]
    },
    postcss: [autoprefixer],
    plugins: [
        new ExtractTextPlugin('style.css',{ allChunks: true })
    ],

    resolve: {
        extensions: ['', '.js','.scss', '.css','.jsx','.json']

    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};
