<template>
  <div class="prop-text">
    {{ getValue() }}
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
    layerParam: {
      type: String,
      default: null
    }
  },
  methods: {
    getValue: function (): string | boolean {
      if (this.layerParam !== null) return this.layerParam
      return this.defaultParam.default
    }
  }
})
</script>

<style></style>
