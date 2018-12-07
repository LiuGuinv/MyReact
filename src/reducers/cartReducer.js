// 初始化状态
let initState = {
    // 购物车商品列表
    goodslist:[]
}

let cartReducer = (state=initState,action)=>{
    switch(action.type){
        //添加商品
        case 'ADD_TO_CART':
            return {
                ...state,
                goodslist:[...state.goodslist,action.payload]
            }
        //删除商品
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                goodslist:state.goodslist.filter(cartgoods=>cartgoods.goods_id!==action.payload)
            }
        //修改商品数量
        case 'CHANGE_GOODS_QTY':
            return {
                ...state,
                goodslist:state.goodslist.filter(cartgoods=>{
                    // 需要传入商品id、数量qty
                    if(cartgoods.goods_id === action.payload.goods_id){
                        // 如果传过来的id相等，就是想修改的
                        cartgoods.qty = action.payload.qty
                    }

                    return true; //因为这里用到filter(过滤)，加了true说明这部分不过滤
                })
            }

        default:
            return state;
    }
}

export default cartReducer;
