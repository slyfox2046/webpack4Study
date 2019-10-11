const path = require('path');

module.exports = {
    mode: "development",// development 开发模式，未被压缩，production 线上模式，被压缩了
    
    // entry :"./src/index.js", //入口文件，放在了src目录下
    entry :{
        main:"./src/index.js"
    },

    output : {
        filename : 'bundle.js', //输出的文件名
        path : path.resolve(__dirname,'dist')  //配置路径
    }
}
