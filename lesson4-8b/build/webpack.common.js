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
    optimization: {
        splitChunks: {
            chunks: 'all',//async只对异步代码生效，initial只对同步代码生效，all同步异步等进行代码分割（vendors配置按照官网配置可生效）
            minSize: 30000,//引入的库文件大小>30000才做代码分割
            maxSize: 0,
            minChunks: 1,//引入的库被引入几次后，才进行代码分割,1表示每个都分割，若改成2则lodash被引用到2次才分割
            maxAsyncRequests: 5,//同时加载的模块数最多是5个,前5个做代码分割，超过的不做分割处理。一般按照默认配置
            maxInitialRequests: 3,//入口文件做代码分割，最多3个，超过3个不做分割。一般按照默认配置
            automaticNameDelimiter: '~',//文件之间的连接符
            automaticNameMaxLength: 30,//文件之间的
            name: true,//名称是否使用，一般默认配置true
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,//引入的库是否在node_modules目录下的
                    priority: -10,//值越大，优先级越高
                    // filename: 'vendors.js'//filename配置会把所有的vendors文件放在一个文件vendors.js中，vendors~main.js vendors表示符合vendors这个组的要求，main.js指入口文件是entry.main所指向的index.js文件
                },
                default: {
                    // minChunks: 2,
                    priority: -20,//值越大，优先级越高
                    reuseExistingChunk: true,//如果一个模块之前已经被打包过了，那就使用之前打包过的不会再打包，会进行复用。
                    filename: 'common.js' //打包会生成default~main.js文件， default表示符合default这个组的要求，main.js指入口文件是entry.main所指向的index.js文件
                }
            }
        }
    },

    output: {
        // publicPath : '/',// 设置根路径
        filename: '[name].js', //输出的文件名
        path: path.resolve(__dirname, '../dist')  //配置路径
    }
}
