import { GetterTree } from 'vuex'
import { COUNTER_GETTERS } from './_map'
import { CounterState } from '../../../types'

export const getters: GetterTree<CounterState, any> = {
  [COUNTER_GETTERS.TOTAL] (state): number {
    return state.count
  },

  [COUNTER_GETTERS.TOTAL_MULTIPLIED]: (state: CounterState) => (multiplier: number): number => {
    return state.count * multiplier
  },
}