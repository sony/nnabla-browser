path = require("path");
module.exports = {
  pages: {
    index: {
      entry: 'front/src/main.ts',
      filename: 'index.html',
      title: 'NNabla Browser',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  filenameHashing: true,
  devServer: {
    port: 8888,
    host: 'localhost'
  },
  css: {},
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, 'front/src/')
      }
    },
    plugins: []
  }
}
