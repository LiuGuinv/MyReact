import React,{Component} from 'react';

// 引入axios用于请求数据 安装：npm install axios --save
import axios from 'axios';

// 用到高阶组件
import {withRouter} from 'react-router-dom';

import '../sass/Homestyle.scss';

// 引入
import {connect} from 'react-redux';
import {header} from '../actions';

// 引入antd-mobile的走马灯
import { Carousel,Grid } from 'antd-mobile';

//引入fontawesome字体图标
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch,faBell} from '@fortawesome/free-solid-svg-icons';
//faHome等是使用的图标的名称

library.add(faSearch,faBell)


class Home extends Component{
    constructor(){
        super();
        this.state = {
            // 走马灯图片
            data: ['1', '2'],
            // 热卖商品列表
            hot_goods:[],
            // 猜你喜欢商品列表
            like_goods:[]
        }

        this.handlerGotoDetails1 = this.handlerGotoDetails1.bind(this);
        this.handlerGotoDetails2 = this.handlerGotoDetails2.bind(this)
    }

    componentWillMount(){
        // http://mall.guju.com.cn/mobile/index.php?act=index
        axios.get('/api/mobile/index.php?act=index',{
            headers:{
                // 'Content-Type':'application/sx-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(res=>{
			// console.log(res.data.datas[2].goods.item)
            let data1 = res.data.datas[2].goods.item;
            // console.log(data1);
			this.setState({
                hot_goods:data1
            });
        });
        

        axios.get('/api/mobile/index.php?act=index&op=youLike',{
            headers:{
                // 'Content-Type':'application/sx-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(res=>{
			// console.log(res.data.datas)
            let data2 = res.data.datas;
            // console.log(data2);
			this.setState({
                like_goods:data2
            });
        });

    }

    componentDidMount() {
        setTimeout(() => {
          this.setState({
            data: [{icon:require('../images/carousel_img/g1.jpg')},
                    {icon:require('../images/carousel_img/g2.jpg')}
                ]
          });
        }, 100);

        this.props.changeheaderStatus({headerStatus:true,headerTitle:"谷居"});
    }

    // 点击商品跳转到对应详情页
    handlerGotoDetails1(goods1){
        // 获取history
        let {history} = this.props;
        // console.log(history)
        history.push({
            pathname:'/details/'+goods1.goods_id,
            state:goods1
        })
    }

    // 点击商品跳转到对应详情页
    handlerGotoDetails2(goods2){
        // 获取history
        let {history} = this.props;
        // console.log(history)
        history.push({
            pathname:'/details/'+goods2.goods_id,
            state:goods2
        })
    }

    render(){
        return <div className="home">
            
            {/* 搜索栏 */}
            <div className="search">
                <div className="s_left">
                    <FontAwesomeIcon icon="search" className="icon1"/>
                    <input type="text" id="s_text" placeholder="森盛" />
                </div>
                <div className="s_right">
                    <FontAwesomeIcon icon="bell"  className="icon2"/>
                </div>
            </div>

            {/* 轮播图 */}
            <div id="slider">
                <Carousel
                    autoplay={true}
                    infinite
                    >
                    {this.state.data.map(val => (
                        <a
                        key={val}
                        href="#"
                        style={{ display: 'inline-block', width: '100%'}}
                        >
                        <img
                            src={val.icon}
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                window.dispatchEvent(new Event('resize'))
                                // this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                </Carousel>
            </div>

            {/* 最新消息 */}
            <div className="news">
                <img src={require("../images/gg_w_2.png")}/>
                <span>最新消息</span>
            </div>

            {/* 导航栏 */}
            <div className="home_nav">
               <ul>
                   <li>
                       <img src={require("../images/nav1.png")} />
                       <p>品牌馆</p>
                   </li>
                   <li>
                        <img src={require("../images/nav2.png")} />
                        <p>家具套餐</p>
                   </li>
                   <li>
                        <img src={require("../images/nav3.png")} />
                        <p>我的订单</p>
                   </li>
                   <li>
                        <img src={require("../images/nav4.png")} />
                        <p>足迹</p>
                   </li>
                </ul>          
            </div>
            
            {/* 商品列表 */}
            <div className="home_list">
                {/* 热卖单品 */}
                <h6>热卖单品</h6>
                <div className="hot_list">
                    <Grid
                        data={this.state.hot_goods} 
                        columnNum={2} //列数
                        activeClassName="active" 
                        itemStyle={{height:'5.90rem'}}
                        renderItem={(goods1,idx)=>{
                            // console.log(goods,idx)
                            return(
                                <div className="goods-item">
                                    <img src={goods1.goods_image} />
                                    <h4>{goods1.goods_name}</h4>
                                    <p className="price">￥ <span>{goods1.goods_price}</span></p>
                                </div>
                            )
                        }}
                        onClick = {this.handlerGotoDetails1}
                    />
                </div>

                {/* 猜你喜欢 */}
                <h6>猜你喜欢</h6>
                <div className="like_list">
                    <Grid
                        data={this.state.like_goods} 
                        columnNum={2} //列数
                        activeClassName="active" 
                        itemStyle={{height:'5.90rem'}}
                        renderItem={(goods2,idx)=>{
                            // console.log(goods,idx)
                            return(
                                <div className="goods-item">
                                    <img src={goods2.goods_image} />
                                    <h4>{goods2.goods_name}</h4>
                                    <p className="price">￥ <span>{goods2.goods_price}</span></p>
                                </div>
                            )
                        }}
                        onClick = {this.handlerGotoDetails2}
                    />
                </div>  

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
Home = connect(mapStateToProps,mapDispatchToProps)(Home);

Home = withRouter(Home);

export {Home};