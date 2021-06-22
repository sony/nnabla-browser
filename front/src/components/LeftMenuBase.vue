<template>
  <div
    id="leftContent"
    class="left-content"
  >
    <div class="left-component">
      <div
        class="app-row"
        style="top: 0; bottom: 0;"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style>
.left-content {
  position: relative;
  width: 15%;
  height: 100%;
  min-width: 280px;
  background-color: var(--color-gray1);
  border-right: solid 1px var(--color-gray2);
}

.left-component .icon-small {
  width: 16px;
  height: 16px;
}
</style>
