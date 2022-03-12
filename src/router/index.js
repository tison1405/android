import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/connection',
    name: 'connection',
    component: () => import('../views/connection')
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: () => import('../views/inscription')
  },
  {
    path: '/inputMainPage',
    name: 'inputMainPage',
    component: () => import('../views/inputMainPage')
  },
  {
    path: '/trend',
    name: 'trend',
    component: () => import('../views/trend')
  },
  {
    path: '/mytribs',
    name: 'mytribs',
    component: () => import('../views/myTribs')
  },
  {
    path: '/managetribe',
    name: 'managetribe',
    component: () => import('../views/manageTribe')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
