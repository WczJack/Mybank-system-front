<template>
	<div class="wrapper">
		<ul class="formbox">
			<li>
				<div class="content">
					<i class="fa fa-close fa-5x" style="color: red;"></i>
				</div>
			</li>
			<li>
				<div class="content">
					<h4>操作失败</h4>
				</div>
			</li>
			<li>
				<div class="content">
					<h4 v-show="msg!=undefined">如果输入信息无误，请联系客服</h4>
				</div>
			</li>
		</ul>
		<div class="button_index">
			<button type="button" @click="goHome">{{code==902?'重新登录':'返回首页'}}</button>
		</div>
		<Footer></Footer>
	</div>
</template>

<script setup>
	import Footer from '../components/footer.vue'
	import { reactive, toRefs } from 'vue';
	import { useRouter,  useRoute} from "vue-router";
	const router = useRouter();
	const route = useRoute();
	const data = reactive({
		// 路由传参
		telephone:route.query.msg,//获取路由参数中的telephone值，并将其赋值给data.telephone变量。
		code:route.query.code//获取路由参数中的code值，并将其赋值给data.code变量。
	});
	const {msg,code} = toRefs(data);//使用toRefs函数将data.telephone转换为响应式对象。
	const goHome=()=>{
		if(data.code==902){
			router.push('/login');
		}else{
			router.push('/');
		}
		
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
	.wrapper .formbox{
		width: 100%;
		margin-top: 12vw;
		/* border: 1px solid black; */
		height: 50%;
		box-sizing: border-box;
	}
	.wrapper .formbox li{
		display: flex;
		width: 100%;
		/* border: 1px solid blue; */
		height: 30%;
		justify-content: center;
		align-items: center;
	}
	.wrapper .formbox li .content i{
		color: #009afe;
	}
	.wrapper .button_index{
		width: 100%;
		padding: 4vw 3vw 0 3vw;
		box-sizing: border-box;
	}
	.wrapper .button_index button{
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