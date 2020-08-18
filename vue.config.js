module.exports = {
  devServer: {
    proxy: {
      '^/api/v4': {
        target: 'http://5.178.85.92:9999'
      }
    }
    // proxy: [{
    //   context: ['api/v1'],
    //   target: 'http://5.188.114.46:8800'
    // }]
  },
  transpileDependencies: ['vuetify'],
  publicPath: '/'
}
