<template>
	<div class="wrapper">
		<header>
			<p>新增关联账号</p>
		</header>
		<!-- 相关账户列表区域 -->
		<ul class="accountList" v-for="item in unRelatedAccountList">
			<li @click="addRelatedAccount(item.id)">
				<div class="account">
					<h3>{{item.accountName}}</h3>
					<p>人民币可用余额:<i class="fa fa-jpy"></i>{{item.balance}}</p>
				</div>
			</li>
		
		</ul>
		<!-- 无关联账户提示区域 -->
		<div id="noResult" v-show="isShow">
			<input type="button" value="无可关联账户,返回上一页" @click="back">
		</div>
		<Footer></Footer>
	</div>
</template>

<script setup>
	import { inject, reactive, toRefs } from 'vue';
	import Footer from '../components/footer.vue'
	import { useRouter } from 'vue-router';
	import Session from '../utils.js';
	import qs from 'qs'
	const axios = inject('axios')
	const router=useRouter();
	const data = reactive({
		unRelatedAccountList:[],
		isShow:true
	});
	const { unRelatedAccountList,isShow } = toRefs(data);
	// 查询未关联账户的函数
	const findUnRelatedAccountByTel = () =>{
		let mobile=Session.parseToken();
		let telephone=mobile.telephone;
		let url=`${axios.defaults.baseUrl}account/findUnRelatedAccountByTel?telephone=`+telephone;
		axios.get(url)
		.then(res=>{
			let responseBean=res.data;
			let code=responseBean.code;
			// alert('未关联函数')
			if(code == 200){
				data.unRelatedAccountList=responseBean.data;
				data.isShow=false;//有数据，不显示提示信息
			}
		})
		.catch(error=>{
			console.log(error);
		});
	}
	// 利用vue生命，载入初始化函数
	const init=()=>{
		findUnRelatedAccountByTel();
	}
	init();
	const back=()=>{
		router.push('/accountList');
	}
	const addRelatedAccount=(accountId)=>{
		console.log("accountId"+accountId);
		let mobile=Session.parseToken();
		let telId=mobile.id;
		let url=`${axios.defaults.baseUrl}mobileaccount/addRelatedAccount`;
		axios.post(url,qs.stringify({
			telId:telId,
	        accountId:accountId
		}))
		.then(res=>{
			let responseBean=res.data;
			let code=responseBean.code;
            if(code == 200){//添加成功，跳转到账户列表页面，并提示添加成功信息。
            	router.push('/accountList');//跳转到账户列表页面。
            }
		})
		.catch(error=>{
			console.log(error);
		})
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
		display: flex;
		/* 平均分配标签之间的距离 */
		justify-content: center;
		align-items: center;
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
		border: 1px solid #DADADA;
		margin-bottom: 2vw;
		background-color: #FFFFFF;
	}
	
	.wrapper .accountList li .account{
		width: 100%;
	}
	
	.wrapper .accountList li .account h3{
		font-size: 4.6vw;
		/* 粗细 */
		font-weight: 300;
		color: #666;
		padding: 2vw;
		
	}
	
	.wrapper .accountList li .account p{
		font-size: 4vw;
		color: #666;
		padding: 0 0 2vw 2vw;
	}
	
	.wrapper #noResult{
		margin-top: 15vw;
	}
	
	.wrapper #noResult input{
		width: 100%;
		height: 10vw;
		font-size: 3.8vw;
		font-weight: 700;
		color: #FFFFFF;
		background-color: #009afe;
		/* 圆角 */
		border-radius: 4px;
		/* 去掉外围边框线 */
		border: none;
		/* 去掉外围轮廓线 */
		outline: none;
	}
	
</style>