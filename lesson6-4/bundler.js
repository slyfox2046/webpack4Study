/*
 * @Author: Admin
 * @Date: 2019-12-21 16:43:56
 * @FilePath: \webpack4Study\lesson6-4\bundler.js
 * @Description: file content
 */
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8');
  // 分析出抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module',
  });

  // 依赖的文件
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      // 获取当前目录
      const dirname = path.dirname(filename);
      const newFile = './' + path.join(dirname, node.source.value); // ./相对于点前bundle.js文件目录
      dependencies[node.source.value] = newFile;
    },
  });
  // console.log(dependencies);
  // console.log(dependencies);
  // console.log(ast.program.body);

  // console.log(content);

  // 使代码能在浏览器上运行
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });

  // console.log(code);

  return {
    filename,
    dependencies,
    code,
  };
};

const moduleInfo = moduleAnalyser('./src/index.js');
console.log(moduleInfo);
