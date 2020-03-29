import { NESTED_MUTATIONS } from './_map'
import { COUNTER_ACTIONS, COUNTER_MUTATIONS } from '../_map'

export function randomize ({ commit, dispatch }) {
  commit(NESTED_MUTATIONS.RANDOMIZE)
  commit(COUNTER_MUTATIONS.SET_TIME, null, { root: true })
  dispatch(COUNTER_ACTIONS.RANDOMIZE, 3, { root: true })
}
