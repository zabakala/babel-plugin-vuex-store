import { COUNTER_MUTATIONS } from './_map'

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
