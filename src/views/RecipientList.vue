<template>
	<div class="wrapper">
		<!-- 标题区 -->
		<header>
			<i class="fa fa-angle-left fa-2x" @click="back()"></i>
			<p>收款方列表</p>
			<!-- 将来header使用弹性布局，令交易记录居中布局 -->
			<p @click="addRecipient()">新增</p>
		</header>
		<!-- 已经添加的收款人列表 -->
		<ul class="reciptientList" v-for="item in recipientList">
			<li @click="editRecipient(item)">
				<div class="recipient">
					<h3>{{item.accountSub.accountName}}</h3>
					<p>{{item.accountSub.personInfo.realname}}</p>
				</div>
				<i class="fa fa-angle-right fa-2x"></i>
			</li>
		</ul>
		<div id="noResult" v-show="isShow">
			暂无可用的收款人数据
		</div>
		<Footer></Footer>
		
	</div>
</template>

<script setup>
	import {inject,reactive,toRefs} from 'vue';
	import { useRouter} from 'vue-router';
    import Footer from '../components/footer.vue'

	import Session from '../utils.js';
	const axios=inject('axios')//注入axios
	const router=useRouter();
	const data=reactive({
		recipientList:[],//定义一个空数组，用于存储从后端获取的收款方列表数据。
		isShow:true
	})//定义响应式数据对象data，用于存储从后端获取的数据。
	const {recipientList,isShow}=toRefs(data);
	const getRecipientList=()=>{
		let mobile=Session.parseToken();
		let telId=mobile.id;
		axios.get(`${axios.defaults.baseUrl}recipient/findAll?telId=`+telId)
		.then(res=>{
			let responseBean=res.data;
			let code=responseBean.code;
			// alert("code"+responseBean.code);
			if(code==200){
				data.recipientList=responseBean.data;//将获取到的数据存储到响应式数据对象data中。
				data.isShow=false;
				// alert('输出成功');
			}
		})
		.catch(error=>{
			console.log(error);//打印错误信息。
		});
	}
	const init=()=>{
		getRecipientList();//调用getRecipientList函数，获取收款方列表数据。
		
	}
	init();
	// 前往添加收款人的页面
	const addRecipient=()=>{
        router.push('/addrecipientList');//使用路由对象router的push方法，将页面导航到/addRecipient。
    }
	// 前往收款人修改界面
	const editRecipient=(recipient)=>{
		let str=JSON.stringify(recipient);//将收款人信息转换为字符串。
		Session.saveSession('recipient',str);//将收款人信息存储到sessionStorage中。
        router.push('/editRecipient');//使用路由对象router的push方法，将页面导航到/editRecipient，并将收款人信息作为参数传递给目标页面。
    }
	const back=()=>{
		router.push('/transforManage');//返回上一页。
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
		justify-content: space-between;
		align-items: center;
		/* 边框盒子 令边框不变形 */
		box-sizing: border-box;
		/* 加内边距 上右下左*/
		padding: 0 2vw 0 1vw;
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
	.wrapper .reciptientList{
		width: 100%;
		margin-top: 12vw;
	}
	.wrapper .reciptientList li{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2vw;
		box-sizing: border-box;
		margin-bottom: 3vw;
		background-color: #FFFFFF;
		color: #666666;
	}
	.wrapper .reciptientList li .recipient h3{
		font-size: 4.6vw;
		padding: 0 0 2vw 0;
		font-weight: 300;
	}
	
	.wrapper .reciptientList li .recipient p{
		font-size: 4.6vw;
		padding: 0 0 2vw 0;
	}
	.wrapper #noResult{
		margin-top: 12vw;
		text-align: center;
	}
</style>