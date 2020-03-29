import { ActionSet, MutationSet, GetterSet } from '../../../types'

export const COUNTER_ACTIONS: ActionSet = {
  INCREMENT: ['counter'],
  INCREMENT_POWERED: ['counter'],
  RANDOMIZE: ['counter'],
}

export const COUNTER_MUTATIONS: MutationSet = {
  INCREMENT: ['counter'],
  INCREMENT_POWERED: ['counter'],
  SET_TIME: ['counter'],
  RANDOMIZE: ['counter'],
}

export const COUNTER_GETTERS: GetterSet = {
  TOTAL: ['counter'],
  TOTAL_MULTIPLIED: ['counter'],
}
