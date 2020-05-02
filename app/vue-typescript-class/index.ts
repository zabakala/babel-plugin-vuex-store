/// <reference path="../../vuex.d.ts" />
import Vue from 'vue'

import { store } from './store/modules'

export default function (Hello: Vue.Component) {
    new Vue({
      el: '#app',
      store,

      components: {
        Hello
      },

      template: `<hello />`
    })
}
