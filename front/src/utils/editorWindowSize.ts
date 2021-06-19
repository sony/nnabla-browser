import $ from 'jquery'
import { AnyObject } from '@/types/basic'
import graphInfoState from '@/store/modules/graphInfo'
import { svgAreaOperator } from './svgAreaHelper'
import globalState from '@/store/modules/globalInfo'

const EditorWindowSize = {
  init: function (): void {
    this.changeSize()
  },
  bind: function (): void {
    $(window).resize(() => {
      this.changeSize()
    })
  },
  changeSize: function (): void {
    const _NullQueriedDom = {
      getBoundingClientRect: (): AnyObject => {
        return { width: 0, height: 0 }
      }
    }
    const boundingWidthOf = (selector: string): number =>
      ($(selector)[0] || _NullQueriedDom).getBoundingClientRect().width
    const boundingHeightOf = (selector: string): number =>
      ($(selector)[0] || _NullQueriedDom).getBoundingClientRect().height

    const windowWidth = $(window).outerWidth(true)
    const windowHeight = $(window).outerHeight(true)

    if (windowWidth === undefined) return
    if (windowHeight === undefined) return

    const leftContentWidth = boundingWidthOf('.left-content')
    const rightContentWidth = boundingWidthOf('.right-content')
    if (windowWidth - rightContentWidth < leftContentWidth) {
      $('.left-content').outerWidth(windowWidth - rightContentWidth - 10)
    }
    const contentWidth = windowWidth - leftContentWidth - rightContentWidth
    $('.center-content').outerWidth(contentWidth)

    const navbarHeight = boundingHeightOf('.editor-navbar')
    const contentHeight = windowHeight - navbarHeight
    $('.main-content').outerHeight(contentHeight)

    if (globalState.activeTabName === 'graph') {
      const graphsTabHeight = boundingHeightOf('.network-tabs')
      const networkActionHeight = boundingHeightOf('.network-action')
      const graphHeight =
        contentHeight - graphsTabHeight - networkActionHeight
      $('.network-editor-scroller').height(graphHeight)
      graphInfoState.SET_ASSIST_AREA_SIZE({
        x: $('.network-editor-scroller').width() as number,
        y: graphHeight
      })
      svgAreaOperator.adjustSvgSize()
    }
  }
}

export default EditorWindowSize
