import { state } from './state'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

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
