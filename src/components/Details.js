import React,{Component} from 'react';
// 引入样式
import '../sass/Details.scss';

// 引入
import {connect} from 'react-redux';
import {header,tabbar,cart} from '../actions';

import axios from 'axios';

//引入fontawesome字体图标
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft,faShoppingCart,faEllipsisH,} from '@fortawesome/free-solid-svg-icons';
//faHome等是使用的图标的名称

library.add(faChevronLeft,faShoppingCart,faEllipsisH)



class Details extends Component{
	constructor(){
		super();
		this.state={
			toplist:['商品','详情','评价'],
			currenTop:0,
			// 店铺推荐
			recommendList:[],
			// 从首页传过来的数据
			details_list:{}
		}
	}

	
   	handlerClicklist(idx){
		this.setState=({
			currenTop:idx
		})
   	}
	
	clickJump(){
		// 点击返回上一个页面
		window.history.back();
	}

   	componentWillMount(){
		this.props.changeheaderStatus({headerStatus:false,headerTitle:""});
		this.props.changeTabbarStatus(false);

		// 从首页传过来的商品信息
		// console.log('details_listprops:',this.props)
		let {state:details_list} = this.props.location;
		// 判断是否传入商品
		if(details_list){
			//本地存储商品信息（从首页传进来的），是为了刷新页面后商品信息不见
			localStorage.setItem('details_list',JSON.stringify(details_list))
		}else{
			// 获取本地商品信息
			details_list = JSON.parse(localStorage.getItem('details_list'))
		}

		this.setState({
			details_list
		})


		// 请求店铺推荐的数据
		// http://mall.guju.com.cn/mobile/index.php?act=goods&op=goods_detail&goods_id=105581&key=
		axios.get('/api/mobile/index.php?act=goods&op=goods_detail&goods_id=105581&key=',{
            headers:{
                // 'Content-Type':'application/sx-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(res=>{
			// console.log(res.data.datas.goods_commend_list)
            let data = res.data.datas.goods_commend_list;
            // console.log(data);
			this.setState({
                recommendList:data
            });
        })

	}

	componentWillUnmount(){
		this.props.changeheaderStatus({headerStatus:true,headerTitle:""});
		this.props.changeTabbarStatus(true);
	}

	// 点击添加购物车
	handlerAddToCart(details_list){
		// console.log(this.props);
		let has = this.props.cartlist.filter(item=>{
			return item.goods_id == details_list.goods_id
		});
		if(has.length){
			// 如果存在了该商品，商品数量就+1
			this.props.changeQty(details_list.goods_id,++details_list.qty)
		}else{
			//如果没有，就添加该商品到购物车中
			details_list.qty = 1;
			this.props.addToCart(details_list)
		}
	}

	// 点击跳转购物车
	handlderGoToMycart(path){
		this.props.history.push(path)
	}

	render(){
		let {details_list} = this.state;
		let path = '/cart';
		return (
			<div id="details">
				{/* 头部 */}
				<div className="details_top">
					<a className="back" onClick={this.clickJump.bind(this)}>
						<FontAwesomeIcon icon="chevron-left" className="icons"/>
					</a>
					<ul>
						{
							this.state.toplist.map((List,idx)=>(
								<li key={idx} onClick={this.handlerClicklist.bind(this,idx)}>
									<span className={this.state.currenTop===idx?'spanStyle':''}>{List}</span>
									<i className={this.state.currenTop===idx?'iStyle':''}></i>
								</li>
							))
						}
					</ul>
					<a className="right">
						<FontAwesomeIcon icon="ellipsis-h" className="icons"/>
					</a>
				</div>
				
				{/* 中间商品 */}
				<div className="details_container">
					<img src={details_list.goods_image}/>
					<div className="goods_info">
						<div className="info_top">
							<p>
								<span className="d_title">市场价：￥</span>
								<span className="d_price">{details_list.goods_price}</span>
							</p>
							<a>收藏</a>
						</div>
						<div className="info_center">
							<p className="about">
								<span className="goods_name">{details_list.goods_name}</span>
								<span className="right">店铺预售</span>
							</p>
							<p className="small">
								<span>快递：免运费</span>
								<span className="right">产地 ：广东-佛山</span>
							</p>
						</div>
						<div className="info_bottom">
							<p>选择：
								<span>默认</span>
							</p>
							<i className="iconfont icon-jiantou"></i>
						</div>
					</div>

					{/* 店铺 */}
					<div id="goods_shop">
						<div className="shop_top">
							<h6>谷居自营店</h6>
							<div>
								<a className="all_goods">全部商品</a>
								<a className="your_shop">进入店铺</a>
							</div>
						</div>
						<div className="shop_info">
							<p>
								描述相符
								<span>4.9</span>
								<i>平</i>
							</p>
							<p>
								服务态度
								<span>5.0</span>
								<i>平</i>
							</p>
							<p>
								发货速度
								<span>5.0</span>
								<i>平</i>
							</p>
						</div>
					</div>

					{/* 店铺推荐 */}
					<div id="shop_recommend">
						<p>店铺推荐</p>
						<ul>
							{
								this.state.recommendList.map((list,idx)=>(
									<li key={idx}>
										<img src={list.goods_image_url} />
										<h6>{list.goods_name}</h6>
										<p>￥<span>{parseInt(list.goods_price)}</span></p>
									</li>
								))
							}
						</ul>
					</div>

				</div>
				

				{/*  底部 */}
				<div className="details_bottom">
					<a className="de_cart" onClick={this.handlderGoToMycart.bind(this,path)}>
						<FontAwesomeIcon icon="shopping-cart" className="cart_icons"/>
						<i>{this.props.cartQty}</i>
						<p>购物车</p>
					</a>
					<a className="add_cart"  onClick={this.handlerAddToCart.bind(this,details_list)} >
						加入购物车
					</a>
					<a className="buy">
						立即购买
					</a>
				</div>
			</div>
		)
	}
}


let mapStateToProps = state =>{
	return {
		cartlist:state.cartReducer.goodslist,
		// 映射购物车商品数量到props
		cartQty:state.cartReducer.goodslist.length
	}
}

let mapDispatchToProps = dispatch=>{ //这里的dispatch相当于store.dispatch()
    return {
        // 把changeheaderStatus方法映射到props
        changeheaderStatus(info){
            // 改变header的显示与隐藏 这里的header(info)是actions中引进来的
            dispatch(header(info))
		},
		// 把changeTabbarStatus方法映射到props
        changeTabbarStatus(status){
            // 改变tabber的显示与隐藏 这里的tabbar(status)是actions中引进来的
            dispatch(tabbar(status));
		},
		addToCart(details_list){
			// 添加购物车
			dispatch(cart.add(details_list))
		},
		changeQty(goods_id,qty){
			// 改变商品数量
			dispatch(cart.change(goods_id,qty))
		}
    }
}

// mapDispatchToProps 将Dispatch映射到Props里面
Details = connect(mapStateToProps,mapDispatchToProps)(Details);


export {Details};