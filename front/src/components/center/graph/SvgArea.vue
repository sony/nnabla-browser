<template>
  <div id="network-container" v-zoom>
    <svg id="network-editor" tabindex="0">
      <transition name="fade">
        <g
          class="assist-dots"
          id="svg-assist-dots"
          v-show="isDragging && isLargeScale"
        >
          <g v-for="(col, key) in assistAreaX" :key="key">
            <g v-for="(row, key) in assistAreaY" :key="key">
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
      <g id="graph-container" :transform="originTransform">
        <g class="layers" id="svg-layers">
          <g
            class="layer"
            v-for="(node, index) in activeGraph.nodes"
            :id="'layer-' + index"
            :key="$store.state.graphInfo.nntxtPath + '-layer-' + index"
            :transform="createTransform(node, index)"
            @mousedown="clickLayer(index)"
          >
            <g class="link-circles top" v-if="node.type !== 'InputVariable'">
              <circle class="linker" cx="100" cy="0" r="3.5"></circle>
              <circle
                class="hide-linker top"
                cx="100"
                cy="0"
                r="9"
                opacity="0"
              />
            </g>
            <g
              class="link-circles bottom"
              v-if="node.type !== 'OutputVariable'"
            >
              <circle class="linker" cx="100" cy="40" r="3.5"></circle>
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
            ></rect>
            <text :style="getCapitalStyle()" v-bind="getCapitalAttr()">
              {{ node.type.substring(0, 1) }}
            </text>
            <g class="text-component" v-bind="getTextComponentStyle()">
              <text :style="getTextStyle()" v-bind="getTextAttr()">
                {{ node.name }}
              </text>
            </g>
          </g>
        </g>

        <g class="links" id="svg-links" style="opacity: 0">
          <path
            v-for="(link, index) in activeGraph.links"
            :key="$store.state.graphInfo.nntxtPath + '-link-' + index"
            :id="'link-' + index"
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
import { svgAreaOperator, styleHelper, Vector2D } from '@/utils/svgAreaHelper'
import { Definitions } from '@/utils/definitions'
import Vue, { VNode } from 'vue'
import * as d3 from 'd3'

import { Link, Graph, GraphInfoState } from '@/store/types'
import { NodeInfo } from '@/utils/serverEventHandler'

const grid: number = Definitions.EDIT.GRID.SIZE

// define this variable outside Vue data to prevent infinite updates
const nextTransition: any[] = []

/***************************************
 interface
 ***************************************/

interface DataType {
  isLargeScale: boolean;
}

interface ComputedType {
  graphState: GraphInfoState;
  activeGraph: Graph;
  prevGraph: Graph;
  isDragging: boolean;
  assistAreaSize: Vector2D;
  assistAreaX: number[];
  assistAreaY: number[];
  linkLineStyleAttrs: object;
  originTransform: string;
}

/***************************************/

export default Vue.extend<DataType, {}, ComputedType, {}>({
  data: function () {
    return {
      isLargeScale: true
    }
  },
  computed: {
    graphState: function () {
      return this.$store.state.graphInfo
    },
    activeGraph: function () {
      return this.$store.getters.activeGraph
    },
    prevGraph: function () {
      return this.graphState.prevGraph
    },
    isDragging: function () {
      return this.graphState.isDragging
    },
    assistAreaSize: function () {
      return this.graphState.assistAreaSize
    },
    assistAreaX: function () {
      return d3.range(0, this.assistAreaSize.x, grid)
    },
    assistAreaY: function () {
      return d3.range(0, this.assistAreaSize.y, grid)
    },
    linkLineStyleAttrs: styleHelper.createLinkLineStyle,
    originTransform: function () {
      return `translate(${grid * 2}, ${grid * 2}) scale(1)`
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
  watch: {
    activeGraph: function (val, oldVal) {
      if (val !== oldVal) {
        const graphContainer = document.getElementById('graph-container')
        if (!graphContainer) return
        graphContainer.setAttribute('transform', this.originTransform)
      }
    }
  },
  directives: {
    zoom: {
      inserted: function (el, binding, vNode: VNode) {
        const getTransformInfo = (el: HTMLElement) => {
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

        const setAssistAreaTransform = (el: HTMLElement, vNode: VNode) => {
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

        el.onselectstart = () => false
        el.onmousedown = function (event) {
          const { graph, translateX, translateY, scale } = getTransformInfo(el)

          if (!graph) return

          el.onmousemove = function (ev) {
            let a = ev.screenX - event.screenX
            let b = ev.screenY - event.screenY
            a = translateX + a
            b = translateY + b
            graph.setAttribute(
              'transform',
              `translate(${a}, ${b}) scale(${scale})`
            )
          }
          el.onmouseup = function (ev) {
            el.onmousemove = null
            setAssistAreaTransform(el, vNode)
          }
          el.onmouseleave = function (ev) {
            el.onmousemove = null
          }
        }

        el.addEventListener(
          'wheel',
          event => {
            event.preventDefault()
            const pointerX = event.clientX
            const pointerY = event.clientY
            const svg = el.querySelector('#network-editor')
            if (!svg) return
            const svgClientX = svg.getBoundingClientRect().x
            const svgClientY = svg.getBoundingClientRect().y

            const { graph, translateX, translateY, scale } = getTransformInfo(
              el
            )
            if (!graph) return

            if (event.ctrlKey) {
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
              graph.setAttribute(
                'transform',
                `translate(${translateX}, ${translateY -
                  event.deltaY}) scale(${scale})`
              )
            }
            setAssistAreaTransform(el, vNode)
          },
          true
        )
      }
    }
  },
  methods: {
    clickLayer: function (index: number) {
      this.$store.commit('setActiveLayerIndex', index)
    },
    createTransform: function (node: NodeInfo, index: number) {
      let ret = `translate(${node.x}, ${node.y})`
      if (Object.prototype.hasOwnProperty.call(this.prevGraph, 'nodes')) {
        const prev = this.prevGraph.nodes.find(x => x.name === node.name)
        if (prev) {
          nextTransition.push({ index, transform: ret })
          ret = `translate(${prev.x}, ${prev.y})`
        }
      }
      return ret
    },
    getAssistDotsStyle: () => {
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
    getNodeAttr: () => styleHelper.createNodeAttr(),
    getNodeStyle: (node: NodeInfo) => styleHelper.createNodeStyle(node),
    getCapitalAttr: () => styleHelper.createCapitalAttr(),
    getCapitalStyle: () => styleHelper.createCapitalStyle(),
    getTextComponentStyle: () => styleHelper.createTextComponentStyle(),
    getTextAttr: () => styleHelper.createTextAttr(),
    getTextStyle: () => styleHelper.createTextStyle(),
    createLinkLineContext: (link: Link) => {
      const source = svgAreaOperator.getLinkerPosition(link.source, true)
      const destination = svgAreaOperator.getLinkerPosition(
        link.destination,
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
