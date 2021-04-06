path = require("path")
module.exports = {
  pages: {
    index: {
      entry: 'front/src/main.ts',
      template: 'front/public/index.html.tmpl',
      filename: 'index.html',
      title: 'nnabla browser',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  filenameHashing: true,
  devServer: {
    port: 8000,
    host: 'localhost'
  },
  outputDir: 'front/dist',
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
