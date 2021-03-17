import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import NNablaBrowser from '@/views/NNablaBrowser.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'NNablaBrowser',
    component: NNablaBrowser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
