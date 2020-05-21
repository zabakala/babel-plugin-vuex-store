import { GetterTree } from 'vuex'
import { NESTED_GETTERS } from './_map'
import { CounterState, NestedState } from '../../../../types'

const vxGetters: GetterTree<NestedState, CounterState> = {
  [NESTED_GETTERS.RANDOM_MULTIPLIED]: (state) => (multiplier: number): number => {
    return state.nestedRandom * multiplier
  },
}

export const getters = vxGetters
