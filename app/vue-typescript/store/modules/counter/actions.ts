import { ActionTree } from 'vuex'
import { VX_COUNTER_ACTIONS, VX_COUNTER_MUTATIONS } from './_map'

import { CounterState } from '../../../types'

const vxActions: ActionTree<CounterState, any> = {
  [VX_COUNTER_ACTIONS.INCREMENT] ({ commit, dispatch }, payload) {
    commit(VX_COUNTER_MUTATIONS.INCREMENT, payload)
    dispatch(VX_COUNTER_ACTIONS.INCREMENT_POWERED)
  },

  [VX_COUNTER_ACTIONS.INCREMENT_POWERED] (store) {
    store.commit(VX_COUNTER_MUTATIONS.INCREMENT_POWERED)
  },

  [VX_COUNTER_ACTIONS.RANDOMIZE] ({ commit }, payload) {
    commit(VX_COUNTER_MUTATIONS.RANDOMIZE, payload)
  },
}

export const actions = vxActions
