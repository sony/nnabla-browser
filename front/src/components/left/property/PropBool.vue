<template>
  <div class="prop-bool">
    {{ checked ? 'True' : 'False' }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface DefaultParam {
  default: boolean;
}

interface PropertyProp {
  defaultParam: DefaultParam;
  layerParam: string | boolean;
}

export default Vue.extend<{}, {}, {}, PropertyProp>({
  props: {
    defaultParam: {
      type: Object,
      required: true
    },
    layerParam: Boolean
  },
  computed: {
    checked: function (): string | boolean {
      if (this.layerParam !== null) return this.layerParam
      return this.defaultParam.default
    }
  }
})
</script>

<style></style>
