import { NESTED_ACTIONS, NESTED_GETTERS, NESTED_MUTATIONS } from './_map'
import { COUNTER_ACTIONS, COUNTER_MUTATIONS } from '../_map'

export const state = () => ({
  nestedCount: 0,
  nestedRandom: 0,
})

export const actions = {
  [NESTED_ACTIONS.RANDOMIZE] ({ commit, rootCommit, rootDispatch }) {
    commit(NESTED_MUTATIONS.RANDOMIZE)
    rootCommit(COUNTER_MUTATIONS.SET_TIME)
    rootDispatch(COUNTER_ACTIONS.RANDOMIZE, 3)

    // unit tests
    // - toCamelCase
    // - addCamelCaseValueToSnakeCaseKey
    // split main plugin file into smaller logical blocks/files
  },
}

export const mutations = {
  [NESTED_MUTATIONS.RANDOMIZE] (state) {
    state.nestedRandom = Math.random() * 1000
  },
}

export const getters = {
  [NESTED_GETTERS.RANDOM_MULTIPLIED]: (state) => (multiplier) => {
    return state.nestedRandom * multiplier
  },
}
