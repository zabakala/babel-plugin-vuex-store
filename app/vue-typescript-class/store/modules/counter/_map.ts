import { ActionSet, MutationSet, GetterSet } from '../../../types'

export const VX_COUNTER_ACTIONS: ActionSet = {
  INCREMENT: ['counter'],
  INCREMENT_POWERED: ['counter'],
  RANDOMIZE: ['counter'],
}

export const VX_COUNTER_MUTATIONS: MutationSet = {
  INCREMENT: ['counter'],
  INCREMENT_POWERED: ['counter'],
  SET_TIME: ['counter'],
  RANDOMIZE: ['counter'],
}

export const VX_COUNTER_GETTERS: GetterSet = {
  TOTAL: ['counter'],
  TOTAL_MULTIPLIED: ['counter'],
}
