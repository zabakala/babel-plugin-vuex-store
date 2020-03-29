import { MutationTree } from 'vuex'
import { NESTED_MUTATIONS } from './_map'
import { NestedState } from '../../../../types'

export const mutations: MutationTree<NestedState> = {
  [NESTED_MUTATIONS.RANDOMIZE] (state): void {
    state.nestedRandom = Math.random() * 1000
  },
}
