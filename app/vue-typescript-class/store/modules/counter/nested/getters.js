import { VX_NESTED_GETTERS } from './_map'

export const getters = {
  [VX_NESTED_GETTERS.RANDOM_MULTIPLIED]: (state) => (multiplier) => {
    return state.nestedRandom * multiplier
  },
}
