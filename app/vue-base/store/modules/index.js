import Vue from 'vue'
import Vuex from 'vuex'

import { counter } from './counter'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    counter,
  },
})
