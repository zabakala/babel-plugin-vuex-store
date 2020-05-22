import { VX_NESTED_MUTATIONS } from './_map'

export const mutations = {
  [VX_NESTED_MUTATIONS.RANDOMIZE] (state) {
    state.nestedRandom = Math.random() * 1000
  },
}
