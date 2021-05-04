<template>
  <div class="layer">
    <div
      class="drop-cap"
      :style="{ 'background-color': '#' + defaultProps.color.substring(2) }"
    >
      {{ defaultProps.layer_name.substring(0, 1) }}
    </div>
    <div class="name">
      {{ defaultProps.layer_name }}
    </div>
    <a
      title="Refer documentation"
      :href="getDocUrl()"
      target="_blank"
    >
      <font-awesome-icon icon="external-link-alt" />
    </a>
  </div>
</template>

<script lang="ts">
import { Definitions } from '@/utils/definitions'
import Vue from 'vue'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faExternalLinkAlt)

export default Vue.extend({
  props: {
    defaultProps: {
      type: Object,
      required: true
    }
  },
  methods: {
    getDocUrl: function (): string {
      const APIDEF = Definitions.NNABLA_CORE_API
      let url
      if ((this.defaultProps.api_type || '') === 'parametric_functions_api') {
        url = APIDEF.PF_DOC_URL + '#nnabla.parametric_functions.'
      } else {
        url = APIDEF.F_DOC_URL + '#nnabla.functions.'
      }

      return url + this.defaultProps.snake_name
    }
  }
})
</script>

<style>
.layer {
  font-family: 'SSTUI-Medium';
  margin-top: 8px;
  font-size: 16px;
  width: 100%;
  height: 24px;
}

.layer > .drop-cap {
  position: absolute;
  left: 16px;

  font-family: 'SSTUI-Medium';
  color: var(--color-gray0);
  letter-spacing: 0;
  text-align: center;
  width: 24px;
  height: 24px;
  line-height: 24px;
  background-color: var(--color-brand);
}

.layer > .name {
  position: absolute;
  left: 48px;
  right: 40px;
  line-height: 24px;

  overflow-x: hidden;
}

.layer > a {
  position: absolute;
  right: 16px;
  width: 24px;
  height: 24px;
  display: inline-block;
  background-position: right;
  background-repeat: no-repeat;
  background-size: 24px 24px;
  filter: brightness(0);
}
</style>
