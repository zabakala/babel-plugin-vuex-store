import { VX_NESTED_ACTIONS, VX_NESTED_GETTERS, VX_NESTED_MUTATIONS } from './_map'
import { VX_COUNTER_ACTIONS, VX_COUNTER_MUTATIONS } from '../_map'

export const state = () => ({
  nestedCount: 0,
  nestedRandom: 0,
})

const vxActions = {
  [VX_NESTED_ACTIONS.RANDOMIZE] ({ commit, rootCommit, rootDispatch }) {
    commit(VX_NESTED_MUTATIONS.RANDOMIZE)
    rootCommit(VX_COUNTER_MUTATIONS.SET_TIME)
    rootDispatch(VX_COUNTER_ACTIONS.RANDOMIZE, 3)
  },
}

export const actions = vxActions

const vxMutations = {
  [VX_NESTED_MUTATIONS.RANDOMIZE] (state) {
    state.nestedRandom = Math.random() * 1000
  },
}

export const mutations = vxMutations

const vxGetters = {
  [VX_NESTED_GETTERS.RANDOM_MULTIPLIED]: (state) => (multiplier) => {
    return state.nestedRandom * multiplier
  },
}

export const getters = vxGetters
