import { NESTED_GETTERS } from './_map'

const vxGetters = {
  [NESTED_GETTERS.RANDOM_MULTIPLIED]: (state) => (multiplier) => {
    return state.nestedRandom * multiplier
  },
}

export const getters = vxGetters
