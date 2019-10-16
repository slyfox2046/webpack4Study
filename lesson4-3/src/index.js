// 第一种方式
// 首次访问页面时，加载main.js 2mb
// 当页面业务逻辑发生变化时，又要加载2mb的内容

console.log(_.join(['a','b','1c'],'***'));
console.log(_.join(['a','b','2c'],'***'));

// 第二种方式
// main.js 被拆成lodash.js(1Mb),main.js(1Mb)
// 当页面业务逻辑发生变化时，只要加载main.js即可(1Mb)

// Code Splitting
