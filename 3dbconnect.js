// 查看mongoose官网

//引入数据库
const mongoose=require('mongoose');
//连接数据库	 gujuuser是数据库名,是存在的
mongoose.connect('mongodb://localhost:27017/gujuuser', { useNewUrlParser: true });

// 创建数据库对象
let db = mongoose.connection;
// 监听数据库连接错误
db.on('error', ()=>{console.log('connection error:')});
// 监听数据库连接成功
db.on('open', function() {
  console.log("we're connected!")
});
// 监听数据库断开
db.on('disconnected', function() {
  console.log("数据库断开")
});


// schema对象	有几个集合（表）就有几个schema对象
// 创建schema对象
// let Schema = mongoose.Schema;
// 下面是创建一个注册的集合
// 实例化Schema对象
// let userSchema=new Schema({
// 	usname:{type:String,required:true},
// 	uspass:{type:String,required:true}
// type 字段类型  required 是否必须
// })

// 变成数据模型
// 参数1  集合名字（创建后集合名变成复数）  参数2是 schema对象 将schema对象变成model
// let usermodel=mongoose.model('userlogin',userSchema);
// 插入数据	
// console.log(usermodel.insertMany({usname:'kk',uspass:'123'}))
//返回的是Promise对象
// usermodel.insertMany({usname:'hgj',uspass:'123456'})
// .then((data)=>{
// 	// 成功时的处理
// 	console.log(data)
// })
// .catch((err)=>{
// 	// 失败时的处理
// 	console.log(err)
// })

// 查询数据
// usermodel.find()
// .then((data)=>{
//	// 成功时的处理
// 	console.log(data)
// })
// .catch((err)=>{
//	// 失败时的处理
// 	console.log(err)
// })

