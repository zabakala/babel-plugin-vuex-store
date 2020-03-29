import { COUNTER_ACTIONS, COUNTER_MUTATIONS, COUNTER_GETTERS } from './_map'

export const state = () => ({
  actionTime: 0,
  count: 0,
  countPowered: 0,
  rootRandom: 0,
})

export const actions = {
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

export const mutations = {
  [COUNTER_MUTATIONS.INCREMENT] (state, payload) {
    state.count += payload
  },

  [COUNTER_MUTATIONS.INCREMENT_POWERED] (state) {
    state.countPowered = state.count * state.count
  },

  [COUNTER_MUTATIONS.SET_TIME] (state) {
    state.actionTime = Date.now()
  },

  [COUNTER_MUTATIONS.RANDOMIZE] (state, payload) {
    state.rootRandom = Math.random() * 1000 * payload
  },
}

export const getters = {
  [COUNTER_GETTERS.TOTAL] (state) {
    return state.count
  },

  [COUNTER_GETTERS.TOTAL_MULTIPLIED]: (state) => (multiplier) => {
    return state.count * multiplier
  },
}
