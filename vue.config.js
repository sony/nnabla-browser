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

path = require("path")
module.exports = {
  pages: {
    index: {
      entry: 'front/src/main.ts',
      template: 'front/public/index.html.tmpl',
      filename: 'index.html',
      title: 'NNabla Browser',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  filenameHashing: true,
  devServer: {
    port: 8000,
    host: 'localhost'
  },
  outputDir: 'nnabla_browser/dist',
  assetsDir: 'static',
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, 'front/src/')
      }
    }
  }
}
