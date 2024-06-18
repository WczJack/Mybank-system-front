<template>
	<div class="wrapper">
		<header>
			<i class="fa fa-angle-left fa-2x" @click="back()"></i>
			<p>转账管理</p>
			<!-- 将来header使用弹性布局，令交易记录居中布局 -->
			<p></p>
		</header>
		<!-- 功能列表区 -->
		<ul class="transManageList">
			<li @click="reciptientList()">
				<i class="fa fa-address-book-o fa-2x"></i>
				<p>收款方管理</p>
			</li>
			<li @click="transferop()">
				<i class="fa fa-random fa-2x"></i>
				<p>对外转账</p>
			</li>
			<li>
				<i class="fa fa-laptop fa-2x"></i>
				<p>掌银账户互转</p>
			</li>
		</ul>
		<Footer></Footer>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router';
import Footer from '../components/footer.vue'

	const router=useRouter();
	const reciptientList=()=>{
		router.push('/recipientList')
		}
	const transferop=()=>{
		router.push('/transferOp');
		}
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
	
	.wrapper .transManageList{
		width: 100%;
		margin-top: 12vw;
	}
	
	.wrapper .transManageList li{
		width: 100%;
		display: flex;
		align-items: center;
		border-bottom: 3px solid #DDDDDD;
		color: #666666;
		background-color: #FFFFFF;
	}
	
	.wrapper .transManageList li p{
		font-size: 4.8vw;
		padding: 1vw 2vw 2vw 2vw;
	}
	
	.wrapper .transManageList li i{
		padding: 2vw;
	}
</style>