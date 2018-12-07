// 初始化状态
let initState = {
    // tabber的显示与隐藏
    tabbarStatus:true, //默认显示

    // 头部
    headerInfo:{
        headerStatus:true,//默认显示
        headerTitle:""
    } 
}
let commonReducer = (state=initState,action)=>{
    switch(action.type){
        // tabber
        case 'CHANGE_TABBAR_STATUS':
            return {
                ...state,
                tabbarStatus:action.payload
            }
        // 头部
        case 'CHANGE_HEADER_INFO':
            return {
                ...state,
                headerInfo:action.payload
            }

        default:
            // 什么都没有修改就显示这里
            return state; 
    }
}

export default commonReducer;
