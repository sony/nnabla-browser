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

<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import $ from 'jquery'
import EditorWindowSize from '@/utils/editorWindowSize'
import Vue from 'vue'
import globalState from '@/store/modules/globalInfo'
import { serverEventHandler } from '@/utils/serverEventHandler'

let eventSrc: EventSource

export default Vue.extend({
  mounted: function () {
    EditorWindowSize.init()
    EditorWindowSize.bind()

    $.ajaxSetup({
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      xhrFields: { withCredentials: true }
    })

    this.setupSSE()

    if (this.$route.query.mode === 'sai') {
      document.documentElement.style.setProperty('--color-brand', '#D2017A')
    }

    // Load all NNabla APIs
    globalState.fetchNnablaApi()
  },
  methods: {
    // Set up server sent event.
    setupSSE: function (): void {
      if (process.env.NODE_ENV === 'development') {
        eventSrc = new EventSource('http://localhost:8888/sse', {
          withCredentials: true
        })
      } else {
        eventSrc = new EventSource('sse')
      }

      eventSrc.addEventListener(
        'uniqueId',
        serverEventHandler.createSSEConnectionIdListener,
        false
      )

      eventSrc.addEventListener(
        'initDirectoryStructure',
        serverEventHandler.initDirectoryStructureEventListener,
        false
      )

      eventSrc.addEventListener(
        'directoryStructure',
        serverEventHandler.directoryStructureEventListener,
        false
      )

      eventSrc.addEventListener(
        'fileContent',
        serverEventHandler.fileContentEventListener,
        false
      )

      eventSrc.addEventListener(
        'delete',
        serverEventHandler.deleteEventListener,
        false
      )

      eventSrc.addEventListener(
        'checkAlive',
        () => {
          /** do nothing **/
        },
        false
      )

      eventSrc.onerror = (): void => {
        eventSrc.close()
      }
    }
  }
})
</script>

<style>
@import url('http://fonts.googleapis.com/earlyaccess/notosansjp.css');

:root {
  --color-brand: #006699;
  --color-system1: #ff6666;
  --color-system2: #ffff00;
  --color-system3: #00ffff;
  --color-gray0: #ffffff;
  --color-gray1: #f2f2f2;
  --color-gray2: #d8d8d8;
  --color-gray3: #b2b2b2;
  --color-gray4: #8c8c8c;
  --color-gray5: #262626;

  --color-ragular: var(--color-gray5);
  --color-sub-text: var(--color-gray4);
  --color-disabled-text: var(--color-gray3);
  --color-link-text: var(--color-brand);
  --color-warning-text: var(--color-system1);

  --color-layer1: #77b3d1;
  --color-layer2: #df7f6d;
  --color-layer3: #7a997a;
  --color-layer4: #ccaf93;
  --color-layer5: #ac99bf;
  --color-layer6: var(--color-gray5);
  --color-layer7: var(--color-gray4);
  --color-layer8: var(--color-gray3);

  --bar-height: 40px;
}

body {
  margin: 0;
  padding: 0;
  font-size: 13px;
  font-family: 'Noto Sans JP', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

.app-row,
.app-col {
  overflow: hidden;
  position: absolute;
}

.app-row {
  left: 0;
  right: 0;
}

.app-col {
  top: 0;
  bottom: 0;
}

.app-scroll-x {
  overflow-x: auto;
}

.app-scroll-y {
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 16px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-gray2);
  border: 5px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 16px;
}

.pull-right {
  float: right;
  height: 100%;
}

.nnc-invoker {
  cursor: pointer;
}

.nnc-invoker.navbar-el:hover {
  background-color: var(--color-brand);
}

img.nnc-invoker:hover {
  opacity: 0.5;
}

img.nnc-enabled .nnc-enabled > img {
  opacity: 1;
}

span.nnc-enabled {
  color: var(--color-gray5);
  cursor: pointer;
}

img.nnc-enabled.navbar-img {
  filter: brightness(2);
}

img.nnc-disabled,
.nnc-disabled > img {
  opacity: 0.5;
}

span.nnc-disabled {
  color: var(--color-gray4);
  cursor: default;
}

img.nnc-disabled.navbar-img {
  filter: brightness(0.5);
}

.title {
  height: 40px;
  margin-top: 12px;
  margin-left: 16px;
}

.navbar-el {
  float: left;
  height: 40px;
  line-height: 40px;
}

.navbar-el.active {
  background-color: var(--color-brand);
}

.navbar-img {
  padding: 8px 8px 8px 8px;
  width: 40px;
  height: 40px;
}

.navbar-tab {
  margin: 0 16px 0 16px;
  font-size: 13px;
  color: var(--color-gray0);
}

.network-action,
.job-action {
  width: 100%;
  height: 41px;
  border-bottom: solid 1px var(--color-gray2);
  /* forbid wrap round */
  white-space: no-wrap;
  overflow: hidden;
}

.network-action-image,
.job-action-image {
  width: 24px;
  height: 24px;
  margin: 8px 4px 8px 4px;
  vertical-align: middle;
}

.network-action-text,
.job-action-text {
  font-size: 13px;
  color: var(--color-gray5);
  margin: 8px 4px 8px 4px;
  line-height: 40px;
  position: relative;
  z-index: 2;
}

.network-action-text.action-toggle {
  margin-left: 24px;
  margin-right: 8px;
}

.network-action-button {
  font-size: 16px;
  background-color: var(--color-gray0);
  border-color: var(--color-gray0);
  margin-bottom: 4px;
}

.component.active {
  color: var(--color-brand);
  background-color: var(--color-gray0);
}

.component:hover {
  color: var(--color-brand);
}

.component:focus {
  outline: none;
}

.jobs-area,
.datasets-area,
.configs-area {
  overflow: visible;
}

.layer-component {
  cursor: pointer;
}

.center-content-bar {
  height: 40px;
  border-bottom: solid 1px var(--color-gray2);
  line-height: 40px;
  vertical-align: middle;
  padding: 0 8px;
  overflow: hidden;
}
</style>
