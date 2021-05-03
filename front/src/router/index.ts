import VueRouter, { RouteConfig } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import NNablaBrowser from '@/views/NNablaBrowser.vue'
import Vue from 'vue'

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'NNablaBrowser',
    component: NNablaBrowser,
    meta: {
      title: 'nnabla browser',
      desc: 'NNC-like visualizer for nnabla developers.'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
