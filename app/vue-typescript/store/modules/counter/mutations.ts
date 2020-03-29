import { MutationTree } from 'vuex'
import { COUNTER_MUTATIONS } from './_map'
import { CounterState } from '../../../types'

export const mutations: MutationTree<CounterState> = {
  [COUNTER_MUTATIONS.INCREMENT] (state, payload: number): void {
    state.count += payload
  },

  [COUNTER_MUTATIONS.INCREMENT_POWERED] (state: CounterState): void {
    state.countPowered = state.count * state.count
  },

  [COUNTER_MUTATIONS.SET_TIME] (state: CounterState): void {
    state.actionTime = Date.now()
  },

  [COUNTER_MUTATIONS.RANDOMIZE] (state: CounterState, payload: number): void {
    state.rootRandom = Math.random() * 1000 * payload
  },
}
