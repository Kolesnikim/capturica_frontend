module.exports = {
  devServer: {
    proxy: {
      '^/api/v5': {
        target: 'http://95.213.248.92:8000'
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
