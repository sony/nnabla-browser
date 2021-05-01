<template>
<select :value="defaultParam.value">
  <option
    v-for="(value, index) in defaultParam.choice"
    :checked="value === defaultParam.value"
    :key="value + '-' + index"
  >
    {{ value }}
  </option>
</select>
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
    layerParam: String
  }
})
</script>

<style>
</style>
