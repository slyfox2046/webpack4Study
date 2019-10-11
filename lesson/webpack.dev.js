const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/index.js'
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        hot: true,
        hotOnly: true //
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 10240
                }
            }
        }, {
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader'
            }
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },
                'sass-loader',
                'postcss-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        }]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template:'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization : {
        // providedExports: true,
        usedExports: true,
        //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
        //依赖于optimization.providedExports和optimization.usedExports
        // sideEffects: true,
        //取代 new webpack.optimize.ModuleConcatenationPlugin()
        // concatenateModules: true,
        //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
        // noEmitOnErrors: true
    },
    output: {
        filename : '[name].js',
        path : path.resolve(__dirname,'dist')
    }
}
