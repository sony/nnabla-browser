// Copyright 2021 Sony Corporation.
// Copyright 2021 Sony Group Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import VueRouter, { RouteConfig } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Graph from '@/components/Graph.vue'
import Monitoring from '@/components/Monitoring.vue'
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
