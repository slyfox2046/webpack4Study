const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

// plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情

const devConfig = {
    mode: "development",// development 开发模式，未被压缩，production 线上模式，被压缩了
    // 最佳实践
    devtool : 'cheap-module-eval-source-map', // mode:"development" 模式下推荐使用
    devServer : {
        port: 8090,// 端口号
        contentBase: './dist',
        open:true,// 直接打开浏览器，
        hot:true,  // 热模块更新
        // hotOnly:true // 不让浏览器重新刷新
    },
    module: {
        rules: [
            {
                test:/\.scss$/, //正则，以.jpg结尾的文件
                use:[
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options : {
                            importLoaders : 2, // 例如scss文件，嵌套引入scss文件，配置importLoaders以后，会再走postcss-loader和sass-loader这两个loader
                            // modules :true // 开启css模块化打包
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ] //有执行顺序，从下到上，从右到左
            },
            {
                test:/\.css$/, //正则，以.jpg结尾的文件
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ] //有执行顺序，从下到上，从右到左
            },
        ]

    },

    plugins: [
        new webpack.HotModuleReplacementPlugin() //开启webpack HMR 功能
    ],
    output: {
        filename: '[name].js', // 入口文件输出的文件名
        chunkFilename:'[name].chunk.js',// 其他引用的包的输出文件名
    }
}

module.exports = merge(commonConfig,devConfig);
