// 关于购物车的actions creater
import * as cart from './cartActions';
//* as cart 等于 {add,remove,change}，就是引入cartAction.js里面的所有函数组件

// 关于头部的显示与隐藏actions
export function header(info){
    return {
        type:'CHANGE_HEADER_INFO',
        payload:info
    }
}

// 关于tabber的显示与隐藏actions
export function tabbar(status){
    return {
        type:'CHANGE_TABBAR_STATUS',
        payload:status
    }
}

export {cart};
