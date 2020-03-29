import { COUNTER_GETTERS } from './_map'

export const getters = {
  [COUNTER_GETTERS.TOTAL] (state) {
    return state.count
  },

  [COUNTER_GETTERS.TOTAL_MULTIPLIED]: (state) => (multiplier) => {
    return state.count * multiplier
  },
}
