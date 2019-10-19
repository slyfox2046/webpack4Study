// 同步加载
// import _ from 'lodash';
//
// console.log(_.join(['a','b','1c'],'***'));
// console.log(_.join(['a','b','2c'],'***'));

// 异步加载
function getComment() {
    return import(/*webpackChunkName:"lodash"*/'lodash').then(({default:_})=>{
        var element = document.createElement('div');
        element.innerHTML = _.join(['Dell','Lee'],'-');
        return element;
    })
}

getComment().then(element=>{
    document.body.appendChild(element);
});
// 代码分割，和webpack无关
// webpack中实现代码分割，两种方式
// 1. 同步方式：只需要在webpack.common.js中做optimization的配置
// 2. 异步代码(import): 异步代码，无需做如何配置，会自动进行代码分割，放置到新的文件中
