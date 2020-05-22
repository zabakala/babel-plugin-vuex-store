import { GetterTree } from 'vuex'
import { VX_COUNTER_GETTERS } from './_map'
import { CounterState } from '../../../types'

const vxGetters: GetterTree<CounterState, any> = {
  [VX_COUNTER_GETTERS.TOTAL] (state): number {
    return state.count
  },

  [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED]: (state: CounterState) => (multiplier: number): number => {
    return state.count * multiplier
  },
}

export const getters = vxGetters
