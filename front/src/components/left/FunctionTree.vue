<template>
  <div>
    <component-palette
      class="app-row"
      style="top: 0; bottom: 50%; border-bottom: 1px solid var(--color-gray2);"
      @history="command => $emit('history', command)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import nnablaCore from '../../../lib/js/nnablaCore'

interface PalleteDataType {
  expand: boolean;
}

interface PalletePropsType {
  category: string;
  contents: object;
}

const functionComponent = {
  props: ['layer'],
  template: `
                <div class="function">
                {{layer.snake_name}}
                </div>`
}

const baseFunctionComponent = Vue.extend({
  props: ['layers', 'base_category'],
  template: `
                <div class="branch">
                    <div class="branch-name" @click="expand = !expand;">
                        <img class="icon-small" :src="expandArrow" >
                        {{ base_category }}
                    </div>

                     <div class="components" :style="{display: expand ? 'block' : 'none'}">
                        <function-component v-for="(layer, name) in layers" :key="name" :layer="layer"/>
                    </div>
                </div>`,
  data: function (): PalleteDataType {
    return { expand: false }
  },
  components: {
    'function-component': functionComponent
  },
  computed: {
    expandArrow: function (): string {
      return './editor/image/Arrow' + (this.expand ? 'Down' : '') + '.svg'
    }
  }
})

export default Vue.extend<PalleteDataType, {}, {}, PalletePropsType>({
  components: {
    'component-palette': {
      template: `
            <div>
                <div class="title">NNabla Functions</div>
                <div class="app-row app-scroll-x app-scroll-y" style="top: 40px; bottom: 0; padding: 0 16px 0 16px;">
                    <component-category
                        v-for="(contents, category) in nnablaFunctions"
                        :key="category"
                        :category="category"
                        :contents="contents"
                        />
                </div>
            </div>`,
      data: () => {
        // return { nnablaFunctions: nnablaCore }
        return { nnablaFunctions: {} }
      },
      components: {
        'component-category': {
          props: {
            category: String,
            contents: Object
          },
          template: `
                    <div class="branch">
                        <div class="branch-name" @click="expand = !expand;">
                            <img class="icon-small" :src="expandArrow" >
                            {{ category }}
                        </div>

                        <div class="components" :style="{display: expand ? 'block' : 'none'}">
                            <div v-if="isBaseFunctions">
                                <base-function-component
                                    v-for="(layers, base_category) in contents"
                                    :key="base_category"
                                    :layers="layers"
                                    :base_category="base_category" />
                            </div>

                            <div v-else>
                                 <function-component v-for="(layer, name) in contents" :key="name" :layer="layer"/>
                            </div>
                        </div>
                    </div>`,
          data: function () {
            return { expand: false }
          },
          computed: {
            isBaseFunctions: function (): boolean {
              return this.category === 'base_functions'
            },
            expandArrow: function (): string {
              return (
                './editor/image/Arrow' + (this.expand ? 'Down' : '') + '.svg'
              )
            }
          },
          components: {
            'base-function-component': baseFunctionComponent,
            'function-component': functionComponent
          }
        }
      }
    }
  }
})
</script>

<style>
.components .function {
  margin-left: 10px;
  cursor: pointer;
}

.components .function:hover {
  color: var(--color-brand);
}
</style>
