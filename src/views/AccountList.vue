<template>
	<div class="wrapper">
		<!-- 标题区 -->
		<header>
			<p class="exit" @click="logout()">安全退出</p>
			<p>账户列表</p>
			<p @click="addRelatedAccount()">新增</p>
		</header>
		<!-- 账户列表部分 -->
		<ul class="accountList" v-for="item in relatedAccountList">
			<li>
				<div class="account">
					<h3>{{item.accountName}}</h3>
					<p>人民币可用余额:<i class="fa fa-jpy"></i>{{item.balance}}</p>
					<div class="operate" >
						<span class="obtn" @click="transRecord(item.id)">
							<i class="fa fa-search" ></i>交易记录
						</span>
						<span class="obtn" @click="transferManage(item.id)">
							<i class="fa fa-exchange" ></i>对外转账
						</span>
						<span>
							<i class="fa fa-database"></i>快e宝
						</span>
					</div>
				</div>
			</li>
			
		</ul>
		<div id="noResult" v-show="isShow">
			尚未添加可以关联的账户
		</div>
		<Footer></Footer>
	</div>
</template>

<script setup>
	import { inject, reactive, toRefs } from 'vue';
import Footer from '../components/footer.vue'
import { useRouter } from 'vue-router';
import Session from '../utils.js';
	const axios = inject('axios')
	const router=useRouter();
	const data=reactive(({
		// 已关联的账户
		relatedAccountList:[],
		// 控制id为noResult的div是否显示
		isShow:true
	}));
	const {relatedAccountList, isShow}=toRefs(data);
	const findRelatedAccount=()=>{
		let mobile=Session.parseToken();
		let telephone=mobile.telephone;
		
		let url=`${axios.defaults.baseUrl}account/findRelatedAccountByTel?telephone=`+telephone;
		axios.get(url)
		.then(response=>{
            let responseBean=response.data;
			let code=responseBean.code;
			if(code==200){
				data.relatedAccountList=responseBean.data;// 获取已关联的账户列表，并将其存储到data.relatedAccountList中。
				data.isShow=false;
			}
        })
		.catch(error=>{
            console.log(error);// 处理错误信息，例如网络错误、服务器错误等。
	})}
	// 定义一个页面初始化函数
	const init=()=>{
		findRelatedAccount();
	}
	init();
	// 跳转到新增关联账户页面
	const addRelatedAccount=()=>{
        router.push('/accountListforselect');// 跳转到新增关联账户页面。
    }
	// 跳转到转账管理页面
	const transferManage=(accountId)=>{
		// 将账户ID存入前端Session
		Session.saveSession('accountId',accountId);
        router.push('/transforManage');// 跳转到转账管理页面。
    }
	const transRecord=(accountId)=>{
		Session.saveSession('accountId',accountId);
        router.push('/transrecord');// 跳转到转账记录页面。
    }
	const logout=()=>{
		Session.removeSession("token");
		router.push('/login');// 跳转到登录页面。

	}
</script>


<style scoped>
	.wrapper{
		/* 让div高度和body一样高 */
		height: 100%;
		/* 让div宽度和body一样宽 */
		width: 100%;
		/* 整体背景颜色 */
		background-color: #F5F5F5;
	}
	/* 标题区样式 */
	.wrapper header{
		width: 100%;
		height: 12vw;
		display: flex;
		/* 平均分配标签之间的距离 */
		justify-content: space-between;
		align-items: center;
		
		/* 加内边距 上右下左*/
		padding: 0 2vw 0 1vw;
		/* 边框盒子 令边框不变形 */
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
	.wrapper header .exit{
		font-size: 3vw;
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
		display: flex;
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
	
	.wrapper .accountList li .operate{
		border: 1px solid #DADADA;
		padding: 2vw 0;
		width: 100%;
		text-align: center;
		font-size: 3.6vw;
		
	}
	
	.wrapper .accountList li .operate span{
		padding: 0 6vw;
		border-right: 1px solid #DADADA;
	}
	
	.wrapper .accountList li .account .operate .obtn{
		border-right: 1px solid #DADADA;
	}
	.wrapper #noResult{
		margin-top: 12vw;
		text-align: center;
	}
</style>