import { state } from './state'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

// module body
const nested = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}

// export
export { nested }
