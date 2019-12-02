/*
 * @Author: your name
 * @Date: 2019-12-02 09:26:52
 * @LastEditTime: 2019-12-02 10:36:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack4Study\lesson6-2\loaders\replaceloader.js
 */
const loaderUtils = require('loader-utils');

// 这里不能用箭头函数，一定用function
module.exports = function (source) {
    return source.replace('lee','world');
}
