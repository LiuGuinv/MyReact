//创建路由模块
const express=require('express');
const Router=express.Router();
// 引入Schema数据模型
const userModel=require('../model/4userModel.js');

//使用路由
// 注册
Router.post('/register',(req,res)=>{
	let {nickname,usname,uspass}=req.body;

	userModel.find({usname})
	.then((data)=>{
		console.log(data);
		if(data.length>=1){//1表示数据库存在这个用户
			res.send('该用户已存在')
		}else{
			userModel.insertMany({nickname,usname,uspass})
			.then((data)=>{
				// 注册成功时的处理
				res.send('注册成功，请登录')
				// console.log(data)
			})
			.catch((err)=>{
				// 注册失败时的处理
				res.send('注册失败')
				console.log(err)
			})
		}
	})
	
})


//登录
Router.post('/login',(req,res)=>{
	let {usname,uspass}=req.body;
	//使用数据模型查询数据
	userModel.find({usname,uspass})
	.then((data)=>{
		// console.log(data);
		if(data.length>=1){//1表示数据库存在这个用户
			res.send('登录成功')
		}
		else{
			res.send('登录失败')
		}
	})
})


//抛出模块
module.exports=Router;