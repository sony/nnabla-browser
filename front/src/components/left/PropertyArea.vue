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
          :default-params="{ ...defaultProps.inputs, ...defaultProps.arguments }"
          :layer-params="layerParams"
          :io-infos="ioInfos"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LayerProperties from '@/components/left/property/LayerProperties.vue'
import LayerType from '@/components/left/property/LayerType.vue'
import Vue from 'vue'
import { nnablaCore } from '@/utils/nnablaApi'

// type definition
// todo: refactoring
interface DefaultParam {
  default: boolean;
}

interface Selectedlayer {
  outputShape: string;
  type: string;
  length: number;
  [key: string]: object | string | number;
}

interface ComputedPropertyArea {
  selectedLayer: Selectedlayer;
  isLayerSelected: boolean;
  defaultProps: object;
  layerParams: object | string | number;
  ioInfos: object;
}

export default Vue.extend<{}, {}, ComputedPropertyArea, {}>({
  components: {
    'layer-type': LayerType,
    'layer-properties': LayerProperties
  },
  computed: {
    selectedLayer: function () {
      return this.$store.getters.activeLayer
    },
    isLayerSelected: function () {
      return Object.keys(this.selectedLayer).length > 0
    },
    defaultProps: function () {
      return nnablaCore.findFunction(this.selectedLayer.type)
    },
    layerParams: function () {
      const paramKey: string = this.selectedLayer.type.toLowerCase() + 'Param'
      return this.selectedLayer[paramKey] || {}
    },
    ioInfos: function () {
      // return input/output related info,ie. shapes etc.
      return {
        outputShape: this.selectedLayer.outputShape
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
