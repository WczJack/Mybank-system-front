<template>
	<div class="wrapper">
		<header>
			<i class="fa fa-angle-left fa-2x" @click="back()"></i>
			<p>交易记录</p>
			<!-- 将来header使用弹性布局，令交易记录居中布局 -->
			<p></p>
		</header>
		<div class="total">
			<!-- 余额 -->
			<div class="balance">
				当前账户余额:<i class="fa fa-jpy"></i>{{balance}}
			</div>
			<!-- 收支区域 -->
			<div class="IncomeAndExpense">
				<!-- 总收入 -->
				<div class="income">
					总收入:
					<i class="fa fa-plus"></i>
					<i class="fa fa-jpy"></i>{{totalIncome}}
				</div>
				<!-- 总支出 -->
				<div class="expense">
					总支出:
					<i class="fa fa-minus"></i>
					<i class="fa fa-jpy"></i>{{totalExpense}}
				</div>
			</div>
		</div>
		<ul class="transrecordList">
			<li v-for="t in transRecordList">
				<div class="account" v-if="t.transtypeId==2">
					<p>交易类型：转账</p>
					<p v-if="t.accountId!=accountId">交易人：{{t.accountSubA.personInfo.realname}}</p>
					<p v-else>交易人：{{t.accountSubB.personInfo.realname}}</p>
					<p v-if="t.accountId!=accountId">账号：{{t.accountSubA.accountName}}</p>
					<p v-else>账号：{{t.accountSubB.accountName}}</p>
					<p>交易时间：{{t.transDate}}</p>
				</div>
				<div class="account" v-else-if="t.transtypeId==0">
					<p>交易类型：存款</p>
					<p>交易时间：{{t.transDate}}</p>
				</div>
				<div class="account" v-else>
					<p>交易类型：取款</p>
					<p>交易时间：{{t.transDate}}</p>
				</div>
				<div class="money">
					<i v-if="t.transtypeId==2&&t.accountId==accountId" class="fa fa-plus"></i>
					<i v-else-if="t.transtypeId==2&&t.accountId!=accountId" class="fa fa-minus"></i>
					<i v-else-if="t.transtypeId==1" class="fa fa-minus"></i>
					<i v-else class="fa fa-plus"></i>
					<i class="fa fa-jpy"></i>{{t.money}}
				</div>
			</li>
			
			
		</ul>
		
		<Footer></Footer>
	</div>
</template>

<script setup>
	import { computed,inject, reactive, toRefs } from 'vue';
	import Footer from '../components/footer.vue'
	import { useRouter } from 'vue-router';
	import Session from '../utils.js';
		const axios = inject('axios')
		const router=useRouter();
		const data=reactive(({
			transRecordList:[],
			balance:0,
			// 没有数据的提示
			msg:'',
			// 总收入计算属性
			accountId:parseInt(Session.getSession('accountId')),// 获取当前账户ID。
			totalIncome:computed(()=>{
				let sum=0;
				for(let t of data.transRecordList){
					if(t.transtypeId==0||(t.transtypeId==2&&t.accountId==data.accountId)){
						sum+=t.money;// 计算总收入。
					}
				}
				return sum;// 返回总收入。
			}),
			// 总支出计算属性
			totalExpense:computed(()=>{
                let sum=0;// 初始化总支出为0。
                for(let t of data.transRecordList){// 遍历交易记录列表。
                    if(t.transtypeId==1||(t.transtypeId==2&&t.accountId!=data.accountId)){// 如果交易类型是支出或者交易类型是转账且账户ID不是当前账户ID。
                        sum+=t.money;// 计算总支出。
						}
						}
					return sum;
					})
		}));
		const {transRecordList, balance, msg, accountId, totalIncome, totalExpense}=toRefs(data);
		// 获取交易记录的函数
		const getTransRecordList=()=>{
			let url=`${axios.defaults.baseUrl}transrecord/findTransRecord?accountId=`+Session.getSession('accountId');
			axios.get(url)
			.then(res=>{
				let responseBean=res.data;
				let code=responseBean.code;
				if(code==200){
					data.transRecordList=responseBean.data;// 获取已关联的账户列表，并将其存储到data.relatedAccountList中。
					
				}else{
					data.msg=responseBean.msg;// 获取错误信息，并将其存储到data.msg中。
				}
			})
			.catch(error=>{
				console.log(error);// 打印错误信息。
			})
		}
		// 获取账户余额的函数
        const getBalance=()=>{
            let url=`${axios.defaults.baseUrl}account/searchByAccountId?accountId=`+Session.getSession('accountId');// 获取账户余额的URL。
            axios.get(url)// 发送GET请求。
            .then(res=>{// 请求成功后的回调函数。
                let responseBean=res.data;// 获取响应数据。
                let code=responseBean.code;// 获取响应代码。
				if(code==200){
					
					data.balance=responseBean.data.balance;
				}
				})
			.catch(error=>{// 请求失败后的回调函数。
                console.log(error);// 打印错误信息。
            })
			}
	
		const init=()=>{// 初始化函数。
            getTransRecordList();// 获取交易记录。
            getBalance();// 获取账户余额。
		
        }
        init();
		const back=()=>{
			router.push('/accountList');
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
		padding: 0 10vw 0 1vw;
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
	
	/* 账户余额区域样式 */
	.wrapper .total{
		width: 100%;
		background-color: #009afe;
		color: #FFFFFF;
		position: fixed;
		left: 0;
		top: 12vw;
		padding: 0 2vw;
		/* 不改变div宽度 */
		box-sizing: border-box;
	}
	
	.wrapper .total .balance{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	
	.wrapper .total .IncomeAndExpense{
		width: 100%;
		display: flex;
		/* 左右拉开 */
		justify-content: space-between;
		padding: 2vw 0;
	}
	
	/* 交易列表样式 */
	.wrapper .transrecordList{
		margin-top: 30vw;
		width: 100%;
		padding: 0 2vw 16vw 0;
		box-sizing: border-box;
		
	}
	
	.wrapper .transrecordList li{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2vw;
		box-sizing: border-box;
		color: #21231e;
		border-bottom: 2px solid #d3d3d3;
	}
	
	.wrapper .transrecordList li .account p{
		font-size: 4.6vw;
	}
</style>