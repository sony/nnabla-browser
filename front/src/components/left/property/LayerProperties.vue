// Copyright 2021 Sony Group Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
      v-for="(value, key) in ioInfos"
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
import Vue, { PropType } from 'vue'
import { AnyObject } from '@/types/basic'
import PropBool from '@/components/left/property/PropBool.vue'
import PropText from '@/components/left/property/PropText.vue'
import { RawFunction } from '@/types/nnablaApi'

export default Vue.extend({
  components: {
    'prop-text': PropText,
    'prop-bool': PropBool
  },
  props: {
    defaultParams: {
      type: Object as PropType<RawFunction>,
      required: true
    },
    layerParams: {
      type: Object,
      required: true
    },
    ioInfos: {
      type: Object,
      required: true
    }
  },
  computed: {
    filteredParams: function (): RawFunction {
      type paramKeys = keyof RawFunction
      const values: RawFunction = {} as RawFunction
      for (const [key, value] of Object.entries(this.defaultParams)) {
        if (key !== 'outputs' && key !== 'n_outputs') {
          values[key as paramKeys] = value
        }
      }
      return values
    }
  },
  methods: {
    getLayerParam: function (key: string): boolean | string | null {
      const name = key.replace(/_./g, (s: string) => s.charAt(1).toUpperCase())
      const params = this.layerParams[name]

      if (typeof params === 'undefined') return null

      if (
        typeof params === 'object' &&
        Object.prototype.hasOwnProperty.call(params, 'dim')
      ) {
        return '[' + Object.values(params.dim).join(', ') + ']'
      }

      if (typeof params === 'boolean') {
        return params
      }

      return String(params)
    },
    selectComponent: function (prop: AnyObject): string {
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
