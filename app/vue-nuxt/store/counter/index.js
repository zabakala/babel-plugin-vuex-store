import { VX_COUNTER_ACTIONS, VX_COUNTER_MUTATIONS, VX_COUNTER_GETTERS } from './_map'

export const state = () => ({
  actionTime: 0,
  count: 0,
  countPowered: 0,
  rootRandom: 0,
})

const vxActions = {
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

const vxMutations = {
  [VX_COUNTER_MUTATIONS.INCREMENT] (state, payload) {
    state.count += payload
  },

  [VX_COUNTER_MUTATIONS.INCREMENT_POWERED] (state) {
    state.countPowered = state.count * state.count
  },

  [VX_COUNTER_MUTATIONS.SET_TIME] (state) {
    state.actionTime = Date.now()
  },

  [VX_COUNTER_MUTATIONS.RANDOMIZE] (state, payload) {
    state.rootRandom = Math.random() * 1000 * payload
  },
}

export const mutations = vxMutations

const vxGetters = {
  [VX_COUNTER_GETTERS.TOTAL] (state) {
    return state.count
  },

  [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED]: (state) => (multiplier) => {
    return state.count * multiplier
  },
}

export const getters = vxGetters
