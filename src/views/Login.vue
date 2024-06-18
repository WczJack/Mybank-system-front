<template>
	<div class="wrapper">
		<header>
			<p>用户登录</p>
		</header>
		<ul class="formbox">
			<li>
				<input type="text" placeholder="请输入手机号" v-model="telephone">
			</li>
			<li>
				<input type="password" placeholder="请输入密码" v-model="password">
			</li>
		</ul>
		<div class="btn">
			<button type="button" @click="login()">登录</button>
		</div>
		<div class="btn">
			<button type="button" id="reg" @click="register()">注册</button>
		</div>
	</div>
</template>

<script setup>
import { inject, reactive, toRefs } from "vue";
import { useRouter } from "vue-router"
import qs from 'qs'
// import SaveSession from '../utils.js'
import Session from '../utils.js'
	const router = useRouter();
	const register=()=>{
		router.push('/register')
	}
	const axios=inject('axios')
	const data=reactive({
		telephone:"",
        password:""
	})
	const {telephone,password}=toRefs(data);
	// 编写手机号和密码验证函数
	const check = (str) => {
		if(str==null||str==''){
			return false;
		}
		return true;
	}
	// 登录函数
	const login=()=>{
		if(!check(data.telephone)){
			alert('手机号必须填写');
			return;
		}
		if(!check(data.password)){
			alert('密码必须填写');
			return;
		}
		axios.post(`${axios.defaults.baseUrl}mobile/login`,qs.stringify({
			telephone:data.telephone,
            password:data.password
        }))
		.then(res=>{
			let responseBean=res.data;
			let code=responseBean.code;
			// alert('测试数据');
            if(code==200){
				let token=responseBean.data;
				console.log(token);
                // 保存token到本地存储或者cookie中
                // SaveSession('token',token);
				Session.saveSession('token',token);
				// 跳转到首页或者其他页面，根据具体业务需求来定
                router.push('/home');
            }else{
                router.push({
					path:'/failure',
					query:{
                        msg:responseBean.msg
                    }
				})
				
            }
		}).catch(error=>{
			Session.dealError(error, router);
		});
	}
</script>

<style scoped>
	.wrapper{
		/* 让div高度和body一样高 */
		height: 100%;
		/* 让div宽度和body一样宽 */
		width: 100%;
		/* 调试样式看边界 */
		/* border: 1px solid black; */
	}
	
	.wrapper header {
		/* header和外围div一样宽 */
		width: 100%;
		/* 该区域的高度 */
		/* 高度单位是vw, 1vw代表视口宽度的1% */
		height: 12vw;
		/* 使用弹性布局样式 */
		display: flex;
		/* 实现文字和字体标签水平居中 */
		justify-content: center;
		/* 实现文字和字体标签垂直居中 */
		align-items: center;
		/* 文字颜色 */
		color: #FFFFFF;
		/* 背景颜色 */
		background-color: #009afe;
		/* 使用固定定位 */
		position: fixed;
		top: 0;
		left: 0;
		/* 保证标题永远在最上层 */
		z-index: 1000;
		/* 设置字号 */
		font-size: 4.8vw;
		
	}
	
	.wrapper .formbox{
		width: 100%;
		margin-top: 12vw;
	}
	
	.wrapper .formbox li{
		/* width: 100%; */
		padding: 4vw 3vw 0 3vw;
	}
	
	.wrapper .formbox li input{
		width: 100%;
		height: 4vw;
		font-size: 4vw;
		border: none;
		outline: none;
		border-bottom: 1px soild #666666;
	}
	
	.wrapper .btn{
		/* 让div宽度和body一样宽 */
		width: 100%;
		padding: 4vw 3vw 0 3vw;
		box-sizing: border-box;
		text-align: center;
	}
	
	.wrapper .btn button{
		/* 让div宽度和body一样宽 */
		width: 100%;
		
		height: 10vw;
		font-size: 3.8vw;
		font-weight: 700;
		background-color: #009afe;
		color: #FFFFFF;
		border: none;
		outline: none;
		border-radius: 4px;
		/* 调试样式看边界 */
		/* border: 1px solid black; */
	}
	
	.wrapper .btn #reg{
		color: #009afe;
		background-color: #FFFFFF;
		border: 2px solid #009afe;
	}
	
	
</style>