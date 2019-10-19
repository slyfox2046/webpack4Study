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

    plugins: [
        new webpack.HotModuleReplacementPlugin() //开启webpack HMR 功能
    ],
    optimization:{
        usedExports : true   // 哪些导出的模块被使用了，再做打包
    }
}

module.exports = merge(commonConfig,devConfig);
