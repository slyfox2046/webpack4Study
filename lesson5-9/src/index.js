import React , {Component} from 'react';
import ReactDom from 'react-dom';

// import Child from './child/child' ;   // './child/child' webpack.common.js 中配置resolve.extensions

// import Child from './child/' ;  // webpack.common.js 中配置resolve.mainFiles

import Child from 'delllee';  // webpack.common.js 中配置resolve.alias 指向要引入的目录

class App extends Component{
    render() {
        return (
            <div>
                <div>This is App</div>
                <Child/>
            </div>
        )
    }
}
ReactDom.render(<App/>,document.getElementById('root'));