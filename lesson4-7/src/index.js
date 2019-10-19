
// 异步加载
// function getComment() {
//     return import(/*webpackChunkName:"lodash"*/'lodash').then(({default:_})=>{
//         var element = document.createElement('div');
//         element.innerHTML = _.join(['Dell','Lee'],'-');
//         return element;
//     })
// }

// 异步函数
async function getComment() {
    const {default : _} =await import(/*webpackChunkName:"lodash"*/'lodash');
    const element = document.createElement('div');
    element.innerHTML = _.join(['Dell','Lee'],'-');
    return element;
}

document.addEventListener("click", ()=>{
    getComment().then(element=>{
        document.body.appendChild(element);
    });
})


