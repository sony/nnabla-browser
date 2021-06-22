import VueRouter, { RouteConfig } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import NNablaBrowser from '@/views/NNablaBrowser.vue'
import Graph from '@/components/Graph.vue'
import Monitoring from '@/components/Monitoring.vue'
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
    },
    children: [
      {
        path: 'graph',
        component: Graph
      },
      {
        path: 'monitoring',
        component: Monitoring
      },
      {
        path: '',
        redirect: 'graph'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
