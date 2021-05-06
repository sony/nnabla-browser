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
