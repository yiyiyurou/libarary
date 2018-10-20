import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
import Home from '@/components/Home'
// import Echart from '@/components/echart'
import UserList from '@/user/list'
import BookList from '@/book/list'
import BookCategory from '@/book/bookCategory'
import PersonInfo from '@/user/personinfo'
import ChangePwd from '@/user/changepwd'
import map from '@/user/map'
import DashBoard from '@/components/DashBoard'
import borrowRlue from '@/rules/borrowrule'
import Login from '@/login/login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {path: '/Home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'DashBoard',
        component: DashBoard
      }
    ]
  },
  // {
  //   path: '/dashboard',
  //   name: 'DashBoard',
  //   component: DashBoard
  // },
  {
    path: '/user',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/user/userlist',
        name: 'UserList',
        component: UserList
      }
    ]
  },
  {
    path: '/book',
    name: '图书管理',
    redirect: 'Home',
    component: Home,
    children: [
      {
        path: '/book/list',
        name: '图书列表',
        component: BookList
      },
      {
        path: '/book/category',
        name: '图书分类',
        component: BookCategory
      }
    ]
  },
  {
    path: '/rule',
    name: '借阅规则',
    component: Home,
    children: [
      {
        path: '/rule/borrowRlue',
        name: '修订借阅规则',
        component: borrowRlue
      }
    ]
  },
  {
    path: '/set',
    name: '设置',
    redirect: 'Home',
    component: Home,
    children: [
      {
        path: '/set/personinfo',
        name: '个人信息',
        component: PersonInfo
      },
      {
        path: '/set/changepwd',
        name: '修改密码',
        component: ChangePwd
      },
      {
        path: '/set/map',
        name: '地图展示',
        component: map
      }
    ]
  }
  ]
})
//  {
// path: '/',
// name: 'Login',
// component: Home
// component: resolve => require(['@/components/Home'], resolve)
//   component: Login
// }
