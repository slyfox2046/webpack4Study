const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin }= require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

const commonConfig = {
    entry: {
        main: "./src/index.js"
    },
    resolve:{
        extensions:['.js','.jsx'],   // 引入的时候，先找js对应的文件，然后再找jsx对应的文件
        // extensions:['.css','.jpg','.js','.jsx']   //  会执行多次查找，性能损耗较大，逻辑代码可配置在resolve中
        // mainFiles :['index','child'], // 引入目录的时候，先找index开头对应的文件，然后再找child开头对应的文件，同样会带来性能问题，按需配置，一般不配置
        alias:{ // 别名
            delllee : path.resolve(__dirname,'../src/child/child') // 例如child 在 ../src/a/b/c/child 目录下 这里配置就比较方便
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/, // 5-8
                // include: path.resolve(__dirname,'../src'),
                use:[
                    {
                        loader: "babel-loader",  // 只是桥梁作用，还需要 @babel/preset-env
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif)$/, //正则，以.jpg结尾的文件
                use: {
                    // loader:'file-loader',
                    loader: 'url-loader',//把图片打包成base64的字符串
                    options: {
                        // placehoder 占位符
                        // name:'[name].[ext]',//name 指原来的文件名，ext 文件后缀
                        name: '[name]_[hash].[ext]',//name 指原来的文件名，ext 文件后缀
                        outputPath: 'images/',  // 将图片打包至images目录下
                        limit: 2048     // >2kb打包成文件，否则打包成base64的字符串
                    }
                }
            }, {
                test: /\.(eot|ttf|svg|woff2|woff)$/, //正则，以.jpg结尾的文件
                use: {
                    loader: 'file-loader',
                }
            }

        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html' // 使用的模板
        }), //htmlwebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中

        new CleanWebpackPlugin(),  //打包前先清除dist目录,
        new webpack.ProvidePlugin({
            $:'jquery',// 如果模块中使用了$字符串，就在模块里自动引入jquery这个模块，然后把jquery赋值给$这个变量
            // _:'lodash'
            _join:['lodash','join']
        })
    ],
    optimization: {
        runtimeChunk:{
            name:'runtime'
        },
        usedExports : true ,  // 哪些导出的模块被使用了，再做打包,tree shaking 相关
        splitChunks: {
            chunks: 'all',//async只对异步代码生效，initial只对同步代码生效，all同步异步等进行代码分割（vendors配置按照官网配置可生效）
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,//引入的库是否在node_modules目录下的
                    priority: -10,//值越大，优先级越高
                    name: 'vendors'//
                }

            }
        }
    },
    performance:false,// 去除文件大于244kb的警告
}

module.exports = (env)=>{
    // if(env && env.production){
    if(env && env.production ==="abc"){
        return merge(commonConfig,prodConfig);
    }else{
        return merge(commonConfig,devConfig);
    }
}
