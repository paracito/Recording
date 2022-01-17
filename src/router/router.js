import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import RecordList from '@/views/RecordList.vue'
import ClockIn from '@/views/ClockIn.vue'

import { getCookie } from '../../static/common'


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(getCookie('account')) {
        next({name: 'HomePage'})
      }else {
        return true
      }
    },
  },
  {
    path: '/recordlist',
    name: 'RecordList',
    component: RecordList
  },
  {
    path: '/clockin',
    name: 'ClockIn',
    component: ClockIn
  }
]

const router = createRouter({
  history: createWebHistory(),
  mode: 'hash',
  routes
})

export default router