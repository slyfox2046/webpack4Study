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

const makeDependenciesGraph = entry => {
  const entryModule = moduleAnalyser(entry);
  const graphArray = [entryModule];
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i];
    const { dependencies } = item;
    if (dependencies) {
      for (let j in dependencies) {
        // 关键 有点类似递归,获取当前文件import的文件，再添加到数组中再进行分析
        graphArray.push(moduleAnalyser(dependencies[j]));
      }
    }
  }
  // console.log(graphArray);
  const graph = {};
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code,
    };
  });
  // console.log(graph);
  return graph;
};

const generateCode = entry => {
  const graph = JSON.stringify(makeDependenciesGraph(entry));
  return `
  (function(graph){
    function require(module){
      function localRequire(relativePath){
        return require(graph[module].dependencies[relativePath])
      }
      var exports = {};
      (function(require,exports,code){
        eval(code)
      })(localRequire,exports,graph[module].code);
      return exports;
    };
    require('${entry}')

  })(${graph});
  `;
};

const code = generateCode('./src/index.js');
console.log(code);
