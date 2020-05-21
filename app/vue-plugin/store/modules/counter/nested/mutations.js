import { NESTED_MUTATIONS } from './_map'

const vxMutations = {
  [NESTED_MUTATIONS.RANDOMIZE] (state) {
    state.nestedRandom = Math.random() * 1000
  },
}

export const mutations = vxMutations
