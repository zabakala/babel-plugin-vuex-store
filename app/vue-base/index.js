import Vue from 'vue'

import Hello from './components'
import { store } from './store/modules'

new Vue({
  el: '#app',
  store,

  components: {
    Hello
  },

  template: `<hello />`
})
