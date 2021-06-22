<template>
  <div
    id="centerContent"
    class="center-content"
  >
    <keep-alive>
      <slot></slot>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style>
.center-content {
  width: 84%;
  height: 100%;
  border-right: solid 1px var(--color-gray2);
  background-color: var(--color-gray0);
}
</style>
