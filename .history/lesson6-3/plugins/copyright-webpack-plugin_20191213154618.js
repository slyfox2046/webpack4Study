class CopyrightWebpackPlugin {
    constructor(options){
        console.log("插件被使用了！");
        console.log(options);
    }
    apply(compiler){
        // 参考文档： https://webpack.js.org/api/compiler-hooks/
        // compiler 存储了webpack的实例
        // console.log(compiler.hooks);
        

    }
}

module.exports = CopyrightWebpackPlugin;