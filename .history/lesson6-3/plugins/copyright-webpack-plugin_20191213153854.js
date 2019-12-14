class CopyrightWebpackPlugin {
    constructor(options){
        console.log("插件被使用了！");
        console.log(options);
    }
    apply(compiler){
        
        // compiler 存储了webpack的实例
        console.log(compiler.hooks);

    }
}

module.exports = CopyrightWebpackPlugin;