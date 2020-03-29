import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

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
