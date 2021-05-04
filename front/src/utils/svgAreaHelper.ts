import * as d3 from 'd3'
import { DrawingLinkMemory, Link, NextTransition, Node, TempLink } from '@/types/graph'
import { AnyObject } from '@/types/basic'
import { Definitions } from '@/utils/definitions'
import { RawFunction } from '@/types/nnablaApi'
import { Vector2D } from '@/types/geometry'
import { nnablaCore } from './nnablaApi'
import store from '@/store'

const layerDef = Definitions.EDIT.LAYER

class StyleHelper {
  getDefaultComponent (layerType: string): RawFunction {
    return nnablaCore.findFunction(layerType)
  }

  getLayerColor (layerType: string): string {
    return this.getDefaultComponent(layerType).color
  }

  createNodeAttr (): AnyObject {
    return { width: layerDef.RECT_WIDTH, height: layerDef.RECT_HEIGHT }
  }

  createNodeStyle (node: Node): AnyObject {
    return {
      fill: this.getLayerColor(node.type),
      stroke: this.getLayerColor(node.type)
    }
  }

  createCapitalAttr (): AnyObject {
    return {
      x: layerDef.DROPCAP_CHAR.OFFSET_X,
      y: layerDef.DROPCAP_CHAR.OFFSET_Y
    }
  }

  createCapitalStyle (): AnyObject {
    return {
      fill: layerDef.DROPCAP_CHAR.FONTCOLOR,
      'font-size': layerDef.DROPCAP_CHAR.FONTSIZE,
      'pointer-events': 'none',
      'text-anchor': layerDef.DROPCAP_CHAR.TEXT_ANCHOR
    }
  }

  createTextComponentStyle (): AnyObject {
    return {
      'clip-path': `url(#${layerDef.CLIP_PATH.ID})`,
      transform: `translate(${layerDef.CLIP_PATH.OFFSET_X},${Definitions.EDIT.LAYER.CLIP_PATH.OFFSET_Y})`
    }
  }

  createTextAttr (): AnyObject {
    return {
      x: layerDef.NAME_LABEL.OFFSET_X,
      y: layerDef.NAME_LABEL.OFFSET_Y
    }
  }

  createTextStyle (): AnyObject {
    return {
      'pointer-events': 'none',
      fill: layerDef.NAME_LABEL.FONTCOLOR,
      'font-size': layerDef.NAME_LABEL.FONTSIZE
    }
  }

  createLinkLineStyle (): AnyObject {
    return {
      stroke: '#262626',
      'stroke-width': '1.5',
      fill: 'none'
    }
  }
}

export const styleHelper = new StyleHelper()

// SvgAreaOperator
class SvgAreaOperator {
  drawingLinkMemory: DrawingLinkMemory
  connectedLinks: TempLink[]
  focusLayerRect: any

  constructor () {
    this.drawingLinkMemory = {
      srcNodeId: -1,
      destNodeId: -1,
      delta: { x: 0, y: 0 }
    }
    this.connectedLinks = []
  }

  adjustSvgSize (): void {
    // todo: refactor
    const svg = d3.select('svg#network-editor')
    const svgLayers = svg.select('#svg-layers')

    const node1 = svgLayers.node()
    if (node1 !== null) {
      const node2 = d3.select('div.tab-content.network-editor-scroller').node()

      if (node2 != null) {
        const layersDOM = (node1 as Element).getClientRects()[0]

        svg.attr(
          'width',
          Math.max(
            (node2 as Element).clientWidth,
            layersDOM.width + layerDef.GRID * 4
          )
        )
        svg.attr(
          'height',
          Math.max(
            (node2 as Element).clientHeight,
            layersDOM.height + layerDef.GRID * 4
          )
        )
      }
    }
  }

  getTranslateCoordinate (node: HTMLElement): number[] {
    // str == "translate(x, y)"
    const str = d3.select(node).attr('transform')

    const tmp = str.split('(')[1].split(',')

    const x = tmp[0].trim()
    const y = tmp[1].trim().split(')')[0]

    return [parseInt(x), parseInt(y)]
  }

  getLayerIndex (layerNode: HTMLElement): number {
    return Number(layerNode.id.split('-')[1])
  }

  getLayerPosition (layerIndex: number): Vector2D {
    const targetLayer: Node = store.getters.activeGraph.nodes[layerIndex]
    return { x: targetLayer.position.x, y: targetLayer.position.y }
  }

  getLinkerPosition (layerIndex: number, isSourceNode: boolean): Vector2D {
    let { x, y } = this.getLayerPosition(layerIndex)

    x += layerDef.GRID * 5
    y += isSourceNode ? layerDef.GRID * 2 : 0

    return { x, y }
  }

  checkOverlapLayers (v1: Vector2D, v2: Vector2D): boolean {
    const layerWidth = layerDef.RECT_WIDTH
    const layerHeight = layerDef.RECT_HEIGHT

    const s1 = Math.max(v1.x, v2.x)
    const t1 = Math.max(v1.y, v2.y)
    const s2 = Math.min(v1.x + layerWidth, v2.x + layerWidth)
    const t2 = Math.min(v1.y + layerHeight, v2.y + layerHeight)

    return s2 - s1 > 0 && t2 - t1 > 0
  }

  getOverlapLayerPosition (v: Vector2D, layerIndex: number): Vector2D | null {
    // todo: nearest neighbor search

    const numLayers = store.getters.activeGraph.nodes.length

    for (let i = 0; i < numLayers; i++) {
      if (i === layerIndex) continue

      const position = this.getLayerPosition(i)
      if (this.checkOverlapLayers(v, position)) return position
    }

    return null
  }

  getCorrectPosition (x: number, y: number): number[] {
    const grid: number = layerDef.GRID
    const X = Math.max(Math.round(x / grid), 0) * grid
    const Y = Math.max(Math.round(y / grid), 0) * grid

    return [X, Y]
  }

  layerDefocusing (): void {
    this.focusLayerRect
      .transition()
      .ease(d3.easeCircleOut)
      .duration(300)
      .style('fill-opacity', 0.2)
      .style('stroke-opacity', 0)
      .attr('transform', 'translate(-10, -10) scale(1.1, 1.5)')
      .remove()
  }

  layerFocusing (node: HTMLElement): void {
    if (typeof this.focusLayerRect !== 'undefined') {
      // if the same layer is clicked again, do nothing
      if (
        d3
          .select(node)
          .selectAll('rect')
          .nodes().length > 1
      ) {
        return
      }

      this.layerDefocusing()
    }

    this.focusLayerRect = d3.select(node).append('rect')

    this.focusLayerRect
      .attr('width', layerDef.RECT_WIDTH)
      .attr('height', layerDef.RECT_HEIGHT)
      .attr('transform', 'translate(-10, -10) scale(1.1, 1.5)')
      .style('fill', 'black')
      .style('fill-opacity', 0.2)
      .style('stroke', 'black')
      .style('stroke-opacity', 0)
      .transition()
      .ease(d3.easeCircleOut)
      .duration(500)
      .style('fill-opacity', 0.5)
      .style('stroke-opacity', 0.5)
      .attr('transform', 'translate(0, 0) scale(1, 1)')
  }

  createLinkLineContext (v1: Vector2D, v2: Vector2D): string {
    const offset = layerDef.GRID / 2
    let points: number[][] = []

    const context = d3.path()

    const x1 = v1.x
    const y1 = v1.y
    const x2 = v2.x
    const y2 = v2.y

    context.moveTo(x1, y1)

    if (y2 - y1 > offset * 2 && Math.abs(x1 - x2) > offset * 2) {
      const halfY = (y1 + y2) / 2
      const sign = x1 < x2 ? 1 : -1

      points = [
        [x1, halfY - offset],
        [x1, halfY, x1 + sign * offset, halfY], // cx, cy, x, y
        [x2 - sign * offset, halfY],
        [x2, halfY, x2, halfY + offset] // cx, cy, x, y
      ]
    } else if (y1 > y2) {
      const halfX = offset * 18
      const sign = x1 + halfX < x2 ? 1 : -1

      points = [
        [x1, y1 + offset, x1 + offset, y1 + offset], // cx, cy, x, y
        [x1 + halfX - offset, y1 + offset],
        [x1 + halfX, y1 + offset, x1 + halfX, y1], // cx, cy, x, y
        [x1 + halfX, y2],
        [x1 + halfX, y2 - offset, x1 + halfX + sign * offset, y2 - offset], // cx, cy, x, y
        [x2 - sign * offset, y2 - offset],
        [x2, y2 - offset, x2, y2] // cx, cy, x, y
      ]
    }

    for (const point of points) {
      point.length === 2
        ? context.lineTo(point[0], point[1])
        : context.quadraticCurveTo(point[0], point[1], point[2], point[3])
    }

    context.lineTo(x2, y2)

    return context.toString()
  }

  // for layer event
  getLayerDragStart (
    selection: d3.Selection<d3.BaseType, unknown, d3.BaseType, unknown>
  ) {
    return (event: Event, elem: HTMLElement): void => {
      const index = selection.nodes().indexOf(elem)

      this.layerFocusing(elem)

      store.commit('startDragging')

      // get all links connecting this layer
      const links: Link[] = store.getters.activeLinks(index)

      this.connectedLinks = []

      for (const link of links) {
        let insert: TempLink
        if (link.srcNodeId === index) {
          insert = {
            index: link.index as number,
            destPosition: this.getLinkerPosition(link.destNodeId, false),
            update: function (v: Vector2D): void {
              this.srcPosition = {
                x: v.x + layerDef.GRID * 5,
                y: v.y + layerDef.GRID * 2
              }
            }
          }
        } else if (link.destNodeId === index) {
          insert = {
            index: link.index as number,
            srcPosition: this.getLinkerPosition(link.srcNodeId, true),
            update: function (v: Vector2D): void {
              this.destPosition = { x: v.x + layerDef.GRID * 5, y: v.y }
            }
          }
        } else {
          continue
        }
        if (Object.keys(insert).length > 0) {
          this.connectedLinks.push(insert)
        }
      }
    }
  }

  getLayerDragging (): (arg1: any, arg2: HTMLElement) => void {
    // bind functions of this
    const getTranslateCoordinate = this.getTranslateCoordinate
    const createLinkLineContext = this.createLinkLineContext
    const getCorrectPosition = this.getCorrectPosition

    return (event: any, elem: HTMLElement): void => {
      // remove auxiliary layer
      d3.select('#svg-layers')
        .select('rect#auxiliary-layer')
        .remove()

      const [currentX, currentY] = getTranslateCoordinate(elem)

      const x = currentX + event.dx
      const y = currentY + event.dy
      d3.select(elem).attr('transform', `translate(${x}, ${y})`)

      // redraw all links
      for (const link of this.connectedLinks) {
        link.update({ x, y } as Vector2D)
        d3.select('path#link-' + link.index).attr(
          'd',
          createLinkLineContext(link.srcPosition as Vector2D, link.destPosition as Vector2D)
        )
      }

      // show end position
      const [endX, endY] = getCorrectPosition(x, y)
      const { width, height } = styleHelper.createNodeAttr()

      d3.select('#svg-layers')
        .append('rect')
        .attr('id', 'auxiliary-layer')
        .attr('x', endX)
        .attr('y', endY)
        .attr('width', width as number)
        .attr('height', height as number)
        .style('fill', 'none')
        .style('stroke', 'var(--color-brand)')
        .style('stroke-dasharray', 3)
        .style('stroke-opacity', 0.4)
        .lower()
    }
  }

  getLayerDragEnd (
    selection: d3.Selection<d3.BaseType, unknown, d3.BaseType, unknown>
  ) {
    return (event: Event, elem: HTMLElement): void => {
      const index = selection.nodes().indexOf(elem)

      let [x, y] = this.getTranslateCoordinate(elem)

      // auto positioning
      while (true) {
        [x, y] = this.getCorrectPosition(x, y)

        const overlapLayerPosition = this.getOverlapLayerPosition(
          { x, y },
          index
        )
        if (!overlapLayerPosition) {
          break
        }

        x = overlapLayerPosition.x + layerDef.RECT_WIDTH + layerDef.GRID
        y = overlapLayerPosition.y + layerDef.RECT_HEIGHT + layerDef.GRID
      }

      // redraw all links
      for (const link of this.connectedLinks) {
        link.update({ x, y })
        d3.select('path#link-' + link.index)
          .transition()
          .ease(d3.easeCubicOut)
          .duration(500)
          .attr('d', this.createLinkLineContext(link.srcPosition as Vector2D, link.destPosition as Vector2D))
      }

      this.connectedLinks = []

      d3.select(elem)
        .transition()
        .ease(d3.easeCubicOut)
        .duration(500)
        .attr('transform', `translate(${x}, ${y})`)
        .on('end', () => {
          store.commit('setNodePosition', { index: index, x, y }) // layerIndex
          this.adjustSvgSize()
          store.commit('endDragging')
        })

      // remove auxiliary layer
      d3.select('#svg-layers')
        .selectAll('rect#auxiliary-layer')
        .transition()
        .duration(300)
        .attr('opacity', 0)
        .remove()
    }
  }

  getLayerClicked (): (arg1: any) => void {
    return (event: any): void => {
      this.layerFocusing(event.currentTarget.parentNode)
    }
  }

  getLayerMouseOver (): (arg1: any) => void {
    return (event: any): void => {
      const elem = event.currentTarget
      d3.select(elem)
        .select('rect')
        .attr('fill-opacity', '0.5')
      this.drawingLinkMemory.destNodeId = this.getLayerIndex(elem)
    }
  }

  getLayerMouseOut (): (arg1: any) => void {
    return (event: any): void => {
      const elem = event.currentTarget
      d3.select(elem)
        .select('rect')
        .attr('fill-opacity', '1')
      this.drawingLinkMemory.destNodeId = -1
    }
  }

  // for link event
  getLinkDragStart (): (arg1: any) => void {
    return (event: any): void => {
      const elem = event.sourceEvent.currentTarget

      this.layerFocusing(elem.parentNode.parentNode)
      d3.select(elem.parentNode)
        .select('.linker')
        .style('fill', 'var(--color-system3)')
      this.drawingLinkMemory.srcNodeId = this.getLayerIndex(
        elem.parentNode.parentNode
      )
      const lineIndex = d3
        .select('#svg-links')
        .selectAll('path')
        .nodes().length
      this.drawingLinkMemory.tmpLine = d3
        .select('#svg-links')
        .append('path')
        .attr('id', 'link-' + lineIndex)
    }
  }

  getLinkDragging (): (arg1: any) => void {
    return (event: any): void => {
      let [x, y] = d3.pointer(event)

      if (event.dx) {
        this.drawingLinkMemory.delta.x = Math.sign(event.dx) * 2
      }
      if (event.dy) {
        this.drawingLinkMemory.delta.y = Math.sign(event.dy) * 2
      }

      x -= this.drawingLinkMemory.delta.x
      y -= this.drawingLinkMemory.delta.y

      const context = this.createLinkLineContext(
        this.getLinkerPosition(this.drawingLinkMemory.srcNodeId, true),
        { x, y }
      )

      const line = this.drawingLinkMemory.tmpLine as d3.Selection<
        SVGPathElement,
        unknown,
        HTMLElement,
        any
      >

      line
        .attr('d', context)
        .style('fill', 'none')
        .style('stroke', 'var(--color-system3)')
        .style('stroke-width', '1.5')
    }
  }

  getLinkDragEnd (): (arg1: any) => void {
    return (event: any): void => {
      const elem = event.currentTarget

      const m = this.drawingLinkMemory

      const line = m.tmpLine as d3.Selection<
        SVGPathElement,
        unknown,
        HTMLElement,
        any
      >

      if (m.destNodeId !== null) {
        const context = this.createLinkLineContext(
          this.getLinkerPosition(m.srcNodeId, true),
          this.getLinkerPosition(m.destNodeId, false)
        )

        line
          .attr('d', context)
          .style('stroke', 'var(--color-gray5)')
          .style('stroke-width', '1.5')
          .style('stroke-opacity', null)

        store.commit('addNewLink', m)
      }

      line.remove()

      this.drawingLinkMemory = {
        srcNodeId: -1,
        destNodeId: -1,
        delta: { x: 0, y: 0 }
      }

      d3.select(elem.parentNode)
        .select('.linker')
        .style('fill', null)
    }
  }

  graphExchangeTransition = (transitionList: NextTransition[]): void => {
    for (const elm of transitionList) {
      d3.select('#layer-' + elm.index)
        .transition()
        .duration(1000)
        .ease(d3.easeCubicOut)
        .attr('transform', elm.transform)
        .on('end', () => this.adjustSvgSize())
    }
  }

  registerMouseEvent (): void {
    const allLayers = d3.selectAll('#svg-layers .layer')

    if (allLayers.nodes().length > 0) {
      // drag event
      allLayers.data(allLayers).call(
        d3
          .drag<any, any>()
          .on('start', this.getLayerDragStart(allLayers))
          .on('drag', this.getLayerDragging())
          .on('end', this.getLayerDragEnd(allLayers))
      )

      // click event
      // allLayers.select('rect.layer-rect').on('click', this.getLayerClicked())
      allLayers.on('click', this.getLayerClicked())

      // mouse over event
      allLayers
        .on('mouseover', this.getLayerMouseOver())
        .on('mouseout', this.getLayerMouseOut())

      // linker event

      allLayers.selectAll('circle.hide-linker.bottom').call(
        d3
          .drag<any, any>()
          .on('start', this.getLinkDragStart())
          .on('drag', this.getLinkDragging())
          .on('end', this.getLinkDragEnd())
      )
    }
  }
}

export const svgAreaOperator = new SvgAreaOperator()
