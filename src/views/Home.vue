<template>
	<!-- 整个页面最外层div -->
	<div class="wrapper">
		<!-- 抬头区 -->
		<header>
			<!-- <i class="fa fa-gg-circle"></i>&nbsp;手机银行 -->
			<div class="logo-container"></div>
		</header>
		<!-- 功能菜单区 -->
		<ul class="menu">
			<li>
				<i class="fa fa-line-chart fa-2x" style="color: red;"></i>
				<p>股指</p>
			</li>
			<li>
				<i class="fa fa-random fa-2x" style="color: gold;"></i>
				<p>期货</p>
			</li>
			<li>
				<i class="fa fa-desktop fa-2x" style="color: #0097FF;"></i>
				<p>理财</p>
			</li>
			<li>
				<i class="fa fa-balance-scale fa-2x" style="color: #A52A2A;"></i>
				<p>基金</p>
			</li>
			<li>
				<i class="fa fa-dollar fa-2x" style="color: #DEB887;"></i>
				<p>缴费</p>
			</li>
			<li>
				<i class="fa fa-cc-visa fa-2x" style="color: #D2691E;"></i>
				<p>信用卡</p>
			</li>
			<li>
				<i class="fa fa-space-shuttle fa-2x" style="color: #38CA73;"></i>
				<p>无卡取款</p>
			</li>
			<li>
				<i class="fa fa-cc-discover fa-2x" style="color: #666666;"></i>
				<p>更多</p>
			</li>
	
		</ul>
		<!-- 智能区 -->
		<div class="special">
			<div class="text">
				<h3>金融小秘书&nbsp;&nbsp;&nbsp;智能提醒</h3>
				<div class="subText">
					<span>
						<i class="fa fa-bell fa-2x" style="color: #FF0000;"></i>缴费提醒
					</span>
					<span>
						<i class="fa fa-credit-card fa-2x" style="color: #0097FF;"></i>还款提醒
					</span>
				</div>
			</div>
			<div class="go">
				Go
			</div>
		</div>
		<!-- 广告区 -->
		<div class="banner">
	
		</div >
		
		<Footer></Footer>
	</div>
</template>

<script setup>
	import Footer from '../components/footer.vue'
</script>

<!-- 样式只会影响当前页面 不会影响其他组件-->
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
	

	.wrapper header .logo-container{
		width: 100%;
		/* 背景图片样式 */
		background-image: url(../assets/img/logo1.jpg);
		/* div的高度 */
		height: 40vw;
		/* 让图片适应背景图片大小 */
		/* background-size: cover; */
		background-size: contain;
		background-repeat: no-repeat;
		
		
	}
/* 	.wrapper header .logo-container{
		  background-image: url(../assets/img/logo.png);
		  background-size: contain;
		  background-repeat: no-repeat;
		  height: 20vw;
		  width: auto; 
	} */
	/* 菜单样式代码 */
	.wrapper .menu{
		width: 100%;
		/* 使用弹性布局 */
		display: flex;
		/* 让菜单项分散对齐 */
		justify-content: space-around;
		/* 分行显示 */
		flex-wrap: wrap;
		align-content: center;
		/* 菜单区域的高度 */
		height: 36vw;
		/* 辅助查看位置的边框 */
		/* border: 1px solid black; */
		/* 菜单区域距离抬头区的距离 */
		margin-top: 1vw;
		/* 菜单区域背景颜色 */
		background-color: #FFFFFF;
	}
	.wrapper .menu li{
		/* 菜单项目的宽度 */
		width: 22vw;
		/* 辅助查看位置的边框 */
		/* border: 1px solid black; */
		/* 使用弹性布局 */
		display: flex;
		/* 改变弹性布局的方向 */
		flex-direction: column;
		/* 以上布局情况下，水平居中 */
		align-items: center;
		/* 使用上下内边距 */
		padding: 1vw 0;
		
	}
	/* 智能区的样式 */
	.wrapper .special{
		width: 100%;
		display: flex;
		/* border: 1px solid black; */
		/* 让菜单项分散对齐 文本区和图形区*/
		justify-content: space-around;
		/* 上下 左右 */
		padding: 2vw 0;
		margin-top: 6vw;
		/* 在div里面垂直居中的效果 */
		align-items: center;
		/* 单独加上边框和下边框 */
		border-top: 1px solid #E7E7E7;
		border-bottom: 1px solid #E7E7E7;
		background-color: #FFFFFF;
	}
	
	/* 智能区左侧上方文字样式 */
	.wrapper .special .text h3{
		padding: 2vw 0;
	}
	
	.wrapper .special .subText{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 2vw 0;
		color: #999999;
		/* 加粗效果 */
		font-weight: bolder;
	}
	
	.wrapper .special .go{
		border: 1px solid #009afe;
		/* 正方形 */
		width: 12vw;
		height: 12vw;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 6vw;
		/* 正方形变成圆形 */
		border-radius: 100%;
		background-color: #009afe;
		color: #FFFFFF;
		/* 加粗 */
		font-weight: bolder;
	}
	
	.wrapper .banner{
		width: 100%;
		/* 背景图片样式 */
		background-image: url(../assets/img/p1.png);
		/* div的高度 */
		height: 40vw;
		/* 让图片适应背景图片大小 */
		background-size: cover;
		/* 拉开与智能区的距离 */
		margin-top: 6vw;
	}
	
	/* 底部功能区 */
	.wrapper .footer{
		width: 100%;
		/* 弹性布局 */
		display: flex;
		/* 拉开间距 */
		justify-content: space-around;
		
		height: 14vw;
		
		position: fixed;
		left: 0;
		bottom: 0;
		align-items: center;
		background-color: #fff;
	}
	/* 列表内部弹性布局 */ 
	.wrapper .footer li{
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
	
	.wrapper .footer li p{
		font-size: 2.8vw;
	}
	
	.wrapper .footer li i{
		font-size: 5vw;
	}
	
</style>