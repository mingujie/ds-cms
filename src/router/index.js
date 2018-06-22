import Vue from 'vue'
import Router from 'vue-router'
import Full from '@/components/Full.vue'
import Home from '@/views/Home'
import Login from '@/views/Login'
import SystemBase from '@/views/system/Base'
import CategoryList from '@/views/category/List'
import SecondCategoryList from '@/views/category/SecondList'
import ThirdCategoryList from '@/views/category/ThirdList'
import UserList from '@/views/user/List'

//课程路由
import CurriculumCreate from '@/views/curriculum/Create'
import CurriculumList from '@/views/curriculum/List'
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
      path: '/curriculum',
      name: '课程管理',
      component: Full,
      children:[{
        path: '/curriculum/create',
        name: '新建课程',
        component: CurriculumCreate
      },{
        path: '/curriculum/list',
        name: '课程列表',
        component: CurriculumList
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
      },{
        path: '/category/second_list/:cid',
        name: 'secondList',
        cname: '二级分类列表',
        component: SecondCategoryList,
        hidden: true
      },{
        path: '/category/third_list/:cid',
        name: 'thirdList',
        cname: '三级分类列表',
        component: ThirdCategoryList,
        hidden: true
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
        component: UserList
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
