import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import NNablaBrowser from '@/views/NNablaBrowser.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
