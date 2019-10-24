const  path = require('path');
module.exports = {
    mode:"production",
    entry:"./src/index.js",
    // externals:["lodash"],// 自己的库里引用了lodash，如果用户的文件也引用了lodash，就多余了，所以要配置这个设置
    externals:{
        lodash:{// 这个lodash 和 const lodash 名称需一致
            commonjs:'lodash',// const lodash = require('lodash');const library = require("library")
            commonjs2:'lodash',//
            amd: 'lodash',
            root:"_",// <script src ="./library.js"><script>  然后 页面里必须使用"_"这个变量
             }

    },
    output : {
        path:path.resolve(__dirname,'dist'),
        filename: 'library.js',
        libraryTarget:'umd', // 通用 import require 等形式引用
        // libraryTarget:'this', // 会挂载到全局的this上， this.library
        library:'library'// <script src="library.js">  然后library.math 这样用(全局变量里增加一个library的变量)
    }

}
