import React,{Component} from 'react';

// 引入react-redux的connect方法
import {connect} from 'react-redux';

//引入fontawesome字体图标
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
//faHome等是使用的图标的名称

library.add(faEllipsisH)

class Header extends Component{
    render(){
        return (<div id="Header" style={{display:this.props.headerInfo.headerStatus===true?'block':'none'}}>
            <div className="header">
                <div className="title">{this.props.headerInfo.headerTitle}</div>
                <div className="right">
                    <FontAwesomeIcon icon="ellipsis-h" />
                </div>
            </div>
        </div>
        )
    }
}

// mapStateToProps是一个函数
// state就是之前通过store.getState()获得的数据
let mapStateToProps = state=>{
    // 映射什么就写什么
    // 此处必须返回一个对象
    // console.log(state);
    return {
        //把state.commonReducer.headerInfo映射到props
        headerInfo:state.commonReducer.headerInfo
    }
}
  
// connect方法的用法 connect执行完之后会返回一个函数
// mapStateToProps 将state中的数据映射到UI组件的props
Header = connect(mapStateToProps)(Header);
  


export {Header};