//搭建服务器第一步，需下载并引入第三方模块express
const express=require('express');
const app=express();
//引入路由模块
const user=require('./router/2user.js');
//post方法需要用到的第三方模块
const bodyParser=require('body-parser');
// 引入数据库
const db=require('./3dbconnect.js');
// 引入path，静态文件用到
const path=require('path');
// 引入第三方模块实现服务器代理
const proxy =require('http-proxy-middleware');


// 静态文件开启
app.use(express.static(path.join(__dirname,'./public')));

// 允许所有域名跨域
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	
	// 跨域请求CORS中的预请求
	if (req.method == "OPTIONS"){
		res.send(200); //让options请求快速返回
	}
	else{
		next();
	} 
});

//bodyParser中的两种post参数解析
//解析 parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//解析 parse application/json
app.use(bodyParser.json())

//使用路由模块
app.use('/userapi/user',user);

// 设置代理
app.use(
    "/api",proxy({
        "target":"http://mall.guju.com.cn",
        "changeOrigin":true,
        "pathRewrite":{
            "^/api":"/"
    }
}))


//测试服务器搭建是否成功
// app.get('/login',(req,res)=>{
// 	res.send('234')
// })

//监听端口号8009
app.listen(8009,()=>{
	console.log('server start in port'+8009);
})
