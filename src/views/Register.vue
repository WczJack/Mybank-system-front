<template>
	<div class="wrapper">
		<header>
			<i class="fa fa-angle-left fa-2x" @click="back()"></i>
			<p>自助注册</p>
			<!-- 将来header使用弹性布局，令交易记录居中布局 -->
			<p></p>
		</header>
		<!-- 表单区域 -->
		<ul class="formbox">
			<li>
				<div class="content">
					<input type="text" placeholder="请输入手机号" v-model="telephone">
				</div>
			</li>
			<li>
				<div class="content">
					<input type="text" placeholder="请输入短信验证码" v-model="code">
					<button type="button" @click="getCode()">获取验证码</button>
				</div>
			</li>
		</ul>
		<div class="btn">
			<button type="button" @click="subCode()">下一步</button>
		</div>
	</div>
</template>

<script setup>
	import {reactive, toRefs, inject} from "vue"
	import { useRouter } from "vue-router"
	import qs from "qs"
	const data = reactive({
		telephone:'',
		code:''
	})
	const {
		telephone,
		code
	}=toRefs(data);
	
	const axios=inject('axios');
	const router=useRouter();
	
	// 验证手机号是否正确
	const checkTel=()=>{
		if(data.telephone==null||data.telephone==''){
			alert('请填写手机号')
			return false;
		}
		// 判断手机号长度是否小于11位
	if(data.telephone.length<11){
			// 如果小于11位，弹出提示框
			alert('手机号不足11位')
			// 返回false
			return false;
		}
	let telExp = /^(13[0-9]|14[01456789]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;	
	if(!telExp.test(data.telephone)){
		alert('手机号不符合移动通讯手机规范');
		return false;
	}
	return true;
	
	}
	
	// 获取后端验证码
	const getCode=()=>{
		// 调用验证手机号函数，如果手机号不正确，不发送请求，直接返回false
		if(!checkTel()){
			return;
		}
		
		axios.get(`${axios.defaults.baseUrl}mobile/sendCode?telephone=`+data.telephone)
		.then(Response=>{
			let responseBean=Response.data;
			if(responseBean.code==200){
				// 获取后端发送的全局响应数据对象
				let checkCode=responseBean.data;
				alert('短信验证码为：'+checkCode+'，请在2分钟之内使用');
			}else{
				alert(responseBean.msg);
			}
		})
		.catch(Error=>{
			console.log(Error);
		})
	}
	// 检查验证码格式
	const checkCode=()=>{
    if(data.code==null||data.code==''){
      alert('请填写验证码');
      return false;
    }else if(data.code.length<4){
      alert('验证码长度必须为4位');
      return false;
    }else if(!/^\d{4}$/.test(data.code)){
      alert('验证码只能为数字');
      return false;
    }else{
      return true;
    }
  }
  // 向后端提交验证码的函数
  const subCode=()=>{
	  if(!checkTel()){
	  	return;
	  }
	  if(!checkCode()){
	  	return;
	  }
	  axios.post(`${axios.defaults.baseUrl}mobile/checkCode`,qs.stringify({
		  telephone:data.telephone,
          code:data.code
	  }))
	  .then(res=>{
		  let responseBean=res.data;
		 
        if(responseBean.code==200){// 验证码正确，跳转到下一步页面，并将手机号作为参数传递给下一步页面
          router.push({
			  path:'/password',
			  query:{
				  telephone:data.telephone,
				  },
			});
        }else{// 验证码错误，提示用户重新输入验证码或重新获取验证码
          alert(responseBean.msg);
        }
	  })
	  .catch(error=>{
		  console.log(error);
	  });
  }
	const back=()=>{
    router.push('/login');
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
		/* 整体背景颜色 */
		background-color: #FFFFFF;
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
	.wrapper .formbox{
		padding: 4vw 3vw 0 3vw;
	
	}
	
	.wrapper .formbox li .content input{
		border: none;
		outline: none;
		height: 4vw;
		font-size: ;
	}
	
	.wrapper .formbox li .content button{
		font-size: 4vw;
		color: #009afe;
		background-color: #FFFFFF;
		border: 1px solid #009afe;
	}
	
	.wrapper .btn{
		width: 100%;
		padding: 4vw 3vw 0 3vw;
		box-sizing: border-box;
	}
	.wrapper .btn button{
		width: 100%;
		height: 10vw;
		font-size: 3.8vw;
		font-weight: 700;
		background-color: #009afe;
		color: #FFFFFF;
		border: none;
		outline: none;
		border-radius: 4px;
	}
</style>