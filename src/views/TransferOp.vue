<template>
	<div class="wrapper">
		<header>
			<i class="fa fa-angle-left fa-2x" @click="back()"></i>
			<p>转账操作</p>
			<p></p>
		</header>
		<!-- 转账操作的信息部分 -->
		<ul class="transfer">
			<!-- 转出 -->
			<li>
				<p>您的转出账户</p>
				<div class="account">
					<p>{{passout.accountName}}</p>
				</div>
				<p>当前余额：<i class="fa fa-jpy"></i>{{passout.balance}}</p>
			</li>
			<!-- 转入 -->
			<li>
				<p>选择收款人</p>
				<div class="account">
					<p>收款人姓名：{{passin.personInfo.realname}}</p>
					<i class="fa fa-angle-right" @click="selectpassin()"></i>
				</div>
				<p>转入账号：{{passin.accountName}}</p>
			</li>
			<!-- 交易金额 -->
			<li>
				<p>交易金额</p>
				<div class="balance">
					<p>请选择金额，也可以输入其他金额</p>
					<div class="btn">
						<button type="button" id="copyButton" @click="selectMoney(500)">500</button>
						<button type="button" id="copyButton" @click="selectMoney(1000)">1000</button>
						<button type="button" id="copyButton" @click="selectMoney(1500)">1500</button>
						<button type="button" id="copyButton" @click="selectMoney(5000)">5000</button>
					</div>
					<div class="money">
						<input type="number" id="inputBox" placeholder="其他金额">
						<span style="color: red;" v-show="isShow">{{tip}}</span>
					</div>
				</div>
			</li>
		</ul>
		<!-- 下一步按钮操作 -->
		<div class="button_next">
			<button type="button" @click="compare()">下一步</button>
		</div>
		
		<Footer></Footer>
	</div>
</template>

<script setup>
	import { inject, reactive, toRefs } from 'vue';
    import Footer from '../components/footer.vue'
	import { useRouter} from 'vue-router';
    import Session from '../utils.js';
	const router=useRouter();//获取路由实例。
	const axios=inject('axios')
	const data=reactive({
		passout:{},
		passin:{
			accountName:'',//收款人姓名。
            personInfo:{
				realname:''
			}
		},
		money:0,
		// 交易金额小于余额
		tip:'金额错误',
		isShow:false
	})
	const{passout,passin,money,tip,isShow}=toRefs(data);
	// 按ID查询账户信息。
	const searchByAccountId=()=>{
		let accountId=Session.getSession('accountId');
		let url=`${axios.defaults.baseUrl}account/searchByAccountId?accountId=`+accountId;
		axios.get(url)
		.then(res=>{
			let responseBean=res.data;
			let code=responseBean.code;//获取后端返回的错误提示信息。
			if(code==200){//如果删除成功，则跳转到收款方列表页面。
				
				let passout=responseBean.data;
				Session.saveSession('passout',JSON.stringify(passout));
			    data.passout=responseBean.data;//获取后端返回的数据。
			}
		})
		.catch(error=>{
			console.log(error);//打印错误信息。
		});
	}
	const init=()=>{
		searchByAccountId();//查询账户信息。
		let passinStr=Session.getSession('passin');
		if(passinStr!=null){
			data.passin=JSON.parse(passinStr);
		}
	}
	init()
	const selectpassin=()=>{
		router.push('/recipientListForSelect');//跳转到passout页面。
	}
	const selectMoney=(num)=>{
		let inputBox = document.getElementById('inputBox');
		inputBox.value = num;
		data.money=num;
	}
	const compare=()=>{
		let inputBox = document.getElementById('inputBox');
		data.money=inputBox.value;//获取输入框的值。

		if(data.passout.balance>data.money&&data.money>0){
			Session.saveSession('passin',JSON.stringify(data.passin));
			// 前往转账确认界面
			router.push({
				path:'/transferAssure',
				query:{
					money:data.money,//交易金额。
				}
			});
		}else{
			data.isShow=true;
		}
	}
	const back=()=>{
		router.push('/transforManage');
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
		padding-bottom: 2vw;
		font-size: 4vw;
	}
	
	.wrapper .transfer li .account{
		display: flex;
		justify-content: space-between;
		padding-right: 2vw;
	}
	
	.wrapper .transfer li .balance .btn{
		padding-bottom: 2vw;
	}
	
	.wrapper .transfer li .balance .btn button{
		background-color: #009afe;
		color: #FFFFFF;
		width: 12vw;
		text-align: center;
		border: none;
		outline: none;
	}
	
	.wrapper .transfer li .balance .money{
		padding-bottom: 2vw;
	}
	
	.wrapper .transfer li .balance .money input{
		border: none;
		outline: none;
		font-size: 4vw;
		border-bottom: 1px solid #dedede;
	}
	
	.wrapper .button_next{
		width: 100%;
		padding: 4vw 3vw 0 3vw;
		box-sizing: border-box;
	}
	
	.wrapper .button_next button{
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