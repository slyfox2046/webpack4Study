/*
 * @Author: your name
 * @Date: 2019-12-13 14:34:39
 * @LastEditTime: 2019-12-13 15:12:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editon
 * @FilePath: \webpack4Study\lesson6-3\webpack.config.js
 */
const path = require('path');
c
c

module.exports ={
    mode:'development',
    entry:{
        main:'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
    }

}
