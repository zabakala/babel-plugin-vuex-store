import { VX_COUNTER_ACTIONS, VX_COUNTER_MUTATIONS } from './_map'

export const actions = {
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
