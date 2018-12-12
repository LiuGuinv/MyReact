import React,{Component} from 'react';

import '../sass/Classify.scss';

// 引入axios
import axios from 'axios';

class ClassifyRight extends Component{
    constructor(){
        super();
        this.state={
            // 品牌推荐的数据
            brandShowList:[],
            // 其他的数据请求
            list:[]
        }
    }

    componentWillMount(){
        // 品牌推荐的请求------------------------
        // http://mall.guju.com.cn/mobile/index.php?act=brand&op=recommend_list
        axios.get('/api/mobile/index.php?act=brand&op=recommend_list',{
            headers:{
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(res=>{
			// console.log(res.data.datas.brand_list)
            let branddata = res.data.datas.brand_list;
            // console.log(branddata);
			this.setState({
                brandShowList:branddata
            })
        });

        
        // 其他的请求数据------------------
        // 家具
        // http://mall.guju.com.cn/mobile/index.php?act=goods_class&op=get_child_all&gc_id=1807
        // 硬装
        // http://mall.guju.com.cn/mobile/index.php?act=goods_class&op=get_child_all&gc_id=1855
        // 卫浴
        // http://mall.guju.com.cn/mobile/index.php?act=goods_class&op=get_child_all&gc_id=1856
        // 儿童家具
        // http://mall.guju.com.cn/mobile/index.php?act=goods_class&op=get_child_all&gc_id=1854
        // 主材包
        // http://mall.guju.com.cn/mobile/index.php?act=goods_class&op=get_child_all&gc_id=1995
        
        axios.get('/api/mobile/index.php?act=goods_class&op=get_child_all&gc_id=1807',{
            headers:{
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(res=>{
            let otherdata = res.data.datas.class_list;
            console.log(otherdata);
            let list = otherdata.map(item=>{
                return {
                    gc_name:item.gc_name,
                    child:item.child.map(it=>it.gc_name)
                }
            });

            console.log(list)
            this.setState({
                list
            })
        })

    }
    
    render(){
        return <div id="brand_right">
            {/* 品牌推荐显示的内容 */}
            {/* <ul className="recommend_brand">
                {
                    this.state.brandShowList.map((brand_lists,idx)=>(
                        <li key={idx}>
                            <img src={brand_lists.brand_pic} />
                            <p>{brand_lists.brand_name}</p>
                        </li>
                    ))
                }
            </ul> */}
            {/* 其他部分显示的内容 */}
            <div className="other_list">
                {
                    this.state.list.map((otherlists,index)=>{
                       return  <div key={index}>
                            <p>{otherlists.gc_name}</p>
                            
                            <div className="child">
                                {
                                    otherlists.child.map((lists,idx)=>{
                                        return <a key={idx}>{lists}</a>
                                    })
                                }
                            </div>

                        </div>
                    })
                }

            </div>
            
        </div>
    }
}

export {ClassifyRight};