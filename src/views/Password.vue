<template>
	<div class="wrapper">
		<header>
			<i class="fa fa-angle-left fa-2x"></i>
			<p>密码确认</p>
			<p></p>
		</header>
		<ul class="formbox">
			<li>
				<input type="password" placeholder="请输入密码" v-model="firstPassword">
			</li>
			<li>
				<input type="password" placeholder="请再次输入密码" v-model="secondPassword">
			</li>
		</ul>
		<div class="btn">
			<button type="button" @click="reg">注册</button>
		</div>
	</div>
</template>

<script setup>
	import qs from 'qs';
	import {reactive,toRefs, inject} from "vue"
	import { useRouter,  useRoute} from "vue-router"
	const axios=inject('axios');
	const router=useRouter();
	const route=useRoute();
	const data=reactive({
		firstPassword: "", // 第一次输入的密码
        secondPassword: "", // 第二次输入的密码
		telephone: route.query.telephone, // 电话号码，从URL参数中获取，也可以从其他地方获取
        
	})
	const {
		firstPassword, 
		secondPassword, 
		telephone, 
		// 电话号码，从URL参数中获取，也可以从其他地方获取，
		// 这里假设已经获取到了电话号码，并且保存在了data.telephone中。
	}=toRefs(data); // 解构出data中的属性，并将其转换为响应式对象。
   
   // 检查函数
   const checkPassword = () => {
	   if(data.firstPassword==null||data.firstPassword==''){
		   alert('密码不能为空');
		   return false;
	   }
	   if(data.secondPassword==null||data.secondPassword==''){
		   alert('密码不能为空');
		   return false;
	   }
	   if(data.firstPassword!=data.secondPassword){
	   	   alert('两次输入的密码必须相等');
		   return false;
	   }
	   return true;
   }
   // 向后端提交手机号和密码的函数
   const reg=()=>{
	   if(!checkPassword()){
		   return;
	   }
	   axios.post(`${axios.defaults.baseUrl}mobile/regMobile`,qs.stringify({
		   telephone:data.telephone, // 电话号码，从URL参数中获取，也可以从其他地方获取，这里假设已经获取到了电话号码，并且保存在了data.telephone中。
           password:data.firstPassword, // 第一次输入的密码，这里假设已经获取到了，并且保存在了data.firstPassword中。
	   }))
	   .then(Response=>{
		   let responseBean=Response.data;
		   let code=responseBean.code; // 响应码，用于判断请求是否成功。
		   if(code==200){
			   router.push({
				   path: '/success', // 跳转到登录页面。
                   query: { telephone: data.telephone } // 传递电话号码到登录页面。
			   })
		   }
	   })
	   .catch(error=>{
		   // 获取后端异常状态下的响应对象。
		   let response=error.response; 
		   // response不为null
           if(response){
			   let responseBean=response.data; // 获取响应体。
               // alert(responseBean.msg); // 弹出错误信息。
			   router.push({
			  	  path: '/failure', // 跳转到登录页面。
			      query: { msg:responseBean.msg } 
			   })
			   }
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
	
	/* 标题区样式 */
	.wrapper header{
		width: 100%;
		height: 12vw;
		/* border: 1px solid black; */
		display: flex;
		/* 平均分配标签之间的距离 */
		justify-content: space-between;
		align-items: center;
		/* 内边距 */
		padding: 0 5vw 0 1vw;
		/* 保持div宽度不变 边框盒子模型 */
		box-sizing: border-box;
	
		color: #F5F5F5;
		background-color: #009afe;
		/* 使用固定定位 */
		position: fixed;
		top: 0;
		left: 0;
		/* 保证标题永远都在最上层 */
		z-index: 1000;
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
	
	
	
</style>