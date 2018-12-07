import React from 'react';
import {render} from 'react-dom';
import App from './App';

import './css/base.css';
import './iconfont/iconfont.css';

// 引入react-redux提供的Provider组件
import {Provider} from 'react-redux';
// 引入store
import store from './store';

// 引入路由
import {HashRouter} from 'react-router-dom';


render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);


