const { formatResult } = require('../../utils')

module.exports.arrToCamelCase = [
  {
    title: `
    Should properly create a namespace for an action/mutation/getter
    by taking the -key- of the corresponding object and convert
    it to camelCase to be used as the object -value-. 
    There is a name-spaced module, so the object -value- represented
    by the module name will be used to compose the prefix for the action/mutation/getter.
    `,

    code: `
      export const VX_CART_ACTIONS = {
        ADD_TO_CART: ['cart'],
        REMOVE_FROM_CART: ['cart'],
      };

      export const VX_CART_MUTATIONS = {
        DELETE_CART: ["cart"],
        REMOVE_FROM_CART: ["cart"]
      };

      export const VX_CART_GETTERS = {
        GET_CART_BY_ID: ["cart"],
        GET_ALL_CARTS: ["cart"]
      };
    `,

    output: formatResult(`
      export const VX_CART_ACTIONS = {
        ADD_TO_CART: "cart/addToCart",
        REMOVE_FROM_CART: "cart/removeFromCart"
      };

      export const VX_CART_MUTATIONS = {
        DELETE_CART: "cart/deleteCart",
        REMOVE_FROM_CART: "cart/removeFromCart"
      };

      export const VX_CART_GETTERS = {
        GET_CART_BY_ID: "cart/getCartById",
        GET_ALL_CARTS: "cart/getAllCarts"
      };
    `)
  },

  {
    title: `
    Should properly create a namespace for an action/mutation/getter
    by taking the -key- of the corresponding object and convert
    it to camelCase to be used as the object -value-.
    There are name-spaced modules, so the object -value- represented
    by multiple module names will be used to compose the prefix
    for the action/mutation/getter.
    `,

    code: `
      export const VX_CART_GETTERS = {
        AA_BB_CC: ["cart", "foo"],
        DDD_EEE_FFF: ["cart", "foo", "baz"]
      };
    `,

    output: formatResult(`
      export const VX_CART_GETTERS = {
        AA_BB_CC: "cart/foo/aaBbCc",
        DDD_EEE_FFF: "cart/foo/baz/dddEeeFff"
      };
    `)
  },
]
