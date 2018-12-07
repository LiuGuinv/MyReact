// 添加商品
export function add(cartsgoods){
    return {
        type:'ADD_TO_CART',
        payload:cartsgoods
    }
}

// 删除商品
export function remove(goods_id){
    return {
        type:'REMOVE_FROM_CART',
        payload:goods_id
    }
}

// 修改商品数量
export function change(goods_id,qty){
    return {
        type:'CHANGE_GOODS_QTY',
        payload:{goods_id,qty}
    }
}