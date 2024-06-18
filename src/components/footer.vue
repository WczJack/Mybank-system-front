<template>
	<!-- 底部功能区 -->
	<ul class="footer">
		<li @click="index">
			<i class="fa fa-home"></i>
			<p>首页</p>
		</li>
		<li>
			<i class="fa fa-compass"></i>
			<p>发现</p>
		</li>
		<li @click="accountManage()">
			<i class="fa fa-user-o"></i>
			<p>账户</p>
		</li>
	</ul>
</template>

<script setup>
	import { useRouter } from "vue-router"
	const router = useRouter();
	const index=()=>{
		router.push('/')
	}
	const accountManage=()=>{
		router.push('/accountList')
	}
	
</script>

<style scoped>
	/* 底部功能区 */
	.footer{
		width: 100%;
		/* 弹性布局 */
		display: flex;
		/* 拉开间距 */
		justify-content: space-around;
		
		height: 14vw;
		/* 固定在底部 */
		position: fixed;
		left: 0;
		bottom: 0;
		align-items: center;
		background-color: #fff;
	}
	/* 列表内部弹性布局 */ 
	.footer li{
		/* 弹性布局 */
		display: flex;
		/* 字在图标下 */
		flex-direction: column;
		/* 弹性布局下元素居中 */
		align-items: center;
		/* 垂直居中，在设置高度后才生效 */
		justify-content: center;
		color: #999999;
	}
	
	.footer li p{
		font-size: 2.8vw;
	}
	
	.footer li i{
		font-size: 5vw;
	}
</style>