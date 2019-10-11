const path = require('path');

module.exports = {
    entry :"./index.js",
    output : {
        filename : 'bundle.js', //输出的文件名
        path : path.resolve(__dirname,'bundle')  //配置路径
    }
}
