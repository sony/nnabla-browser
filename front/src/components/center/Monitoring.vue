<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

// temporary deleted all components.
// todo: improve monitoring viewer.

export default Vue.extend({})
</script>

<style scoped>
.monitoring-content-scroller {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.c3-circles {
  display: none;
}

.tool-icon-container {
  z-index: 99;
  width: 4rem;
  height: 4rem;
  background-color: #1aaa55;
  border-radius: 50%;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 10px #f00;
}

.tool-icon-container .func-icon {
  font-size: 3rem;
  color: white;
}

.chart-block path {
  fill: none;
  stroke: #000;
}

g.tick line {
  stroke: #000;
}
</style>
