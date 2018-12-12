//将schema对象变成model
const mongoose=require('mongoose');
// schema对象	有几个集合（表）就有几个schema对象
// 创建schema对象
let Schema = mongoose.Schema;
// 下面是创建一个注册的集合
// 实例化Schema对象
let userSchema=new Schema({
	nickname:{type:String,required:true},
	usname:{type:String,required:true},
	uspass:{type:String,required:true}
// type 字段类型  required 是否必须
})

// 变成数据模型
// 参数1  集合名字（创建后集合名变成复数）  参数2是 schema对象 将schema对象变成model
let usermodel=mongoose.model('userinfo',userSchema);

//抛出模型
module.exports=usermodel;

