import { ActionSet, MutationSet, GetterSet } from '../../../../types'

export const NESTED_ACTIONS: ActionSet = {
  RANDOMIZE: ['counter', 'nested'],
}

export const NESTED_MUTATIONS: MutationSet = {
  RANDOMIZE: ['counter', 'nested'],
}

export const NESTED_GETTERS: GetterSet = {
  RANDOM_MULTIPLIED: ['counter', 'nested'],
}
