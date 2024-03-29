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

<template>
  <div
    class="app-row"
    style="height: 50%; bottom: 0;"
  >
    <div class="property-area">
      <div class="title">
        Layer Property
      </div>
      <div v-if="isLayerSelected">
        <layer-type :default-props="defaultProps" />
        <layer-properties
          class="app-row app-scroll-x app-scroll-y"
          style="top: 88px; bottom: 0;"
          :default-params="defaultParams"
          :layer-params="layerParams"
          :io-infos="ioInfos"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { AnyObject } from '@/types/basic'
import LayerProperties from '@/components/left/property/LayerProperties.vue'
import LayerType from '@/components/left/property/LayerType.vue'
import { Node } from '@/types/graph'
import { RawFunction } from '@/types/nnablaApi'
import { findFunction } from '@/utils/nnablaApi'

export default Vue.extend({
  components: {
    'layer-type': LayerType,
    'layer-properties': LayerProperties
  },
  props: {
    activeLayer: {
      type: Object as PropType<Node>,
      required: true
    },
    nnablaFunctions: {
      type: Array as PropType<RawFunction[]>,
      default: []
    }
  },
  computed: {
    isLayerSelected: function (): boolean {
      return Object.keys(this.activeLayer).length > 0
    },
    defaultProps: function (): RawFunction {
      return findFunction(this.nnablaFunctions, this.activeLayer.type)
    },
    defaultParams: function (): AnyObject {
      return { ...this.defaultProps.inputs, ...this.defaultProps.arguments }
    },
    layerParams: function (): AnyObject {
      return this.activeLayer.param || {}
    },
    ioInfos: function (): {outputShape: string[] } {
      // return input/output related info,ie. shapes etc.
      return {
        outputShape: this.activeLayer.outputShape
      }
    }
  }
})
</script>

<style>
.property-area .title {
  margin-top: 0;
  padding-top: 12px;
}
</style>
