const path = require('path');

module.exports ={
    entry:'./src/index.tsx',
    module:{
        rules:[{
            test:/\.tsx?$/,
            use : 'ts-loader',//需要tsconfig.json 配置文件
            exclude:/node_modules/
        }]
    },
    output:{
        filename : 'bundle.js',
        path: path.resolve(__dirname,'dist')
    }
}
