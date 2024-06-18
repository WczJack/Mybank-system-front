<template>
	<div class="wrapper">
		<header>
			<i class="fa fa-angle-left fa-2x" @click="back()"></i>
			<p>转账确认</p>
			<!-- 将来header使用弹性布局，令交易记录居中布局 -->
			<p></p>
		</header>
		<!-- 信息确认区 -->
		<ul class="transfer">
			<li>
				<p>转出账户：{{passout.accountName}}</p>
			</li>
			<li>
				<p>收款人姓名：{{passin.personInfo.realname}}</p>
			</li>
			<li>
				<p>转账金额：{{money}}</p>
			</li>
			<li>
				<input type="password" placeholder="支付密码" class="password" v-model="password">
				<span style="color: red;">{{msg}}</span>
			</li>
		</ul>
		<!-- 提交按钮 -->
		<div class="button_sub">
			<button type="button" @click="transfer()">提交</button>
		</div>
		<Footer></Footer>
	</div>
</template>

<script setup>
	import { inject, reactive, toRefs } from 'vue';
	import Footer from '../components/footer.vue'
	import Session from '../utils.js';
	import { useRoute, useRouter } from 'vue-router';
	const route=useRoute();//获取路由参数
	const router=useRouter();
	const axios = inject('axios');	
	const data=reactive({
		// 转入
		passin:{},
		// 转出
		passout:{},
		// 交易金额
		money:route.query.money,//获取路由参数中的money值。
		password:'',
		// 支付密码不匹配的提示信息
		msg:''
	});
    const {passin, passout,money,password,msg} = toRefs(data);//解构出data中的属性，并将其转换为ref响应式对象。
	const init=()=>{
		let passoutStr=Session.getSession('passout');
		let passout=JSON.parse(passoutStr);
        console.log(passout);
		let passinStr=Session.getSession('passin');
        let passin=JSON.parse(passinStr);
		console.log(passin);
		// 给响应式数据中转入、转出方赋值
		data.passin=passin;
        data.passout=passout;
	}
	init();
	const transfer=()=>{
		let url=`${axios.defaults.baseUrl}transfer/trans`;
		axios.post(url,{
			zhuanchu:{
				
				id:parseInt(Session.getSession('accountId')),
				
				balance:parseInt(data.money),
				password:data.password
			},
			zhuanru:{
				id:data.passin.id,
                balance:parseInt(data.money)
			}
		})
		.then(res=>{
			let responseBean=res.data;
			let code=responseBean.code;
			
			if(code == 200){//添加成功，跳转到账户列表页面，并提示添加成功信息。
		
				Session.removeSession('passin');
				Session.removeSession('passout');
				router.push('/success');
			}else{
				data.msg=responseBean.msg;//提示信息。
			}
		})
		.catch(error=>{
			let response=error.response;//获取响应信息。
			if(response){
				let responseBean=response.data;//获取响应信息中的数据。
                let msg=responseBean.msg;//提示信息。
				// router.push({
				// 	path:'/failure',
				// 	query:{
				// 		msg:msg,
				// 	}
				// });
			}
           
		})
	}
	const back=()=>{
		router.push('/transferOp');//返回上一页。
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
	
	.wrapper .transfer{
		width: 100%;
		margin-top: 12vw;
	}
	
	.wrapper .transfer li{
		margin-bottom: 2vw;
		background-color: #FFFFFF;
		padding: 2vw;
	}
	
	.wrapper .transfer li p{
		font-size: 4vw;
	}
	.wrapper .transfer li .password{
		border: none;
		outline: none;
		font-size: 4vw;
		border-bottom: 1px solid #dedede;
	}
	.wrapper .button_sub{
		width: 100%;
		padding: 4vw 3vw 0 3vw;
		box-sizing: border-box;
	}
	
	.wrapper .button_sub button{
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