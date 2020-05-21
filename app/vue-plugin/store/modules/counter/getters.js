import { COUNTER_GETTERS } from './_map'

const vxGetters = {
  [COUNTER_GETTERS.TOTAL] (state) {
    return state.count
  },

  [COUNTER_GETTERS.TOTAL_MULTIPLIED]: (state) => (multiplier) => {
    return state.count * multiplier
  },
}

export const getters = vxGetters
