import Vue from 'vue'

import { store } from './store/modules'

export default function (Hello) {
  new Vue({
    el: '#app',
    store,

    components: {
      Hello
    },

    template: `<hello />`
  })
}
