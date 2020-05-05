const path = require('path')

module.exports = {
  mode: 'production',
  entry: [
    './plugin/src/index.js',
  ],

  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, './plugin/src'),
    libraryTarget: 'umd'
  }
}
