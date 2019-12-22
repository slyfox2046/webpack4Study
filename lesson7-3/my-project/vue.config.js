const path = require('path');
module.exports = {
  outputDir: 'dell',
  // css: {
  //   modules:true
  // }

  // 原生配置，定义到static里找内容
  // configureWebpack: {
  //   devServer: { contentBase: [path.resolve(__dirname, 'static')] },
  // },
  devServer: { contentBase: [path.resolve(__dirname, 'static')] },
};
