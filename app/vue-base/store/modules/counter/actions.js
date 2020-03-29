import { COUNTER_ACTIONS, COUNTER_MUTATIONS } from './_map'

export function increment ({ commit, dispatch }, payload) {
  commit(COUNTER_MUTATIONS.INCREMENT, payload)
  dispatch(COUNTER_ACTIONS.INCREMENT_POWERED)
  }

export function incrementPowered (store) {
  store.commit(COUNTER_MUTATIONS.INCREMENT_POWERED)
}

export function randomize ({ commit }, payload) {
  commit(COUNTER_MUTATIONS.RANDOMIZE, payload)
}
