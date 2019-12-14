class CopyrightWebpackPlugin {
    constructor(options){
        console.log("插件被使用了！");
        console.log(options);
    }
    apply(compiler){
        // 参考文档： https://webpack.js.org/api/compiler-hooks/
        // compiler 存储了webpack的实例
        // console.log(compiler.hooks);

        // 同步时刻
        compiler.hooks.compile.tap('CopyrightWebpackPlugin',(compilation)=>{
            console.log("同步时刻 compiler");
        }) 

        // 异步时刻
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',(compilation,cb) => {
            // 在代码增加到dist目录之前，又增加了一个文件copyright.txt
            // console.log(compilation.assets);

            // debugger; 用于node
            compilation.assets["copyright.txt"] = {
                source:function(){
                    return 'copyright by dell lee'
                },
                size: function(){
                    return 21;                
                }
            };

            cb();
        } )

    }
}

module.exports = CopyrightWebpackPlugin;