import { NESTED_GETTERS } from './_map'

export const getters = {
  [NESTED_GETTERS.RANDOM_MULTIPLIED]: (state) => (multiplier) => {
    return state.nestedRandom * multiplier
  },
}
