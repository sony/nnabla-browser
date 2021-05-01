<template>
<div class="app-row" style="height: 50%; bottom: 0;" >
  <div class="property-area">
    <div class="title">Layer Property</div>
    <div v-if="isLayerSelected">
      <layer-type :defaultProps="defaultProps" />
      <layer-properties
        class="app-row app-scroll-x app-scroll-y"
        style="top: 88px; bottom: 0;"
        :defaultParams="{...defaultProps.inputs, ...defaultProps.arguments}"
        :layerParams="layerParams"
        :ioInfos="ioInfos"
      />
      </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { nnablaCore } from '@/utils/nnablaApi'
import LayerType from '@/components/left/property/LayerType.vue'
import LayerProperties from '@/components/left/property/LayerProperties.vue'

// type definition
// todo: refactoring
interface DefaultParam {
  default: boolean;
}

interface Selectedlayer {
  outputShape: string;
  type: string;
  length: number;
  [key: string]: any;
}

interface ComputedPropertyArea {
  selectedLayer: Selectedlayer;
  isLayerSelected: boolean;
  defaultProps: object;
  layerParams: object;
  ioInfos: object;
}

export default Vue.extend<{}, {}, ComputedPropertyArea, {}>({
  computed: {
    selectedLayer: function () {
      return this.$store.getters.activeLayer
    },
    isLayerSelected: function () {
      return Object.keys(this.selectedLayer).length > 0
    },
    defaultProps: function () {
      return nnablaCore
        .getAllFunctions()
        .find(x => x.layer_name === this.selectedLayer.type)
    },
    layerParams: function () {
      const paramKey: string =
        this.selectedLayer.type.toLowerCase() + 'Param'
      return this.selectedLayer[paramKey] || {}
    },
    ioInfos: function () {
      // return input/output related info,ie. shapes etc.
      return {
        outputShape: this.selectedLayer.outputShape
      }
    }
  },
  components: {
    'layer-type': LayerType,
    'layer-properties': LayerProperties
  }
})
</script>

<style>
.property-area .title {
  margin-top: 0;
  padding-top: 12px;
}
</style>
