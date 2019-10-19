const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin }= require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/index.js"

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",  // 只是桥梁作用，还需要 @babel/preset-env
                /* options:{
                     // presets:[["@babel/preset-env",{
                     //     targets:{
                     //         chrome:"67" // chrome>67版本的,就不要再进行babel的es6->es6转换了
                     //     },
                     //     useBuiltIns:'usage' //babel-ployfill 填充的时候，根据业务代码来决定加什么，从而减小打包文件的大小
                     // }]],
                     "plugins":[
                         ["@babel/plugin-transform-runtime",
                         {
                             // "absoluteRuntime": false,
                             "corejs": 2,
                             "helpers": true,
                             "regenerator": true,
                             "useESModules": false
                         }]
                     ]
                 }*/
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
                test: /\.css$/, //正则，以.jpg结尾的文件
                use: [
                    'style-loader','css-loader','postcss-loader'
                ] //有执行顺序，从下到上，从右到左
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

        new CleanWebpackPlugin(),  //打包前先清除dist目录
    ],
    optimization:{
        // code splitting 代码风格
        splitChunks:{
            chunks:'all'//async只对异步代码生效，initial只对同步代码生效，all同步异步等进行代码分割（vendors配置按照官网配置可生效）
        }
    },
    output: {
        // publicPath : '/',// 设置根路径
        filename: '[name].js', //输出的文件名
        path: path.resolve(__dirname, '../dist')  //配置路径
    }
}