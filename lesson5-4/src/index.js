// import "@babel/polyfill";   // 不引入，英文.babelrc中已经配置了 "useBuiltIns": "usage" ，会自动加载polyfill

import React,{Component} from 'react';
import ReactDom from 'react-dom';

import axios from 'axios';


class App extends Component{
    componentDidMount(){
        // axios.get('http://www.dell-lee.com/react/api/header.json')// dell-lee 服务器允许跨域

        // 可以用charles fiddler 等工具进行代理
        // 现在用webpack devServer.proxy 进行配置
        axios.get('/react/api/header.json')// dell-lee 服务器允许跨域
            .then((res)=>{
                console.log(res);
            })
    }
    render() {
        return <div>Hello World</div>
    }
}
ReactDom.render(<App />,document.getElementById('root'));

