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
import { AnyObject } from '@/types/basic'
import LayerProperties from '@/components/left/property/LayerProperties.vue'
import LayerType from '@/components/left/property/LayerType.vue'
import { Node } from '@/types/graph'
import { RawFunction } from '@/types/nnablaApi'
import Vue from 'vue'
import { nnablaCore } from '@/utils/nnablaApi'

interface ComputedPropertyArea {
  selectedLayer: Node;
  isLayerSelected: boolean;
  defaultProps: RawFunction;
  layerParams: object | string | number;
  ioInfos: { outputShape: string[] };
}

export default Vue.extend<{}, {}, ComputedPropertyArea, {}>({
  components: {
    'layer-type': LayerType,
    'layer-properties': LayerProperties
  },
  computed: {
    selectedLayer: function (): Node {
      return this.$store.getters.activeLayer
    },
    isLayerSelected: function (): boolean {
      return Object.keys(this.selectedLayer).length > 0
    },
    defaultProps: function (): RawFunction {
      return nnablaCore.findFunction(this.selectedLayer.type)
    },
    layerParams: function (): AnyObject {
      return this.selectedLayer.param || {}
    },
    ioInfos: function (): {outputShape: string[] } {
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
