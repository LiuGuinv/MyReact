import React,{Component} from 'react';

// 引入
import {connect} from 'react-redux';
import {header} from '../actions';

import '../sass/Userstyle.scss';

import {withRouter} from 'react-router-dom';

class User extends Component{

    componentDidMount(){
        this.props.changeheaderStatus({headerStatus:false,headerTitle:""});
    }

    componentWillUnmount(){
        this.props.changeheaderStatus({headerStatus:true,headerTitle:""});
   }

   handlerGotoLogin(path){
    //    console.log(this.props);
    this.props.history.push(path)
       
   }

    render(){
        let path = '/login';
        return <div id="user"> 
            {/* 头部 */}
            <div className="member_top">
                <div className="top_heder">
                    
                </div>

                <div className="top_center">
                    <img src={require("../images/user.png")} onClick={this.handlerGotoLogin.bind(this,path)} />
                    <p>点击登录</p>
                </div>
                
                <ul className="top_bottom">
                    <li>
                        <h6>0</h6>
                        <p>商品收藏</p>
                    </li>
                    <li>
                        <h6>0</h6>
                        <p>店铺收藏</p>
                    </li>
                    <li>
                        <h6>0</h6>
                        <p>我的足迹</p>
                    </li>
                </ul>

            </div>

            {/* 我的订单 */}
            <div className="my_">
                <div className="title">
                    <h6>我的订单</h6>
                    <a>全部</a>
                </div>
                <ul>
                    <li>
                        <i className="iconfont icon-daishoukuan b"></i>
                        <span className="b_">待收款</span>
                    </li>
                    <li>
                        <i className="iconfont icon-icon-test a"></i>
                        <span>待发货</span>
                    </li>
                    <li>
                        <i className="iconfont icon-daishouhuo a"></i>
                        <span>待收货</span>
                    </li>
                    <li>
                        <i className="iconfont icon-daipingjia a"></i>
                        <span>待评价</span>
                    </li>
                    <li>
                        <i className="iconfont icon-shouhoutuikuan a"></i>
                        <span>退款/退货</span>
                    </li>
                </ul>

            </div>

            {/* 我的财产 */}
            <div className="my_">
                <div className="title">
                    <h6>我的财产</h6>
                    <a>全部</a>
                </div>
                <ul>
                    <li>
                        <i className="iconfont icon-yucunkuan b"></i>
                        <span className="b_">预存款</span>
                    </li>
                    <li>
                        <i className="iconfont icon-chongzhiqia a"></i>
                        <span>充值卡</span>
                    </li>
                    <li>
                        <i className="iconfont icon-daijinquan a"></i>
                        <span>代金券</span>
                    </li>
                    <li>
                        <i className="iconfont icon-hongbao a"></i>
                        <span>红包</span>
                    </li>
                    <li>
                        <i className="iconfont icon-jifen a"></i>
                        <span>积分</span>
                    </li>
                </ul>

            </div>

            <div className="alike">
                <p className="borders">
                    <span>收货地址管理</span>
                    <i className="iconfont icon-jiantou"></i>
                </p>
                <p>
                    <span>用户设置</span>
                    <i className="iconfont icon-jiantou"></i>
                </p>
            </div>

        </div>
    }

}


let mapStateToProps=state=>({});
let mapDispatchToProps = dispatch=>{ //这里的dispatch相当于store.dispatch()
    return {
        // 把changeTabbarStatus方法映射到props
        changeheaderStatus(info){
            // 改变header的显示与隐藏 这里的header(info)是actions中引进来的
            dispatch(header(info))
        }
    }
}

// mapDispatchToProps 将Dispatch映射到Props里面
User = connect(mapStateToProps,mapDispatchToProps)(User);


export {User};