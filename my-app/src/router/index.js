import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/login"
import Users from "@/components/Users"
import Dashboard from "@/components/Dashboard2"
Vue.use(Router)
export default new Router({
	mode: 'history',
	routes: [
		{
			path: "/",
			name: "Users",
			component: Users
		},
		{
			path: "/login",
			name: "Login",
			component: Login
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			component: Dashboard
		}
	]
})