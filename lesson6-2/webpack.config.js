const path = require('path');
module.exports ={
    mode:'development',
    entry:{
        main:'./src/index.js'
    },
    resolveLoader:{
        modules:['node_modules','./loaders']   // loader先从node_modules中找，在从loaders目录中找
    },
    module:{
        rules:[{
            test:/\.js/,
            // use:[path.resolve(__dirname,'./loaders/replaceLoader.js')]
            use:[
                {
                    // loader:path.resolve(__dirname,'./loaders/replaceLoader.js')
                    loader:'replaceLoader'
                },
                {
                    loader: 'replaceLoaderAsync',
                    options: {
                        name: 'lee'
                    }
                }
            ]
        }]
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    }
}
