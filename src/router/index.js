import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Full from '@/components/Full.vue'
import Home from '@/views/Home'

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
    },    {
      path: '/home',
      name: 'Home',
      hidden: true,
      component: Full    	
    }, {
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
    }
  ]
})
