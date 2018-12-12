import React, { Component } from 'react';
// 引入react-redux的connect方法
import {connect} from 'react-redux';

import axios from 'axios';

//引入React-router
import {Route,NavLink,Redirect,Switch,withRouter} from 'react-router-dom';

// 引入antd框架的taber部分
import { TabBar } from 'antd-mobile';
// 引入antd的样式
import 'antd-mobile/dist/antd-mobile.css';

//引入sass样式
import './sass/page.scss';

// 引入组件（因为暴露组件时没有写default，所以组件名需要加{}）
import {Home} from './components/Home';
import {Classify} from './components/Classify';
import {Details} from './components/Details';
import {Cart} from './components/Cart';
import {User} from './components/User';
import {Header} from './components/Header';
import {Login} from './components/Login';
import {Register} from './components/Register';


//引入fontawesome字体图标
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBars,
  faShoppingCart,
  faUser } from '@fortawesome/free-solid-svg-icons';
//faHome等是使用的图标的名称

library.add(faHome,faBars,faShoppingCart,faUser )

// 默认请求数据的url
axios.defaults.baseURL="http://127.0.0.1:8009";

class App extends Component{
  constructor() {
   super();
   this.state = {
     tabs:[{
        title:"首页",
        icon:'home',
        path:'/home'
      },
      {
        title:"分类",
        icon:'bars',
        path:'/classify'
      },
      {
        title:"购物车",
        icon:'shopping-cart',
        path:'/cart'
      },
      {
        title:"个人中心",
        icon:'user',
        path:'/user'
      }
    ],
    //默认索引值
     currentTab:0
   }
  }

  handlerClick(idx,path){
    this.setState({
      currentTab:idx
    });
    
    //编程式导航
    
    //第一种方法：获取history的方式，在app.js里通过<Route/>渲染App组件可获取history
    // 这里的history不是window下的history
    // console.log(this.props)
    this.props.history.push(path);

    // 第二种方法：利用withRouter高阶组件
  }

  // 生命周期，设置页面刷新时当前页面图标高亮
  componentWillMount(){
    // 获取hash值
    let hash = window.location.hash.slice(1);
    // console.log(hash)//#/list

    // 找出对应索引 some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
    let currentTab=0;
    this.state.tabs.some((item,idx)=>{
      currentTab=idx;
      return item.path === hash;
    });

    this.setState({
      currentTab
    })

    // console.log('app props:',this.props)
  }

  render(){
    return (
      <div className="App">
        <Header></Header>

        <div id="content">
          <div className="content">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/classify" component={Classify} />
              <Route path="/details" component={Details} />
              <Route path="/cart" component={Cart} />
              <Route path="/user" component={User} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Redirect from="/" to="/home" exact></Redirect>
            </Switch>
          </div>
        </div>
      
        <div id="Tabbar">
          <div className="Tabbar">
          <TabBar
          tintColor='#000088' //选中的字体颜色
          noRenderContent={true} //不渲染内容部分
          hidden={!this.props.tabbarStatus}
        >
        {
          this.state.tabs.map((tab,idx)=>{
            return <TabBar.Item
                title={tab.title}
                key={tab.path} //唯一标识
                icon={<FontAwesomeIcon icon={tab.icon} className="icon_size" />} //小图片
                selectedIcon={<FontAwesomeIcon icon={tab.icon} className="icon_size" />} //选中时的图标
                selected={this.state.currentTab === idx} //是否选中
                onPress={
                  this.handlerClick.bind(this,idx,tab.path)
                }
                  // 只给购物车显示微标数
                  badge={tab.path == '/cart' ? this.props.cartQty : null}
                >
                {tab.title}
                
                </TabBar.Item>
                  })
                }
            </TabBar>
        </div>
      </div>
        
     </div>
    )
  }
}


// mapStateToProps是一个函数
// state就是之前通过store.getState()获得的数据
let mapStateToProps = state=>{
  // 映射什么就写什么
  // 此处必须返回一个对象
  // console.log(state);
  return {
      //把state.commonReducer.tabbarStatus映射到props
      tabbarStatus:state.commonReducer.tabbarStatus,
      // 映射购物车商品数量到props
      cartQty:state.cartReducer.goodslist.length
  }
}

// connect方法的用法 connect执行完之后会返回一个函数
// mapStateToProps 将state中的数据映射到UI组件的props
App = connect(mapStateToProps)(App);


// withRouter相当于一个函数
// 第二种方式：利用高阶组件传递路由参数
App = withRouter(App);

export default App;

