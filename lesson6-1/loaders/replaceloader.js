const loaderUtils = require('loader-utils');

// 这里不能用箭头函数，一定用function
module.exports = function (source) {
  /* 示例1
    console.log(this.query);
    return source.replace('dell',this.query.name);
    */


    /*//示例2
    const options = loaderUtils.getOptions(this);
    return source.replace('dell',options.name);
    */


    // 示例3
    const options = loaderUtils.getOptions(this);
    const result = source.replace('dell',options.name);
    this.callback(null,result);// 传递信息出去

    // this.callback 参考https://webpack.js.org/api/loaders/#thiscallback
    // this.callback(null,result,source,mata);
    // this.callback(
    //     err: Error | null,
    //     content: string | Buffer,
    //     sourceMap?: SourceMap,
    //     meta?: any
    // );

}