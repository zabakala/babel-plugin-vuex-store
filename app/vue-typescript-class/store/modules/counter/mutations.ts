import { MutationTree } from 'vuex'
import { VX_COUNTER_MUTATIONS } from './_map'
import { CounterState } from '../../../types'

const vxMutations: MutationTree<CounterState> = {
  [VX_COUNTER_MUTATIONS.INCREMENT] (state, payload: number): void {
    state.count += payload
  },

  [VX_COUNTER_MUTATIONS.INCREMENT_POWERED] (state: CounterState): void {
    state.countPowered = state.count * state.count
  },

  [VX_COUNTER_MUTATIONS.SET_TIME] (state: CounterState): void {
    state.actionTime = Date.now()
  },

  [VX_COUNTER_MUTATIONS.RANDOMIZE] (state: CounterState, payload: number): void {
    state.rootRandom = Math.random() * 1000 * payload
  },
}

export const mutations = vxMutations
