const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: "production",
    entry:{
        vendors: ['react','react-dom','lodash']
    },
    output:{
        filename :'[name].dll.js',
        path:path.resolve(__dirname,'../dll'),
        library: "[name]"  // 打包生成的vendors.dll.js 通过vendors这个全局变量暴露出来
    },
    plugins:[
        new webpack.DllPlugin({
            // 对dll的库进行分析，分析的结果放在path 下
            name:'[name]',
            path:path.resolve(__dirname,'../dll/[name].manifest.json')
        })
    ]
}