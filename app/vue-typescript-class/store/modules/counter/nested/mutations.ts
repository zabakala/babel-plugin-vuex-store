import { MutationTree } from 'vuex'
import { VX_NESTED_MUTATIONS } from './_map'
import { NestedState } from '../../../../types'

const vxMutations: MutationTree<NestedState> = {
  [VX_NESTED_MUTATIONS.RANDOMIZE] (state): void {
    state.nestedRandom = Math.random() * 1000
  },
}

export const mutations = vxMutations
