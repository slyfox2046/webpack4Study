// import "@babel/polyfill";   // 不引入，英文.babelrc中已经配置了 "useBuiltIns": "usage" ，会自动加载polyfill

import React,{Component} from 'react';
import {BrowserRouter,Route } from 'react-router-dom'
import ReactDom from 'react-dom';

import Home from './home'
import List from './list'


class App extends Component{
    render() {
        return(

            <BrowserRouter>
                <div>
                    <Route path='/' exact component ={Home}/>
                    <Route path='/list' component ={List}/>
                </div>

            </BrowserRouter>
        )
    }
}
ReactDom.render(<App />,document.getElementById('root'));

