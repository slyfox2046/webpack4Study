const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: "production",
    entry:{
        vendors: ['lodash'],
        react: ['react','react-dom'], // 拆解成两个dll文件
        jquery:['jquery']
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
