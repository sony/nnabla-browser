module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      // template: 'public/index.html',
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
        vue$: 'vue/dist/vue.esm.js'
      }
    },
    plugins: []
  }
}
