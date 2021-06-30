<template>
  <div
    id="network-container"
    v-zoom
  >
    <svg
      id="network-editor"
      tabindex="0"
    >
      <transition name="fade">
        <g
          v-show="isDragging"
          id="svg-assist-dots"
          class="assist-dots"
        >
          <g
            v-for="(col, key_col) in assistAreaX"
            :key="key_col"
          >
            <g
              v-for="(row, key_row) in assistAreaY"
              :key="key_row"
            >
              <circle
                :cx="col"
                :cy="row"
                r="1.0"
                style="fill: var(--color-brand)"
              />
            </g>
          </g>
        </g>
      </transition>
      <g
        id="graph-container"
        :transform="originTransform"
      >
        <g
          id="svg-layers"
          class="layers"
        >
          <g
            v-for="(node, index) in activeGraph.nodes"
            :id="'layer-' + index"
            :key="nntxtPath + '-layer-' + index"
            class="layer"
            :transform="createTransform(node, index)"
            @mousedown="clickLayer(index)"
          >
            <g
              v-if="node.type !== 'InputVariable'"
              class="link-circles top"
            >
              <circle
                class="linker"
                cx="100"
                cy="0"
                r="3.5"
              />
              <circle
                class="hide-linker top"
                cx="100"
                cy="0"
                r="9"
                opacity="0"
              />
            </g>
            <g
              v-if="node.type !== 'OutputVariable'"
              class="link-circles bottom"
            >
              <circle
                class="linker"
                cx="100"
                cy="40"
                r="3.5"
              />
              <circle
                class="hide-linker bottom"
                cx="100"
                cy="40"
                r="9"
                opacity="0"
                @mousedown.stop="clickLayer(index)"
              />
            </g>
            <rect
              class="layer-rect"
              v-bind="getNodeAttr()"
              :style="getNodeStyle(node)"
            />
            <text
              :style="getCapitalStyle()"
              v-bind="getCapitalAttr()"
            >
              {{ node.type.substring(0, 1) }}
            </text>
            <g
              class="text-component"
              v-bind="getTextComponentStyle()"
            >
              <text
                :style="getTextStyle()"
                v-bind="getTextAttr()"
              >
                {{ node.name }}
              </text>
            </g>
          </g>
        </g>

        <g
          id="svg-links"
          class="links"
          style="opacity: 0"
        >
          <path
            v-for="(link, index) in activeGraph.links"
            :id="'link-' + index"
            :key="nntxtPath + '-link-' + index"
            :stroke="linkLineStyleAttrs.stroke"
            :stroke-width="linkLineStyleAttrs['stroke-width']"
            :fill="linkLineStyleAttrs['fill']"
            :d="createLinkLineContext(link)"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import { Graph, Link, NextTransition, Node } from '@/types/graph'
import Vue, { PropType, VNode } from 'vue'
import { styleHelper, svgAreaOperator } from '@/utils/svgAreaHelper'
import { AnyObject } from '@/types/basic'
import { Definitions } from '@/utils/definitions'
import { RawFunction } from '@/types/nnablaApi'
import { Vector2D } from '@/types/geometry'
import graphInfoState from '@/store/modules/graphInfo'

const grid: number = Definitions.EDIT.GRID.SIZE
const originPosX = grid * 2
const originPosY = grid * 2

// define this variable outside Vue data to prevent infinite updates
const nextTransition: NextTransition[] = []

interface TransformInfo {
  graph: Element | null;
  translateX: number;
  translateY: number;
  scale: number;
}

export default Vue.extend({
  directives: {
    zoom: {
      inserted: function (el, binding, vNode: VNode): void {
        const getTransformInfo = (el: HTMLElement): TransformInfo => {
          const graph = el.querySelector('#graph-container')
          if (!graph) {
            return { graph: null, translateX: 0, translateY: 0, scale: 1 }
          }
          const transform =
            graph.getAttribute('transform') || this.originTransform
          const translateX =
            parseFloat(transform.split('translate(')[1].split(',')[0]) || 0
          const translateY =
            parseFloat(transform.split('translate(')[1].split(',')[1]) || 0
          const scale = parseFloat(transform.split('scale(')[1]) || 1

          return { graph, translateX, translateY, scale }
        }

        const setAssistAreaTransform = (
          el: HTMLElement,
          vNode: VNode
        ): void => {
          const { graph, translateX, translateY, scale } = getTransformInfo(el)
          if (!graph) return
          const newGrid = scale * grid
          const tempX = translateX % newGrid
          const tempY = translateY % newGrid
          const transX = tempX > 0 ? tempX - newGrid : tempX
          const transY = tempY > 0 ? tempY - newGrid : tempY
          Vue.set(vNode.context as Vue, 'isLargeScale', scale >= 1)

          const assistAreaDom = el.querySelector('#svg-assist-dots')
          if (!assistAreaDom) return
          assistAreaDom.setAttribute(
            'transform',
            `translate(${transX}, ${transY}) scale(${scale})`
          )
        }

        el.onselectstart = (): boolean => false
        el.onmousedown = function (event): void {
          const { graph, translateX, translateY, scale } = getTransformInfo(el)

          if (!graph) return

          el.onmousemove = function (ev): void {
            let a = ev.screenX - event.screenX
            let b = ev.screenY - event.screenY
            a = translateX + a
            b = translateY + b
            graph.setAttribute(
              'transform',
              `translate(${a}, ${b}) scale(${scale})`
            )
          }
          el.onmouseup = function (): void {
            el.onmousemove = null
            setAssistAreaTransform(el, vNode)
          }
          el.onmouseleave = function (): void {
            el.onmousemove = null
          }
        }

        el.addEventListener(
          'wheel',
          (event): void => {
            event.preventDefault()
            const pointerX = event.clientX
            const pointerY = event.clientY
            const svg = el.querySelector('#network-editor')
            if (!svg) return
            const svgClientX = svg.getBoundingClientRect().x
            const svgClientY = svg.getBoundingClientRect().y
            const svgClientH = svg.clientHeight

            let parentH = 0
            if (el.parentElement) parentH = el.parentElement.clientHeight

            const { graph, translateX, translateY, scale } = getTransformInfo(
              el
            )
            if (!graph) return

            if (event.ctrlKey) {
              // zoom action
              let newScale = scale + event.deltaY * -0.002
              let transX = translateX
              let transY = translateY
              // Restrict newScale
              newScale = Math.min(Math.max(0.05, newScale), 4)
              if (newScale !== scale) {
                transX =
                  pointerX -
                  (newScale / scale) * (pointerX - translateX - svgClientX) -
                  svgClientX
                transY =
                  pointerY -
                  (newScale / scale) * (pointerY - translateY - svgClientY) -
                  svgClientY
              }
              graph.setAttribute(
                'transform',
                `translate(${transX}, ${transY}) scale(${newScale})`
              )
            } else {
              // scroll action
              const nextY = Math.max(
                Math.min(translateY - event.deltaY, originPosY),
                -svgClientH + parentH
              )
              graph.setAttribute(
                'transform',
                `translate(${translateX}, ${nextY}) scale(${scale})`
              )
            }
            setAssistAreaTransform(el, vNode)
          },
          true
        )
      }
    }
  },
  props: {
    activeGraph: {
      type: Object as PropType<Graph>,
      required: true
    },
    prevGraph: {
      type: Object as PropType<Graph>,
      required: true
    },
    isDragging: {
      type: Boolean,
      required: true
    },
    assistAreaSize: {
      type: Object as PropType<Vector2D>,
      required: true
    },
    nntxtPath: {
      type: String,
      required: true
    },
    nnablaFunctions: {
      type: Array as PropType<RawFunction[]>,
      default: []
    }
  },
  computed: {
    assistAreaX: function (): number[] {
      return d3.range(0, this.assistAreaSize.x, grid)
    },
    assistAreaY: function (): number[] {
      return d3.range(0, this.assistAreaSize.y, grid)
    },
    linkLineStyleAttrs: styleHelper.createLinkLineStyle,
    originTransform: function (): string {
      return `translate(${originPosX}, ${originPosY}) scale(1)`
    }
  },
  watch: {
    activeGraph: function (val, oldVal): void {
      if (val !== oldVal) {
        const graphContainer = document.getElementById('graph-container')
        if (!graphContainer) return
        graphContainer.setAttribute('transform', this.originTransform)
      }
    }
  },
  updated: function () {
    svgAreaOperator.registerMouseEvent()

    if (nextTransition.length > 0) {
      svgAreaOperator.graphExchangeTransition(nextTransition)
      // clear existing items
      nextTransition.length = 0
    } else {
      svgAreaOperator.adjustSvgSize()
    }
    svgAreaOperator.adjustSvgSize()

    d3.select('#svg-links')
      .transition()
      .delay(500)
      .duration(500)
      .style('opacity', 1)
  },
  methods: {
    clickLayer: function (index: number): void {
      graphInfoState.SET_ACTIVE_LAYER_INDEX(index)
    },
    createTransform: function (node: Node, index: number): string {
      let ret = `translate(${node.position.x}, ${node.position.y})`
      if (Object.prototype.hasOwnProperty.call(this.prevGraph, 'nodes')) {
        const prev = this.prevGraph.nodes.find(x => x.name === node.name)
        if (prev) {
          nextTransition.push({ index, transform: ret })
          ret = `translate(${prev.position.x}, ${prev.position.y})`
        }
      }
      return ret
    },
    getAssistDotsStyle: (): { transform?: string; opacity?: number } => {
      const scroller = d3
        .select('div.tab-content.network-editor-scroller')
        .node()

      if (!scroller) return {}

      const moveToRight =
        Math.max(Math.ceil((scroller as Element).scrollLeft / grid), 0) * grid
      const moveToBottom =
        Math.max(Math.ceil((scroller as Element).scrollTop / grid), 0) * grid

      return {
        transform: 'translate(' + moveToRight + 'px, ' + moveToBottom + 'px)',
        opacity: 1.0
      }
    },
    getNodeAttr: (): AnyObject => styleHelper.createNodeAttr(),
    getNodeStyle: function (node: Node): AnyObject {
      return styleHelper.createNodeStyle(this.nnablaFunctions, node)
    },
    getCapitalAttr: (): AnyObject => styleHelper.createCapitalAttr(),
    getCapitalStyle: (): AnyObject => styleHelper.createCapitalStyle(),
    getTextComponentStyle: (): AnyObject => {
      return styleHelper.createTextComponentStyle()
    },
    getTextAttr: (): AnyObject => styleHelper.createTextAttr(),
    getTextStyle: (): AnyObject => styleHelper.createTextStyle(),
    createLinkLineContext: (link: Link): string => {
      const source = svgAreaOperator.getLinkerPosition(link.srcNodeId, true)
      const destination = svgAreaOperator.getLinkerPosition(
        link.destNodeId,
        false
      )
      return svgAreaOperator.createLinkLineContext(source, destination)
    }
  }
})
</script>

<style>
div#network-container {
  width: max-content;
}

.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-leave-to {
  opacity: 0;
}
</style>
