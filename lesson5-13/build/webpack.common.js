const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin }= require('clean-webpack-plugin');

const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

const makePlugins =(configs)=>{
    const plugins=[
        new CleanWebpackPlugin(),  //打包前先清除dist目录,
        new webpack.ProvidePlugin({
            $:'jquery',// 如果模块中使用了$字符串，就在模块里自动引入jquery这个模块，然后把jquery赋值给$这个变量
            // _:'lodash'
            _join:['lodash','join']
        })
    ];
    console.log(configs.entry);
    console.log(Object.keys(configs.entry));

    Object.keys(configs.entry).forEach(item=>{
        plugins.push(
            new HtmlWebpackPlugin({
                template: 'src/index.html', // 使用的模板
                filename:`${item}.html`,
                chunks:['runtime','vendors',item]
            })
        )
    })

    const files = fs.readdirSync(path.resolve(__dirname,'../dll'));

    files.forEach(file=>{
        if(/.*\.dll.js/.test(file)){
            plugins.push(new AddAssetHtmlWebpackPlugin({
                filepath:path.resolve(__dirname,'../dll',file) // 往HtmlWebpackPlugin 生成的html加什么
            }))
        }
        if(/.*\.manifest.json/.test(file)){
            plugins.push(new webpack.DllReferencePlugin({
                manifest:path.resolve(__dirname,'../dll/',file)
            }))
        }
    })
    return plugins;
}


// const commonConfig = {
const configs = {
    entry: {
        index: "./src/index.js",
        list: "./src/list.js",
        detail:"./src/detail.js"
    },
    resolve:{
        extensions:['.js','.jsx'],   // 引入的时候，先找js对应的文件，然后再找jsx对应的文件

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
configs.plugins = makePlugins(configs);

// const commonConfig =configs;

module.exports = (env)=>{
    // if(env && env.production){
    if(env && env.production ==="abc"){
        return merge(configs,prodConfig);
    }else{
        return merge(configs,devConfig);
    }
}
