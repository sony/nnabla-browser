<template>
<div>
  <label>
    <input type="checkbox" ref="check" :checked="checked" />
    <span />
  </label>
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
    defaultParam: Object,
    layerParam: Boolean
  },
  computed: {
    checked: function () {
      if (this.layerParam !== null) return this.layerParam
      return this.defaultParam.default
    }
  }
})
</script>

<style>
</style>
