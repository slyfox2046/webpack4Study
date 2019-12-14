const path = require('path');
const CopyRightWebpack

module.exports ={
    mode:'development',
    entry:{
        main:'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
    }

}
