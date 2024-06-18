<script setup>
	import axios from 'axios'
	import { provide } from 'vue';
	import Session from './utils.js';
	import { useRouter } from 'vue-router';
	axios.defaults.baseUrl='http://localhost:8080/mobileBank/'
	// axios.defaults.withCredentials=true;
	// 填加请求拦截器
	axios.interceptors.request.use(config=>{
		let token=Session.getSession('token');
		// 如果令牌不为null
		if(token){
			config.headers.authorization='Bearer '+token;
		}
		return config;
	},error=>{
    // 处理错误情况
    return Promise.reject(error);
  }
	)
	// 添加响应拦截器
	axios.interceptors.request.use(response=>{
		let result=response.data;
		// 三等号先判断类型
		if(result==='invalid token'){
			router.push({
				path:'/failure',
				query:{
                    msg:'令牌无效，请重新登录',
					query:{
						msg:'令牌无效，请重新登录',
						code:902
					}
                },
			});
		}
		return response;
	},error=>{
		return Promise.reject(error);
	})
	// 全局注入
	provide('axios',axios);
</script>

<template>

	<router-view></router-view>

</template>

<style>
ul{
	/* 去掉无序列表项目中的黑点 */
	list-style: none;
}
/* 星号代表所有标签 */
*{
	margin: 0;
	padding: 0;
	font-family: "微软雅黑";
}
a{
	/* 去掉超级链接的下划线 */
	text-decoration: none;
	/* 修改超级链接的文字颜色 */
	color: black;
}
body,html{
	height: 100%;
	width: 100%;
}
/* 标签客观存在 */
#app {
	height: 100%;
	width: 100%;
}
</style>
