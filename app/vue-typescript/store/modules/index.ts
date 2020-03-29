import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { counter } from './counter'
import { CounterState } from '../../types'

Vue.use(Vuex)

export const store: Store<CounterState> = new Vuex.Store({
  modules: {
    counter,
  },
})
