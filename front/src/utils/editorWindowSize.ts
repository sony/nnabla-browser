// todo:  must be refactored

import store from '@/store'
import { svgAreaOperator } from './svgAreaHelper'

import $ from 'jquery'

const EditorWindowSize = {
  init: function () {
    this.changeSize()
  },
  bind: function () {
    $(window).resize(e => {
      this.changeSize()
    })
  },
  changeSize: (() => {
    const _NullQueriedDom = {
      getBoundingClientRect: () => {
        return { width: 0, height: 0 }
      }
    }
    const boundingWidthOf = (selector: any) =>
      ($(selector)[0] || _NullQueriedDom).getBoundingClientRect().width
    const boundingHeightOf = (selector: any) =>
      ($(selector)[0] || _NullQueriedDom).getBoundingClientRect().height

    return function () {
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

      if (store.state.editor.activeTabName === 'graph') {
        const graphsTabHeight = boundingHeightOf('.network-tabs')
        const networkActionHeight = boundingHeightOf('.network-action')
        const graphHeight =
          contentHeight - graphsTabHeight - networkActionHeight
        $('.network-editor-scroller').height(graphHeight)
        store.commit('setAssistAreaSize', {
          x: $('.network-editor-scroller').width(),
          y: graphHeight
        })
        svgAreaOperator.adjustSvgSize()
      }
    }
  })()
}

export default EditorWindowSize
