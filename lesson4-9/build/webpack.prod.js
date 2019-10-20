// const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = {
    // mode: "development",// development 开发模式，未被压缩，production 线上模式，被压缩了
    mode:"production",
    // 最佳实践
    // devtool : 'cheap-module-eval-source-map', // mode:"development" 模式下推荐使用
    devtool : 'cheap-module-source-map', // mode:"production" 模式下推荐使用
    module:{
        rules:[
            {
                test:/\.scss$/, //正则，以.jpg结尾的文件
                use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,// 替换掉 style-loader
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
                    MiniCssExtractPlugin.loader,// 替换掉 style-loader
                    'css-loader',
                    'postcss-loader'
                ] //有执行顺序，从下到上，从右到左
            },
        ]
    },
    optimization: {
        minimizer: [ new OptimizeCSSAssetsPlugin({})],
      },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'[name].css',// 直接引用的，从入口文件过来的
            chunkFilename:'[name].chunk.css'// 间接的引用的，
        })
    ]
};
module.exports = merge(commonConfig,prodConfig);
