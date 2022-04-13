// Copyright 2021 Sony Corporation.
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

import $ from 'jquery'
import { AnyObject } from '@/types/basic'

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
    // TODO: remove jQuery-based codes

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
  }
}

export default EditorWindowSize
