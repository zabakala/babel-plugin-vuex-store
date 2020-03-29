const { formatResult } = require('../../utils')

module.exports.pluginNotApplied = [
  {
    title: `
    Should not affect namespaces for actions/mutations/getters.
    `,

    code: `
      export const CART_ACTIONS = {
        ADD_TO_CART: "cart/addToCart",
        REMOVE_FROM_CART: "cart/removeFromCart"
      };

      export const CART_MUTATIONS = {
        DELETE_CART: "cart/deleteCart",
        REMOVE_FROM_CART: "cart/removeFromCart"
      };

      export const CART_GETTERS = {
        GET_CART_BY_ID: "cart/getCartById",
        GET_ALL_CARTS: "cart/getAllCarts"
      };
    `,

    output: formatResult(`
      export const CART_ACTIONS = {
        ADD_TO_CART: "cart/addToCart",
        REMOVE_FROM_CART: "cart/removeFromCart"
      };

      export const CART_MUTATIONS = {
        DELETE_CART: "cart/deleteCart",
        REMOVE_FROM_CART: "cart/removeFromCart"
      };

      export const CART_GETTERS = {
        GET_CART_BY_ID: "cart/getCartById",
        GET_ALL_CARTS: "cart/getAllCarts"
      };
    `)
  },

  {
    title: `
    Should not affect namespaces for actions/mutations/getters.
    There are more name-spaced modules.
    `,

    code: `
      export const CART_GETTERS = {
        AA_BB_CC: "cart/foo/aaBbCc",
        DDD_EEE_FFF: "cart/foo/baz/dddEeeFff"
      };
    `,

    output: formatResult(`
      export const CART_GETTERS = {
        AA_BB_CC: "cart/foo/aaBbCc",
        DDD_EEE_FFF: "cart/foo/baz/dddEeeFff"
      };
    `)
  },

  {
    title: `
    Should not affect actions key names.
    `,

    code: `
      import { COUNTER_MUTATIONS } from './mutations';

      export const COUNTER_ACTIONS = {
        INCREMENT: "counter/increment"
      };

      export function increment({ commit }, payload) {
        commit(COUNTER_MUTATIONS.INCREMENT, payload);
      } ;
      
      export function decrement({ commit }, payload) {
        commit(COUNTER_MUTATIONS.DECREMENT, payload);
      } ;
    `,

    output: formatResult(`
      import { COUNTER_MUTATIONS } from './mutations';

      export const COUNTER_ACTIONS = {
        INCREMENT: "counter/increment"
      };

      export function increment({ commit }, payload) {
        commit(COUNTER_MUTATIONS.INCREMENT, payload);
      } ;
      
      export function decrement({ commit }, payload) {
        commit(COUNTER_MUTATIONS.DECREMENT, payload);
      } ;
    `)
  },

  {
    title: `
    Should not affect mutations key names.
    `,

    code: `
      export const COUNTER_MUTATIONS = {
        INCREMENT: "counter/increment",
        DECREMENT: "counter/decrement"
      };

      export function increment(state, payload) {
        state.count += payload;
      } ;

      export function decrement(state, payload) {
        state.count -= payload;
      } ;
    `,

    output: formatResult(`
      export const COUNTER_MUTATIONS = {
        INCREMENT: "counter/increment",
        DECREMENT: "counter/decrement"
      };

      export function increment(state, payload) {
        state.count += payload;
      } ;

      export function decrement(state, payload) {
        state.count -= payload;
      } ;
    `)
  },

  {
    title: `
    Should not affect getters key names.
    `,

    code: `
      export const COUNTER_GETTERS = {
        TOTAL: "counter/total",
        TOTAL_MULTIPLIED: "counter/totalMultiplied"
      };

      export const total = state => {
        return state.count;
      };

      export const totalMultiplied = state => multiplier => {
        return state.count * multiplier;
      };
    `,

    output: formatResult(`
      export const COUNTER_GETTERS = {
        TOTAL: "counter/total",
        TOTAL_MULTIPLIED: "counter/totalMultiplied"
      };

      export const total = state => {
        return state.count;
      };

      export const totalMultiplied = state => multiplier => {
        return state.count * multiplier;
      };
    `)
  },

  {
    title: `
    Should leave root commits and root dispatches as they are.
    `,

    code: `
      import { COUNTER_MUTATIONS } from '../mutations';
      import { NESTED_MUTATIONS } from './mutations';

      export const NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      export function increment({ commit, dispatch }, payload) {
        commit(NESTED_MUTATIONS.INCREMENT, payload);

        commit(COUNTER_MUTATIONS.SET_TIME, null, { root: true });
        commit(COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });

        dispatch(COUNTER_ACTIONS.INCREMENT, null, { root: true });
        dispatch(COUNTER_ACTIONS.INCREMENT, payload, { root: true });
      } ;
    `,

    output: formatResult(`
      import { COUNTER_MUTATIONS } from '../mutations';
      import { NESTED_MUTATIONS } from './mutations';

      export const NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      export function increment({ commit, dispatch }, payload) {
        commit(NESTED_MUTATIONS.INCREMENT, payload);

        commit(COUNTER_MUTATIONS.SET_TIME, null, { root: true });
        commit(COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });

        dispatch(COUNTER_ACTIONS.INCREMENT, null, { root: true });
        dispatch(COUNTER_ACTIONS.INCREMENT, payload, { root: true });
      } ;
    `)
  },

  {
    title: `
    Should leave store.commits and store.dispatches as they are.
    `,

    code: `
      import { COUNTER_MUTATIONS } from './mutations';

      export const COUNTER_ACTIONS = {
        INCREMENT: "counter/increment"
      };

      export function increment(store, payload) {
        store.commit(COUNTER_MUTATIONS.INCREMENT, payload);
        store.dispatch(COUNTER_ACTIONS.OTHER_ACTION, payload);
      } ;
    `,

    output: formatResult(`
      import { COUNTER_MUTATIONS } from './mutations';

      export const COUNTER_ACTIONS = {
        INCREMENT: "counter/increment"
      };

      export function increment(store, payload) {
        store.commit(COUNTER_MUTATIONS.INCREMENT, payload);
        store.dispatch(COUNTER_ACTIONS.OTHER_ACTION, payload);
      } ;
    `)
  },
]
