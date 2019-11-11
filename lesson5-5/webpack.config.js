const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin }= require('clean-webpack-plugin');
const webpack = require('webpack');

// plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情

module.exports = {
    mode: "development",// development 开发模式，未被压缩，production 线上模式，被压缩了
    // devtool : 'source-map', //源码映射，默认mode："development"其实已经有默认配置了
    // devtool : 'eval', // 通过eval的这种执行形式来形成source map的对应关系的，效率最快，但有时不全面
    // devtool : 'inline-source-map', // 以url的方式变成一个base64的字符串写在main.js文件中
    // devtool : 'cheap-inline-source-map', // cheap具体到行，性能提升。 而 inline具体到行列

    // 最佳实践
    devtool : 'cheap-module-eval-source-map', // mode:"development" 模式下推荐使用
    // devtool : 'cheap-module-source-map', // mode:"production" 模式下推荐使用

    // devtool : 'cheap-module-source-map', // module 能包括第三方模块的错误
    // entry :"./src/index.js", //入口文件，放在了src目录下
    entry: {
        main: "./src/index.js",
    },
    devServer : {
        port: 8090,// 端口号
        contentBase: './dist',
        open:true,// 直接打开浏览器，
        hot:true,  // 热模块更新
        hotOnly:true, // 不让浏览器重新刷新


        historyApiFallback :true, // 对路径的请求转发到根路径的请求
        // 只能在webpack devserver 环境下生效，即在开发环境下才生效，线上代码无效
        proxy: {

            '/react/api':{
                target:'https://www.dell-lee.com', // 请求代理到哪个网址
                secure: false, // 如果是 https 方式，开发模式下可以先将安全 关闭

                pathRewrite:{
                    'header.json':'demo.json'     // 路径中请求header.json 返回 demo.json 的数据，后台接口写完后，可注释该行
                },
                // 变更请求头
                changeOrigin : true,
                headers: {
                    host:"www.dell-lee.com"
                }
            }
        }
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
        new webpack.HotModuleReplacementPlugin() //开启webpack HMR 功能
    ],

    output: {
        // publicPath : '/',// 设置根路径
        filename: '[name].js', //输出的文件名
        path: path.resolve(__dirname, 'dist')  //配置路径
    }
}
