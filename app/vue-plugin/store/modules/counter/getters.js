import { VX_COUNTER_GETTERS } from './_map'

const vxGetters = {
  [VX_COUNTER_GETTERS.TOTAL] (state) {
    return state.count
  },

  [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED]: (state) => (multiplier) => {
    return state.count * multiplier
  },
}

export const getters = vxGetters
