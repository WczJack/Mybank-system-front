//站点的路由文件，写完后需要在main.js中导入、引用
import {createRouter,createWebHistory,createWebHashHistory} from 'vue-router'
import {defineAsyncComponent} from 'vue'
import Session from "../utils.js"

//路由规则
const myRoutes = [
	{
		path: "/",
		// 重定向
		redirect: "/home",
	},
	{
		path: '/home',
		name: "Home",
		component: defineAsyncComponent(() => import(`../views/Home.vue`))
		// component: () => import(`../views/Home.vue`)
	},
	{
		path: '/accountList',
		name: "AccountList",
		component: defineAsyncComponent(() => import(`../views/AccountList.vue`))
		// component: () => import(`../views/AccountList.vue`)
	},
	{
		path: '/accountListforselect',
		name: "AccountListforselect",
		component: defineAsyncComponent(() => import(`../views/AccountListforSelect.vue`))
		// component: () => import(`../views/AccountListforSelect.vue`)
	},
	{
		path: '/transforManage',
		name: "TransforManage",
		component: defineAsyncComponent(() => import(`../views/TransforManage.vue`))
		// component: () => import(`../views/TransforManage.vue`)
	},
	{
		path: '/recipientList',
		name: "RecipientList",
		component: defineAsyncComponent(() => import(`../views/RecipientList.vue`))
		// component: () => import(`../views/TransforManage.vue`)
	},
	{
		path: '/addrecipientList',
		name: "AddrecipientList",
		component: defineAsyncComponent(() => import(`../views/addrecipientList.vue`))
		// component: () => import(`../views/TransforManage.vue`)
	},
	{
		path: '/editRecipient',
		name: "EditRecipient",
		component: defineAsyncComponent(() => import(`../views/EditRecipient.vue`))
		// component: () => import(`../views/TransforManage.vue`)
	},
	{
		path: '/transferOp',
		name: "TransferOp",
		component: defineAsyncComponent(() => import(`../views/TransferOp.vue`))
		
	},
	{
		path: '/transferAssure',
		name: "TransferAssure",
		component: defineAsyncComponent(() => import(`../views/TransferAssure.vue`))
		
	},
	{
		path: '/success',
		name: "Success",
		component: defineAsyncComponent(() => import(`../views/Success.vue`))
		
	},
	{
		path: '/failure',
		name: "Failure",
		component: defineAsyncComponent(() => import(`../views/Failure.vue`))
		
	},
	{
		path: '/transrecord',
		name: "Transrecord",
		component: defineAsyncComponent(() => import(`../views/Transrecord.vue`))
		
	},
	{
		path: '/login',
		name: "Login",
		component: defineAsyncComponent(() => import(`../views/Login.vue`))
		
	},
	{
		path: '/register',
		name: "Register",
		component: defineAsyncComponent(() => import(`../views/Register.vue`))
		
	},
	{
		path: '/password',
		name: "Password",
		component: defineAsyncComponent(() => import(`../views/Password.vue`))
		
	},
	{
		path: '/recipientListForSelect',
		name: "RecipientListForSelect",
		component: defineAsyncComponent(() => import(`../views/RecipientListForSelect.vue`))
		
	}
	
	// {
	// 	path: '/home',
	// 	name: "首页",
	// 	component: defineAsyncComponent(() => import(`../components/Home.vue`)),
	// 	// 二级路由
	// 	children: [{
	// 			path: '/change',
	// 			name: "银行转账",
	// 			component: defineAsyncComponent(() => import(`../components/Change.vue`))
	// 		},
	// 		{
	// 			// restful风格传参，将参数写到路径中
	// 			path: '/log/:nid/:uname',
	// 			name: "交易记录",
	// 			component: defineAsyncComponent(() => import(`../components/Mylog.vue`))
	// 		},
	// 		{
	// 			path: '/center',
	// 			name: "个人中心",
	// 			component: defineAsyncComponent(() => import(`../components/Center.vue`))
	// 		}
	// 	]
	// }
	
]

//创建路由对象
const router = createRouter({
	history: createWebHistory(),
	routes: myRoutes
})

router.beforeEach((to,from,next)=>{
	// 创建规则，用集合表示，不需要登录就可以访问规则
	const nextRoute=['/','/login','/register','/password','/failure','/success'];
	let token=Session.getSession('token');
	if(nextRoute.indexOf(to.path)==-1){
		// js中null可以隐式转化成false
		if(!token){
			router.push('/login');
		}
	}
	next();
})

// // 导航守卫
//  router.beforeEach(async (to, from) => {
// 	 console.log(to)
// 	 let isAuthenticated =  sessionStorage.getItem("token")!= null
// 		&&sessionStorage.getItem("token")!=""?true:false;
// 	 // 未登录状态，无法访问首页
// 	 // 检查用户是否已登录 ❗️ 避免无限重定向
//    if (!isAuthenticated && to.name !== '登录') {
//      // 将用户重定向到登录页面
//      return { name: '登录' }
//    }
   
//    // 已登录状态，无法访问登录界面
//    if (isAuthenticated && to.name == '登录') {
//      // 将用户重定向到登录页面
//      return { name: '首页' }
//    }
//  })
export default router
