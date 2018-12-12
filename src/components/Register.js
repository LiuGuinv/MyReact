import React,{Component} from 'react';

import '../sass/Register.scss';

import {List, InputItem} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

import axios from 'axios';

// 引入
import {connect} from 'react-redux';
import {header,tabbar} from '../actions';

//引入fontawesome字体图标
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
//faHome等是使用的图标的名称

library.add(faChevronLeft)

class Register extends Component{
    componentDidMount(){
		this.props.changeheaderStatus({headerStatus:false,headerTitle:""});
        this.props.changeTabbarStatus(false);
    }

    componentWillUnmount(){
		this.props.changeheaderStatus({headerStatus:true,headerTitle:""});
		this.props.changeTabbarStatus(true);
	}

    handlerGotoback(){
        window.history.back()
    }

    // 点击注册时
    handlerComfirmReg(){
        let usrnickname = document.querySelectorAll("#reg .reg_info .am-list-item .am-input-control input")[0].value;
        let phone = document.querySelectorAll("#reg .reg_info .am-list-item .am-input-control input")[1].value;
        let password = document.querySelectorAll("#reg .reg_info .am-list-item .am-input-control input")[2].value;
        // console.log(typeof(phone));
        // 去掉号码里的空格
        let newphone = phone.replace(/\s*/g,"");
        // console.log(newphone);
        axios.post('/userapi/user/register', {
            nickname: usrnickname,
            usname: newphone,
            uspass: password
        })
        .then((res)=>{
            // console.log(res)
            alert(res.data)
        })
        .catch((error)=>{
            // console.log(error)
            alert(error.data)
        })
    }

    render(){
        return(
            <div id="reg">
                <div className="reg_header">
                    <a className="Gotoback" onClick={this.handlerGotoback.bind(this)}>
                        <FontAwesomeIcon icon="chevron-left" className="reg_icons"/>
                    </a>
                    <h6>注册</h6>
                    <a className="isComfirm">确定</a>
                </div>
                
                <div className="reg_info">
                        <List>
                            <InputItem
                                type="text"
                                placeholder="请设置你的用户名" 
                                clear={true} 
                                className="reg_name"
                            >昵称</InputItem>
                            <InputItem
                                type="phone"
                                placeholder="你的手机号" 
                                clear={true} 
                                className="reg_phone"
                            >手机号</InputItem>
                            <InputItem
                                type="password"
                                placeholder="请设置密码"
                                clear={true} 
                                className="reg_password"
                            >密码</InputItem>
                        </List>

                        <div className="reg_btn">
                            <button onClick={this.handlerComfirmReg.bind(this)}>注册</button>
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
Register = connect(mapStateToProps,mapDispatchToProps)(Register);

Register = withRouter(Register);

export {Register};