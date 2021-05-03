<template>
  <div>
    <div
      v-for="(value, key) in filteredParams"
      :key="value + '-' + key"
      class="property"
    >
      <div class="content">
        <div class="name">
          {{ key }}
        </div>
        <component
          :is="selectComponent(value)"
          :default-param="value"
          :layer-param="getLayerParam(key)"
          :class="'value' + (value.error ? ' warning' : '')"
          :title="value.error"
        />
      </div>
    </div>
    <div
      v-for="(value, key) in ioInfos.outputShape"
      :key="value + '-' + key"
      class="property"
    >
      <div class="content">
        <div class="name">
          {{ key }}
        </div>
        <component
          :is="'prop-text'"
          :default-param="{}"
          :layer-param="'[' + value.join(', ') + ']'"
          :class="'value'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PropBool from '@/components/left/property/PropBool.vue'
import PropText from '@/components/left/property/PropText.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    'prop-text': PropText,
    'prop-bool': PropBool
  },
  props: {
    defaultParams: Object,
    layerParams: Object,
    ioInfos: Object
  },
  computed: {
    filteredParams: function () {
      const values: any = {}
      const keys = Object.keys(this.defaultParams)
      for (let i = 0; i < keys.length; ++i) {
        if (keys[i] !== 'outputs' && keys[i] !== 'n_outputs') {
          values[keys[i]] = this.defaultParams[keys[i]]
        }
      }
      return values
    }
  },
  methods: {
    getLayerParam: function (key: string): string | null {
      const name = key.replace(/_./g, (s: string) => s.charAt(1).toUpperCase())
      const params = this.layerParams[name]

      if (typeof params === 'undefined') return null

      if (
        typeof params === 'object' &&
        Object.prototype.hasOwnProperty.call(params, 'dim')
      ) {
        return '[' + Object.values(params.dim).join(', ') + ']'
      }
      return params
    },
    selectComponent: function (prop: any) {
      if (Object.prototype.hasOwnProperty.call(prop, 'type')) {
        if (prop.type === 'bool') {
          return 'prop-bool'
        }
      }
      return 'prop-text'
    }
  }
})
</script>

<style>
.property {
  padding: 0;
  margin: 0;
  padding-left: 16px;
  padding-right: 16px;
}

.property .content {
  height: 25px;
  border-bottom: solid 1px var(--color-gray2);
  padding-top: 3px;
}

.property .name {
  height: 25px;
  line-height: 25px;
  width: 50%;
  float: left;
  overflow: hidden;
  color: var(--color-gray4);
  padding-right: 4px;
}

.property .value {
  height: 25px;
  line-height: 25px;
  float: left;
  overflow: hidden;
  color: var(--color-gray5);
  padding-left: 4px;
}

/* cover 'hidden' input and span */
.property label {
  cursor: pointer;
  position: relative;
  height: 16px;
}

/* warning icon in property panel */
.property .content .value.warning::after {
  width: 16px;
  height: 16px;
  display: inline-block;
  content: '';
  position: absolute;
  right: 16px;

  background-size: 16px 16px;
}
</style>
