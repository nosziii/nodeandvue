module.exports = {
    devServer: {
      // proxyTable: {
      //   "/api": "http://localhost:3080"
      // },
      proxy: {
        '^/api': {
          target: 'http://localhost:3080',
          changeOrigin: true
        },
      }
    }
  }