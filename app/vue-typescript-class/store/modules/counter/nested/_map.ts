import { ActionSet, MutationSet, GetterSet } from '../../../../types'

export const VX_NESTED_ACTIONS: ActionSet = {
  RANDOMIZE: ['counter', 'nested'],
}

export const VX_NESTED_MUTATIONS: MutationSet = {
  RANDOMIZE: ['counter', 'nested'],
}

export const VX_NESTED_GETTERS: GetterSet = {
  RANDOM_MULTIPLIED: ['counter', 'nested'],
}
