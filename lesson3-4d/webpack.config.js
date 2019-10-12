const path = require('path');

module.exports = {
    mode: "development",// development 开发模式，未被压缩，production 线上模式，被压缩了

    // entry :"./src/index.js", //入口文件，放在了src目录下
    entry :{
        main:"./src/index.js"
    },
    module:{
        rules:[{
            test:/\.(jpg|png|gif)$/, //正则，以.jpg结尾的文件
            use:{
                // loader:'file-loader',
                loader:'url-loader',//把图片打包成base64的字符串
                options : {
                    // placehoder 占位符
                    // name:'[name].[ext]',//name 指原来的文件名，ext 文件后缀
                    name:'[name]_[hash].[ext]',//name 指原来的文件名，ext 文件后缀
                    outputPath : 'images/' ,  // 将图片打包至images目录下
                    limit : 2048     // >2kb打包成文件，否则打包成base64的字符串
                }
            }
        },{
            test:/\.scss$/, //正则，以.jpg结尾的文件
            use:[
                'style-loader',
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
        },{
            test:/\.(eot|ttf|svg|woff2|woff)$/, //正则，以.jpg结尾的文件
            use:{
                loader:'file-loader',
            }
        }

        ]

    },
    output : {
        filename : 'bundle.js', //输出的文件名
        path : path.resolve(__dirname,'dist')  //配置路径
    }
}
