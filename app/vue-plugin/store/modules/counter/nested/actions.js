import { NESTED_ACTIONS, NESTED_MUTATIONS } from './_map'
import { COUNTER_ACTIONS, COUNTER_MUTATIONS } from '../_map'

export const actions = {
  [NESTED_ACTIONS.RANDOMIZE] ({ commit, rootCommit, rootDispatch }) {
    commit(NESTED_MUTATIONS.RANDOMIZE)
    rootCommit(COUNTER_MUTATIONS.SET_TIME)
    rootDispatch(COUNTER_ACTIONS.RANDOMIZE, 3)
  },
}
