import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Full from '@/components/Full.vue'
import Home from '@/views/Home'
import Login from '@/views/Login'
import SystemBase from '@/views/system/Base'
import CategoryList from '@/views/category/List'

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
      path: '/kecheng',
      name: '课程管理',
      component: Full,
      children:[{
        path: '/kecheng/list',
        name: '课程列表',
        component: Full
      },{
        path: '/kecheng/create',
        name: '新建课程',
        component: Full
      }]     
    },
    {
      path: '/category',
      name: '分类管理',
      component: Full,
      children:[{
        path: '/category/list',
        name: '分类列表',
        component: CategoryList
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
    },
    {
      path: '/system',
      name: '系统设置',
      component: Full,
      children:[{
        path: '/system/',
        name: '基础设置',
        hidden: false,
        component: SystemBase
      }]       
    }
  ]
})
