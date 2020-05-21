import { COUNTER_ACTIONS, COUNTER_MUTATIONS } from './_map'

const vxActions = {
  [COUNTER_ACTIONS.INCREMENT] ({ commit, dispatch }, payload) {
    commit(COUNTER_MUTATIONS.INCREMENT, payload)
    dispatch(COUNTER_ACTIONS.INCREMENT_POWERED)
  },

  [COUNTER_ACTIONS.INCREMENT_POWERED] (store) {
    store.commit(COUNTER_MUTATIONS.INCREMENT_POWERED)
  },

  [COUNTER_ACTIONS.RANDOMIZE] ({ commit }, payload) {
    commit(COUNTER_MUTATIONS.RANDOMIZE, payload)
  },
}

export const actions = vxActions
