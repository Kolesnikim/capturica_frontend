import Vue from 'vue'
import VueRouter from 'vue-router'

import General from '@/views/General'

const views = require.context('@/views', true, /vue$/)
const routes_views = views.keys().map(file => {
  const path = file.replace(/^\.\/(.+)\.vue$/, '/$1').toLowerCase()
  const component = views(file).default
  // console.log(file, path)
  return {
    path,
    component
  }
})

Vue.use(VueRouter)

const routes = [
  ...routes_views,
  {
    path: '/',
    component: General
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
