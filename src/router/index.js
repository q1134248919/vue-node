import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/page/MainPage'
import Signup from '@/page/Signup'
import Signin from '@/page/Signin'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [ {
		path: '/',
		name: 'MainPage',
		component: MainPage
	},
	{
		path: '/signup',
		name: 'Signup',
		component: Signup
	},
	{
		path: '/signin',
		name: 'Signin',
		component: Signin
	},
]
})