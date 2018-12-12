import React,{Component} from 'react';

import '../sass/Cart.scss';

import {withRouter} from 'react-router-dom';

// 引入
import {connect} from 'react-redux';
import {header,cart} from '../actions';
// import {cart as cartAction} from '../actions';

import {List,Stepper,Icon} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class Cart extends Component{
    constructor(){
        super();
        this.state={
            // 从详情页传过来的数据
			cart_lists:{}
        }
    }

    componentWillMount(){
        // console.log('cart_listinfo:',this.props);
        // let {goodslist} = this.props.match;

        // 判断是否传入商品
		// if(goodslist){
		// 	//本地存储商品信息（从首页传进来的），是为了刷新页面后商品信息不见
		// 	localStorage.setItem('goodslist',JSON.stringify(goodslist))
		// }else{
		// 	// 获取本地商品信息
		// 	goodslist = JSON.parse(localStorage.getItem('goodslist'))
		// }

		// this.setState({
		// 	goodslist
		// })

    }

    componentDidMount(){
        this.props.changeheaderStatus({headerStatus:true,headerTitle:"购物车"});
    }

    handlerGotoshop(path){
        // console.log(this.props);
        this.props.history.push(path)
    }

    render(){
        let path = '/home';
        return (<div id="cart">
            {/* 未登录时显示的页面 */}
            <div className="cart_center" style={{display:"none"}}>
                <img src={require("../images/cart.png")} />
                <h4>您的购物车还是空的</h4>
                <p>去挑一些中意的商品吧</p>
                <a onClick={this.handlerGotoshop.bind(this,path)}>随便逛逛</a>
            </div>

            {/* 已登录时显示的页面 */}
            <div className="cart_goods">
                
                <List>
                    {
                        this.props.goodslist.map(goods=>{
                            let qty = goods.qty;
                            return <Item
                                key={goods.goods_id}
                                thumb={goods.goods_image}
                                // 删除商品
                                extra={<Icon type="cross" onClick={this.props.remove.bind(this,goods.goods_id)}/>}
                            >
                                {goods.goods_name}
                                <Brief>价格：<span className="price">{goods.goods_price}</span></Brief>
                                <Stepper showNumber size="small" value={qty} onChange={this.props.changeQty.bind(this,goods.goods_id,qty)} />
                            </Item>
                        })
                    }
                </List>

            </div>

        </div>)
    }
}

let mapStateToProps = state=>{
    return {
        // 把购物车数量显示到购物车页面
        // 把state.cartReducer.goodslist映射到props中
        goodslist:state.cartReducer.goodslist
    }
}

let mapDispatchToProps = dispatch=>{ //这里的dispatch相当于store.dispatch()
    return {
        // 把changeTabbarStatus方法映射到props
        changeheaderStatus(info){
            // 改变header的显示与隐藏 这里的header(info)是actions中引进来的
            dispatch(header(info))
        },
        remove(goods_id){
            // 删除
            dispatch(cart.remove(goods_id))
        },
        changeQty(goods_id,qty){
            // 修改数量
            // console.log(goods_id,qty)
            dispatch(cart.change(goods_id,qty))
        }
    }
}

// mapDispatchToProps 将Dispatch映射到Props里面
Cart = connect(mapStateToProps,mapDispatchToProps)(Cart);

Cart = withRouter(Cart);

export {Cart};