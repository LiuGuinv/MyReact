import React,{Component} from 'react';

// 引入样式
import '../sass/Login.scss';

import axios from 'axios';

import {List, InputItem} from 'antd-mobile';

import {withRouter} from 'react-router-dom';

// 引入
import {connect} from 'react-redux';
import {header,tabbar} from '../actions';

//引入fontawesome字体图标
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
//faHome等是使用的图标的名称

library.add(faHome)

class Login extends Component{

    componentDidMount(){
		this.props.changeheaderStatus({headerStatus:false,headerTitle:""});
        this.props.changeTabbarStatus(false);
    }

    componentWillUnmount(){
		this.props.changeheaderStatus({headerStatus:true,headerTitle:""});
		this.props.changeTabbarStatus(true);
	}

    handlerGotoHome(path){
        // console.log(this.props);
        this.props.history.push(path)
    }

    handlerGotoReg(path){
        // console.log(this.props);
        this.props.history.push(path)
    }

    // 点击登录
    handlerComfirmLogin(){
        let log_name = document.querySelectorAll("#login_container .login_info .am-list-item .am-input-control input")[0].value;
        let log_pass = document.querySelectorAll("#login_container .login_info .am-list-item .am-input-control input")[1].value;
        // console.log(log_name)
        axios.post('/userapi/user/login', {
            usname: log_name,
            uspass: log_pass
        })
        .then((res)=>{
            // console.log(res)
            alert(res.data)
        })
        .catch((error)=>{
            // console.log(error.data)
            alert(error.data)
        })
    }

    render(){
        let path1 = '/home';
        let path2 = '/register';
        return (
            <div id="login_container">
                <div className="login_header">
                    <a className="goto_home" onClick={this.handlerGotoHome.bind(this,path1)}><FontAwesomeIcon icon="home" /></a>
                    <h6>登录</h6>
                    <a className="reg_btn" onClick={this.handlerGotoReg.bind(this,path2)}>注册</a>
                </div>

                <div className="login_info">
                    <div className="user_info">
                        <List>
                            <InputItem
                                type="text"
                                placeholder="用户名/邮箱/已验证手机" 
                                clear={true} 
                                className="user_name"
                            >账户</InputItem>
                            <InputItem
                                type="password"
                                placeholder="请输入登录密码"
                                clear={true} 
                                className="user_password"
                            >密码</InputItem>
                        </List>

                        <div className="remember_form">
                            <input type="checkbox" id="ischeck"/>
                            <span>七天自动登录</span>
                            <a className="forget_password">忘记密码？</a>
                        </div>

                        <div className="log_btn">
                            <button onClick={this.handlerComfirmLogin.bind(this)}>登录</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

let mapStateToProps=state=>({});
let mapDispatchToProps = dispatch=>{ //这里的dispatch相当于store.dispatch()
    return {
        // 把changeTabbarStatus方法映射到props
        changeheaderStatus(info){
            // 改变header的显示与隐藏 这里的header(info)是actions中引进来的
            dispatch(header(info))
		},
		// 把changeTabbarStatus方法映射到props
        changeTabbarStatus(status){
            // 改变tabber的显示与隐藏 这里的tabbar(status)是actions中引进来的
            dispatch(tabbar(status));
        }
    }
}

// mapDispatchToProps 将Dispatch映射到Props里面
Login = connect(mapStateToProps,mapDispatchToProps)(Login);

Login = withRouter(Login);

export {Login}