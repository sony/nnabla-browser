<template>
  <div>
    <property-area class="app-row" style="height: 50%; bottom: 0;" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Definitions } from '@/utils/definitions'
import { allFunctions } from '@/utils/nnablaApi'

// type definition
// todo: refactoring
interface DefaultParam {
  default: boolean;
}

interface PropertyProp {
  defaultParam: DefaultParam;
  layerParam: string | boolean;
}

interface Selectedlayer {
  outputShape: string;
  type: string;
  length: number;
  [key: string]: any;
}

interface ComputedPropertyArea {
  selectedLayer: Selectedlayer;
  isLayerSelected: boolean;
  defaultProps: object;
  layerParmas: object;
  ioInfos: object;
}

export default Vue.extend<{}, {}, ComputedPropertyArea, {}>({
  components: {
    'property-area': {
      template: `
            <div class="property-area">
                <div class="title">Layer Property</div>
                <div v-if="isLayerSelected">
                    <layer-type :defaultProps="defaultProps" />
                    <layer-properties class="app-row app-scroll-x app-scroll-y" style="top: 88px; bottom: 0;"
                        :defaultParams="{...defaultProps.inputs, ...defaultProps.arguments}"
                        :layerParams="layerParams" :ioInfos="ioInfos"
                    />
                </div>
            </div>`,
      computed: {
        selectedLayer: function () {
          return this.$store.getters.activeLayer
        },
        isLayerSelected: function () {
          return Object.keys(this.selectedLayer).length > 0
        },
        defaultProps: function () {
          return allFunctions.find(
            x => x.layer_name === this.selectedLayer.type
          )
        },
        layerParams: function () {
          const paramKey: string =
            this.selectedLayer.type.toLowerCase() + 'Param'
          return this.selectedLayer[paramKey] || {}
        },
        ioInfos: function () {
          // return input/output related info,ie. shapes etc.
          return {
            outputShape: this.selectedLayer.outputShape
          }
        }
      },
      components: {
        'layer-type': Vue.extend({
          props: { defaultProps: Object },
          template: `
                    <div class="layer">
                        <div class="drop-cap" :style="{'background-color': '#' + defaultProps.color.substring(2)}">
                            {{ defaultProps.layer_name.substring(0, 1) }}
                         </div>
                        <div class="name">{{ defaultProps.layer_name }}</div>
                        <a title="Refer documentation" :href="getDocUrl()" target="_blank">
                            <img src="./editor/image/Link.svg" border="0">
                        </a>
                    </div>`,
          methods: {
            getDocUrl: function () {
              const APIDEF = Definitions.NNABLA_CORE_API
              let url
              if (
                (this.defaultProps.api_type || '') ===
                'parametric_functions_api'
              ) {
                url = APIDEF.PF_DOC_URL + '#nnabla.parametric_functions.'
              } else {
                url = APIDEF.F_DOC_URL + '#nnabla.functions.'
              }

              return url + this.defaultProps.snake_name
            }
          }
        }),
        'layer-properties': Vue.extend({
          props: {
            defaultParams: Object,
            layerParams: Object,
            ioInfos: Object
          },
          template: `
                    <div>
                        <div class="property" v-for="value, key in defaultParams" v-if="key !== 'outputs' && key !== 'n_outputs'">
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
                        <div class="property" v-for="value, key in ioInfos.outputShape">
                            <div class="content">
                                <div class="name">{{ key }}</div>
                                <component :is="'prop-text'" :defaultParam="{}" :layerParam="'['+value.join(', ')+']'" :class="'value'" />
                            </div>
                        </div>
                    </div>`,
          components: {
            'prop-text': Vue.extend<{}, {}, {}, PropertyProp>({
              props: {
                defaultParam: Object,
                layerParam: String
              },
              template: `
                            <div>
                                <input type="text" :value="getValue()" />
                            </div>`,
              methods: {
                getValue: function () {
                  if (this.layerParam !== null) return this.layerParam
                  return this.defaultParam.default
                }
              }
            }),
            'prop-bool': Vue.extend<{}, {}, {}, PropertyProp>({
              props: {
                defaultParam: Object,
                layerParam: Boolean
              },
              template: `
                            <div>
                                <label>
                                    <input type="checkbox" ref="check" :checked="checked" />
                                    <span />
                                </label>
                            </div>`,
              computed: {
                checked: function () {
                  if (this.layerParam !== null) return this.layerParam
                  return this.defaultParam.default
                }
              }
            }),
            'prop-select': {
              props: ['defaultParam', 'layerParam'],
              template: `
                            <select :value="defaultParam.value">
                                <option v-for="value in defaultParam.choice" :checked="value === defaultParam.value">
                                    {{ value }}
                                </option>
                            </select>`
            }
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
          }
        })
      }
    }
  }
})
</script>

<style>
.property-area .title {
  margin-top: 0;
  padding-top: 12px;
}

.property-area .layer {
  font-family: 'SSTUI-Medium';
  margin-top: 8px;
  font-size: 16px;
  width: 100%;
  height: 24px;
}

.property-area .layer > .drop-cap {
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

.property-area .layer > .name {
  position: absolute;
  left: 48px;
  right: 40px;
  line-height: 24px;

  overflow-x: hidden;
}

.property-area .layer > a {
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

.property-area .property {
  padding: 0;
  margin: 0;
  padding-left: 16px;
  padding-right: 16px;
}

.property-area .property .content {
  height: 25px;
  border-bottom: solid 1px var(--color-gray2);
  padding-top: 3px;
}

.property-area .property .name {
  float: left;
  overflow: hidden;
  color: var(--color-gray4);
  width: 50%;
  padding-right: 4px;
}

.property-area .property .value {
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
