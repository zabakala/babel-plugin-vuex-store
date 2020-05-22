import { ActionTree } from 'vuex'
import { VX_NESTED_ACTIONS, VX_NESTED_MUTATIONS } from './_map'
import { VX_COUNTER_ACTIONS, VX_COUNTER_MUTATIONS } from '../_map'

import { CounterState, NestedState } from '../../../../types'

const vxActions: ActionTree<NestedState, CounterState> = {
  [VX_NESTED_ACTIONS.RANDOMIZE] ({ commit, rootCommit, rootDispatch }) {
    commit(VX_NESTED_MUTATIONS.RANDOMIZE)
    rootCommit(VX_COUNTER_MUTATIONS.SET_TIME)
    rootDispatch(VX_COUNTER_ACTIONS.RANDOMIZE, 3)
  },
}

export const actions = vxActions
