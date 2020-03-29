const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: {
    vue: 'vue',
    vue_base: path.resolve(__dirname, './app/vue-base'),
    vue_plugin_with_imports: path.resolve(__dirname, './app/vue-plugin/with-imports'),
    vue_plugin_without_imports: path.resolve(__dirname, './app/vue-plugin/without-imports'),
    vue_typescript_with_imports: path.resolve(__dirname, './app/vue-typescript/with-imports'),
    vue_typescript_without_imports: path.resolve(__dirname, './app/vue-typescript/without-imports'),
    vue_typescript_class_with_imports: path.resolve(__dirname, './app/vue-typescript-class/with-imports'),
    vue_typescript_class_without_imports: path.resolve(__dirname, './app/vue-typescript-class/without-imports'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: [
              'babel-loader',
            ],
          },
          cacheBusting: true,
        },
      },

      {
        test: /\.ts(x?)$/,
        loader: ['babel-loader'],
      },

      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
      new VueLoaderPlugin,
  ],

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },

    extensions: ['*', '.ts', '.vue', '.js', '.json'],
  },
}
