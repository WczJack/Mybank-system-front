<template>
	<div class="wrapper">
		<header>
			<i class="fa fa-angle-left fa-2x" @click="back()"></i>
			<p>修改收款方</p>
			<p></p>
		</header>
		<!-- 收款信息填写 -->
		<ul class="accountList">
			<li>
				<input type="text" placeholder="收款人姓名" v-model="realname">
			</li>
			<li>
				<input type="text" placeholder="收款方账号" v-model="accountName">
			</li>
		</ul>
		<!-- 错误提示 -->
		<div class="tip">
			<span>{{msg}}</span>
		</div>
		<div class="editbtn">
			<button type="button" @click="update()">修改</button>
		</div>
		<div class="editbtn">
			<button type="button" @click="remove()">删除</button>
		</div>
	 <Footer></Footer>
	</div>
</template>

<script setup>
	import Session from '../utils.js';
	import {inject,reactive,toRefs} from 'vue';
	import Footer from '../components/footer.vue';
	import { useRouter} from 'vue-router';
	import qs from 'qs';
	const router=useRouter();
	const data=reactive({
		realname:JSON.parse(Session.getSession('recipient')).accountSub.personInfo.realname,
		accountName:JSON.parse(Session.getSession('recipient')).accountSub.accountName,
		msg:''
	})
	const {realname,accountName,msg}=toRefs(data);
	const axios=inject('axios')//注入axios
	const update=()=>{
		let recipient=JSON.parse(Session.getSession('recipient'));
		let id=recipient.id;
		let url=`${axios.defaults.baseUrl}recipient/updateRecipient`;
		axios.post(url,{
			realname:data.realname,
			accountName:data.accountName,
			id:id
		})
		.then(res=>{
			let responseBean=res.data;
			let code=responseBean.code;
			if(code==200){
				router.push('/recipientList');//如果添加成功，则跳转到收款方列表页面。
			}else{
				let msg=responseBean.msg;//获取后端返回的错误提示信息。
				data.msg=msg;//将错误提示信息存储到data对象中。
			}
		})
		.catch(error=>{
			console.log(error);//打印错误信息。
		});
	}
	
	const remove=()=>{
		let recipient=JSON.parse(Session.getSession('recipient'));
		let id=recipient.id;
		let url=`${axios.defaults.baseUrl}recipient/removeRecipient`;
		axios.post(url,qs.stringify({
			recipientId:id
		}))
		.then(res=>{
			let responseBean=res.data;
            let code=responseBean.code;//获取后端返回的错误提示信息。
            if(code==200){//如果删除成功，则跳转到收款方列表页面。
                router.push('/recipientList');//如果添加成功，则跳转到收款方列表页面。
            }
		})
		.catch(error=>{
			console.log(error);//打印错误信息。
		});
	}
	const back=()=>{
		router.push('/recipientList');//如果添加成功，则跳转到收款方列表页面。
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
		background-color: #F5F5F5;
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
		padding: 0 10vw 0 1vw;
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
	.wrapper .accountList{
		width: 100%;
		margin-top: 12vw;
	}
	.wrapper .accountList li{
		width: 100%;
		border-bottom: 2px solid #DDD;
		/* 解决不固定情况 */
		display: flex;
	}
	.wrapper .accountList li input{
		width: 100%;
		height: 8vw;
		font-size: 4vw;
		padding: 2vw;
		/* 去掉轮廓线 */
		border: none;
		outline: none;
	}
	.wrapper .editbtn {
		width: 100%;
		padding: 4vw 3vw 0 3vw;
		box-sizing: border-box;
		
	}
	.wrapper .editbtn button{
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
	/* 提示区样式 */
	.wrapper .tip{
		text-align: center;
		padding: 2vw;
		font-weight: bolder;
		color: red;
	}
</style>