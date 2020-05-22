import { VX_COUNTER_GETTERS } from './_map'

export const getters = {
  [VX_COUNTER_GETTERS.TOTAL] (state) {
    return state.count
  },

  [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED]: (state) => (multiplier) => {
    return state.count * multiplier
  },
}
