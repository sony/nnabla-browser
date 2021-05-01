<template>
<div>
  <div
    class="property"
    v-for="value, key in filteredParams"
    :key="value + '-' + key"
  >
    <div class="content">
      <div class="name">{{ key }}</div>
      <component
        :is="selectComponent(value)"
        :defaultParam="value"
        :layerParam="getLayerParam(key)"
        :class="'value' + (value.error ? ' warning' : '')"
        :title="value.error"
      />
    </div>
  </div>
    <div
      class="property"
      v-for="value, key in ioInfos.outputShape"
      :key="value + '-' + key"
    >
      <div class="content">
        <div class="name">{{ key }}</div>
        <component
          :is="'prop-text'"
          :defaultParam="{}"
          :layerParam="'['+value.join(', ')+']'"
          :class="'value'"
        />
      </div>
  </div>
</div>
</template>

<script lang="ts">
import PropText from '@/components/left/property/PropText.vue'
import PropBool from '@/components/left/property/PropBool.vue'
import Vue from 'vue'

export default Vue.extend({
  props: {
    defaultParams: Object,
    layerParams: Object,
    ioInfos: Object
  },
  components: {
    'prop-text': PropText,
    'prop-bool': PropBool
  },
  methods: {
    getLayerParam: function (key: string): string | null {
      const name = key.replace(/_./g, (s: string) =>
        s.charAt(1).toUpperCase()
      )
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
  float: left;
  overflow: hidden;
  color: var(--color-gray4);
  width: 50%;
  padding-right: 4px;
}

.property .value {
  float: left;
  overflow: hidden;
  color: var(--color-gray5);
  width: 50%;
  padding-left: 4px;
}

.property input[type='text'] {
  width: 100%;
}

.property input[type='text']:not(:focus) {
  border-color: transparent;
  outline-color: transparent;
  background-color: transparent;
}

/* cover 'hidden' input and span */
.property label {
  cursor: pointer;
  position: relative;
  height: 16px;
}

.property label > input[type='checkbox'] {
  display: none;
}

/* slider background which having round corner */
.property label > input[type='checkbox'] + span {
  display: inline-block;
  vertical-align: text-bottom;
  width: 32px;
  height: 13px;
  border-radius: 13px;
  background-color: var(--color-gray4);
}

/* background color changed to layer1's when checked */
.property label > input[type='checkbox']:checked + span {
  background-color: var(--color-brand);
}

/* draw round thumb on sllider */
.property label > input[type='checkbox'] + span::after {
  display: inline-block;
  content: '';
  margin: 1px;
  width: 11px;
  height: 11px;
  border-radius: 11px;
  background-color: var(--color-gray1);
  transition: margin 0.125s;
}

/* thumb moved to left when checked */
.property label > input[type='checkbox']:checked + span::after {
  margin-left: 20px;
}

.property select {
  width: 100%;
}

.property select:not(:active) {
  border-color: transparent;
  outline-color: transparent;
  background-color: transparent;
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
