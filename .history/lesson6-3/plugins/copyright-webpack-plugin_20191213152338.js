class CopyrightWebpackPlugin {
    constructor(options){
        console.log("插件被使用了！");
        console.log(options);
    }
    apply(compiler){

    }
}

module.exports = CopyrightWebpackPlugin;