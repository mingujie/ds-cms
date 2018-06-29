import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Full from '@/components/Full.vue'
import Home from '@/views/Home'
import Login from '@/views/Login'

//课程
import ClassList from '@/views/class/ClassList'
import ClassDetail from '@/views/class/ClassDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Full,
      name: '',
      hidden: true,
      redirect: '/home'
    },    
    {
      path: '/home',
      name: 'Home',
      hidden: true,
      component: Full    	
    }, 
    //登陆页面
    {
      path: '/login',
      name: 'Login',
      hidden: true,
      component: Login	
    }, 

    {
      path: '/class',
      name: '课程管理',
      component: Full,
      children:[{
        path: '/class/list',
        name: '课程列表',
        component: ClassList
      },{
        path: '/class/detail',
        name: '课程详情',
        component: ClassDetail
      }]     
    },

    {
      path: '/user',
      name: '用户管理',
      component: Full,
      children:[{
        path: '/user/list',
        name: '用户列表',
        hidden: false,
        component: Home
      }]     
    }
  ]
})
