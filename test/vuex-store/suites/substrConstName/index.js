const {formatResult} = require('../../utils')

module.exports.substrConstName = [
  {
    title: `
    Should properly create action names from a name-spaced module
    by removing a prefix from the action name (represented by a constant).
    `,

    code: `
      import { COUNTER_MUTATIONS } from './mutations';

      export const COUNTER_ACTIONS = {
        INCREMENT: ["counter"]
      };

      export const actions = {
        [COUNTER_ACTIONS.INCREMENT] ({ commit }, payload) {
          commit(COUNTER_MUTATIONS.INCREMENT, payload);
        },

        [COUNTER_ACTIONS.DECREMENT] ({ commit }, payload) {
          commit(COUNTER_MUTATIONS.DECREMENT, payload);
        }
      };
    `,

    output: formatResult(`
      import { COUNTER_MUTATIONS } from './mutations';

      export const COUNTER_ACTIONS = {
        INCREMENT: "counter/increment"
      };

      export const actions = {
        [COUNTER_ACTIONS.INCREMENT.substr(COUNTER_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(COUNTER_MUTATIONS.INCREMENT.substr(COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
        },

        [COUNTER_ACTIONS.DECREMENT.substr(COUNTER_ACTIONS.DECREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(COUNTER_MUTATIONS.DECREMENT.substr(COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1), payload);
        }
      };
    `)
  },

  {
    title: `
    Should properly create action names from a nested name-spaced module
    by removing a prefix from the action name (represented by a constant).
    `,

    code: `
      import { COUNTER_MUTATIONS } from './mutations';

      export const COUNTER_ACTIONS = {
        INCREMENT: ["counter", "nested"],
        DECREMENT: ["counter", "nested"]
      };

      export const actions = {
        [COUNTER_ACTIONS.INCREMENT] ({ commit }, payload) {
          commit(COUNTER_MUTATIONS.INCREMENT, payload);
        },

        [COUNTER_ACTIONS.DECREMENT] ({ commit }, payload) {
          commit(COUNTER_MUTATIONS.DECREMENT, payload);
        }
      };
    `,

    output: formatResult(`
      import { COUNTER_MUTATIONS } from './mutations';

      export const COUNTER_ACTIONS = {
        INCREMENT: "counter/nested/increment",
        DECREMENT: "counter/nested/decrement"
      };

      export const actions = {
        [COUNTER_ACTIONS.INCREMENT.substr(COUNTER_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(COUNTER_MUTATIONS.INCREMENT.substr(COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
        },

        [COUNTER_ACTIONS.DECREMENT.substr(COUNTER_ACTIONS.DECREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(COUNTER_MUTATIONS.DECREMENT.substr(COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1), payload);
        }
      };
    `)
  },

  {
    title: `
    Should properly create mutation names from a name-spaced module
    by removing a prefix from the mutation name (represented
    by a constant).
    `,

    code: `
      export const COUNTER_MUTATIONS = {
        INCREMENT: ["counter"],
        DECREMENT: ["counter"]
      };

      export const mutations = {
        [COUNTER_MUTATIONS.INCREMENT] (state, payload) {
          state.count += payload;
        },

        [COUNTER_MUTATIONS.DECREMENT] (state, payload) {
          state.count -= payload;
        }
      };
    `,

    output: formatResult(`
      export const COUNTER_MUTATIONS = {
        INCREMENT: "counter/increment",
        DECREMENT: "counter/decrement"
      };

      export const mutations = {
        [COUNTER_MUTATIONS.INCREMENT.substr(COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count += payload;
        },

        [COUNTER_MUTATIONS.DECREMENT.substr(COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count -= payload;
        }
      };
    `)
  },

  {
    title: `
    Should properly create mutation names from a nested name-spaced module
    by removing a prefix from the mutation name (represented
    by a constant).
    `,

    code: `
      export const COUNTER_MUTATIONS = {
        INCREMENT: ["counter", "nested"],
        DECREMENT: ["counter", "nested"]
      };

      export const mutations = {
        [COUNTER_MUTATIONS.INCREMENT] (state, payload) {
          state.count += payload;
        },

        [COUNTER_MUTATIONS.DECREMENT] (state, payload) {
          state.count -= payload;
        }
      };
    `,

    output: formatResult(`
      export const COUNTER_MUTATIONS = {
        INCREMENT: "counter/nested/increment",
        DECREMENT: "counter/nested/decrement"
      };

      export const mutations = {
        [COUNTER_MUTATIONS.INCREMENT.substr(COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count += payload;
        },

        [COUNTER_MUTATIONS.DECREMENT.substr(COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count -= payload;
        }
      };
    `)
  },

  {
    title: `
    Should properly create getter names from a name-spaced module
    by removing a prefix from the getter name (represented
    by a constant).
    `,

    code: `
      export const COUNTER_GETTERS = {
        TOTAL: ["counter"],
        TOTAL_MULTIPLIED: ["counter"]
      };

      export const getters = {
        [COUNTER_GETTERS.TOTAL] (state) {
          return state.count;
        },

        [COUNTER_GETTERS.TOTAL_MULTIPLIED]: state => multiplier => {
          return state.count * multiplier;
        }
      };
    `,

    output: formatResult(`
      export const COUNTER_GETTERS = {
        TOTAL: "counter/total",
        TOTAL_MULTIPLIED: "counter/totalMultiplied"
      };

      export const getters = {
        [COUNTER_GETTERS.TOTAL.substr(COUNTER_GETTERS.TOTAL.lastIndexOf("/") + 1)](state) {
          return state.count;
        },

        [COUNTER_GETTERS.TOTAL_MULTIPLIED.substr(COUNTER_GETTERS.TOTAL_MULTIPLIED.lastIndexOf("/") + 1)]: state => multiplier => {
          return state.count * multiplier;
        }
      };
    `)
  },

  {
    title: `
    Should properly create getter names from a nested name-spaced module
    by removing a prefix from the getter name (represented
    by a constant).
    `,

    code: `
      export const COUNTER_GETTERS = {
        TOTAL: ["counter", "nested"],
        TOTAL_MULTIPLIED: ["counter", "nested"]
      };

      export const getters = {
        [COUNTER_GETTERS.TOTAL] (state) {
          return state.count;
        },

        [COUNTER_GETTERS.TOTAL_MULTIPLIED]: state => multiplier => {
          return state.count * multiplier;
        }
      };
    `,

    output: formatResult(`
      export const COUNTER_GETTERS = {
        TOTAL: "counter/nested/total",
        TOTAL_MULTIPLIED: "counter/nested/totalMultiplied"
      };

      export const getters = {
        [COUNTER_GETTERS.TOTAL.substr(COUNTER_GETTERS.TOTAL.lastIndexOf("/") + 1)](state) {
          return state.count;
        },

        [COUNTER_GETTERS.TOTAL_MULTIPLIED.substr(COUNTER_GETTERS.TOTAL_MULTIPLIED.lastIndexOf("/") + 1)]: state => multiplier => {
          return state.count * multiplier;
        }
      };
    `)
  },

  {
    title: `
    Should properly create action names from a name-spaced module
    by removing a prefix from the action name (represented by a constant).
    -store- is used instead of { commit, dispatch }
    `,

    code: `
      import { COUNTER_MUTATIONS } from './mutations';

      export const COUNTER_ACTIONS = {
        INCREMENT: ["counter"]
      };

      export const actions = {
        [COUNTER_ACTIONS.INCREMENT] (store, payload) {
          store.commit(COUNTER_MUTATIONS.INCREMENT, payload);
          store.dispatch(COUNTER_ACTIONS.OTHER_ACTION, payload);
        }
      };
    `,

    output: formatResult(`
      import { COUNTER_MUTATIONS } from './mutations';

      export const COUNTER_ACTIONS = {
        INCREMENT: "counter/increment"
      };

      export const actions = {
        [COUNTER_ACTIONS.INCREMENT.substr(COUNTER_ACTIONS.INCREMENT.lastIndexOf("/") + 1)](store, payload) {
          store.commit(COUNTER_MUTATIONS.INCREMENT.substr(COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
          store.dispatch(COUNTER_ACTIONS.OTHER_ACTION.substr(COUNTER_ACTIONS.OTHER_ACTION.lastIndexOf("/") + 1), payload);
        }
      };
    `)
  },
]
