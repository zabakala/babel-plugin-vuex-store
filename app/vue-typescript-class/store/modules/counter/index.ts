import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

import { nested } from './nested'

// module body
const counter = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,

  modules: {
    nested
  }
}

// export
export { counter }
