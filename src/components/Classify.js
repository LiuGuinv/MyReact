import React,{Component} from 'react';

// 引入axios用于请求数据 安装：npm install axios --save
// import axios from 'axios';

// 引入
import {connect} from 'react-redux';
import {header} from '../actions';

import '../sass/Classify.scss';

class Classify extends Component{
    constructor(){
        super();
        this.state={
            ullist:[
                '品牌推荐','家具','硬装','卫浴','儿童家具','主材包'
            ],
            // 默认索引
            currentLi:0
        }
    }

    // 点击切换
    handlerClick(index){
        this.setState({
            currentLi:index
        })
        // console.log(111)
    }

    // componentWillMount(){
    //     this.setState({
    //         currentLi:0
    //     })
    // }

    componentDidMount(){
        this.props.changeheaderStatus({headerStatus:true,headerTitle:"分类"});
    }

    render(){
        return (<div id="classify">
                <div className="class_left">
                    <ul>
                        {
                            this.state.ullist.map((list,index)=>(
                                <li key={index} onClick={this.handlerClick.bind(this,index)}>
                                    <i className={this.state.currentLi===index?'i_active':''}></i>
                                    <span className={this.state.currentLi===index?'span_active':''}>{list}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                
                <div className="class_right">
                    
                </div>
        </div>)
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
Classify = connect(mapStateToProps,mapDispatchToProps)(Classify);


export {Classify};