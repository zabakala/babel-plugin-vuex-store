import { VX_COUNTER_MUTATIONS } from './_map'

export const mutations = {
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
