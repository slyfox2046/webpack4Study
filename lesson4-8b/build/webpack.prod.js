const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = {
    // mode: "development",// development 开发模式，未被压缩，production 线上模式，被压缩了
    mode:"production",
    // 最佳实践
    // devtool : 'cheap-module-eval-source-map', // mode:"development" 模式下推荐使用
    devtool : 'cheap-module-source-map', // mode:"production" 模式下推荐使用
};
module.exports = merge(commonConfig,prodConfig);
