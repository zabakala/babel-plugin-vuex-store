import { NESTED_MUTATIONS } from './_map'

export const mutations = {
  [NESTED_MUTATIONS.RANDOMIZE] (state) {
    state.nestedRandom = Math.random() * 1000
  },
}
