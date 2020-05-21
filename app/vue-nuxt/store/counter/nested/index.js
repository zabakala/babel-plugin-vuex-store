import { NESTED_ACTIONS, NESTED_GETTERS, NESTED_MUTATIONS } from './_map'
import { COUNTER_ACTIONS, COUNTER_MUTATIONS } from '../_map'

export const state = () => ({
  nestedCount: 0,
  nestedRandom: 0,
})

const vxActions = {
  [NESTED_ACTIONS.RANDOMIZE] ({ commit, rootCommit, rootDispatch }) {
    commit(NESTED_MUTATIONS.RANDOMIZE)
    rootCommit(COUNTER_MUTATIONS.SET_TIME)
    rootDispatch(COUNTER_ACTIONS.RANDOMIZE, 3)
  },
}

export const actions = vxActions

const vxMutations = {
  [NESTED_MUTATIONS.RANDOMIZE] (state) {
    state.nestedRandom = Math.random() * 1000
  },
}

export const mutations = vxMutations

const vxGetters = {
  [NESTED_GETTERS.RANDOM_MULTIPLIED]: (state) => (multiplier) => {
    return state.nestedRandom * multiplier
  },
}

export const getters = vxGetters
