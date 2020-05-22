const {formatResult} = require('../../utils')

module.exports.substrConstName = [
  {
    title: `
    Should properly create action names from a name-spaced module
    by removing a prefix from the action name (represented by a constant).
    `,

    code: `
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: ["counter"]
      };

      export const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT] ({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.INCREMENT, payload);
        },

        [VX_COUNTER_ACTIONS.DECREMENT] ({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.DECREMENT, payload);
        }
      };
    `,

    output: formatResult(`
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: "counter/increment"
      };

      export const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT.substr(VX_COUNTER_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.INCREMENT.substr(VX_COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
        },

        [VX_COUNTER_ACTIONS.DECREMENT.substr(VX_COUNTER_ACTIONS.DECREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.DECREMENT.substr(VX_COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1), payload);
        }
      };
    `)
  },

  {
    title: `
    Should properly create action names (late assignment) from a name-spaced module
    by removing a prefix from the action name (represented by a constant).
    `,

    code: `
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: ["counter"]
      };

      const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT] ({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.INCREMENT, payload);
        },

        [VX_COUNTER_ACTIONS.DECREMENT] ({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.DECREMENT, payload);
        }
      };
      
      export const actions = vxActions;
    `,

    output: formatResult(`
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: "counter/increment"
      };

      const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT.substr(VX_COUNTER_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.INCREMENT.substr(VX_COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
        },

        [VX_COUNTER_ACTIONS.DECREMENT.substr(VX_COUNTER_ACTIONS.DECREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.DECREMENT.substr(VX_COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1), payload);
        }
      };
      
      export const actions = vxActions;
    `)
  },

  {
    title: `
    Should properly create action names from a nested name-spaced module
    by removing a prefix from the action name (represented by a constant).
    `,

    code: `
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: ["counter", "nested"],
        DECREMENT: ["counter", "nested"]
      };

      export const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT] ({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.INCREMENT, payload);
        },

        [VX_COUNTER_ACTIONS.DECREMENT] ({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.DECREMENT, payload);
        }
      };
    `,

    output: formatResult(`
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: "counter/nested/increment",
        DECREMENT: "counter/nested/decrement"
      };

      export const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT.substr(VX_COUNTER_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.INCREMENT.substr(VX_COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
        },

        [VX_COUNTER_ACTIONS.DECREMENT.substr(VX_COUNTER_ACTIONS.DECREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.DECREMENT.substr(VX_COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1), payload);
        }
      };
    `)
  },

  {
    title: `
    Should properly create action names (late assignment) from a nested name-spaced module
    by removing a prefix from the action name (represented by a constant).
    `,

    code: `
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: ["counter", "nested"],
        DECREMENT: ["counter", "nested"]
      };

      const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT] ({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.INCREMENT, payload);
        },

        [VX_COUNTER_ACTIONS.DECREMENT] ({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.DECREMENT, payload);
        }
      };
      
      export const actions = vxActions;
    `,

    output: formatResult(`
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: "counter/nested/increment",
        DECREMENT: "counter/nested/decrement"
      };

      const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT.substr(VX_COUNTER_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.INCREMENT.substr(VX_COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
        },

        [VX_COUNTER_ACTIONS.DECREMENT.substr(VX_COUNTER_ACTIONS.DECREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(VX_COUNTER_MUTATIONS.DECREMENT.substr(VX_COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1), payload);
        }
      };
      
      export const actions = vxActions;
    `)
  },

  {
    title: `
    Should properly create mutation names from a name-spaced module
    by removing a prefix from the mutation name (represented
    by a constant).
    `,

    code: `
      export const VX_COUNTER_MUTATIONS = {
        INCREMENT: ["counter"],
        DECREMENT: ["counter"]
      };

      export const vxMutations = {
        [VX_COUNTER_MUTATIONS.INCREMENT] (state, payload) {
          state.count += payload;
        },

        [VX_COUNTER_MUTATIONS.DECREMENT] (state, payload) {
          state.count -= payload;
        }
      };
    `,

    output: formatResult(`
      export const VX_COUNTER_MUTATIONS = {
        INCREMENT: "counter/increment",
        DECREMENT: "counter/decrement"
      };

      export const vxMutations = {
        [VX_COUNTER_MUTATIONS.INCREMENT.substr(VX_COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count += payload;
        },

        [VX_COUNTER_MUTATIONS.DECREMENT.substr(VX_COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count -= payload;
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
      export const VX_COUNTER_MUTATIONS = {
        INCREMENT: ["counter"],
        DECREMENT: ["counter"]
      };

      const vxMutations = {
        [VX_COUNTER_MUTATIONS.INCREMENT] (state, payload) {
          state.count += payload;
        },

        [VX_COUNTER_MUTATIONS.DECREMENT] (state, payload) {
          state.count -= payload;
        }
      };
      
      export const mutations = vxMutations;
    `,

    output: formatResult(`
      export const VX_COUNTER_MUTATIONS = {
        INCREMENT: "counter/increment",
        DECREMENT: "counter/decrement"
      };

      const vxMutations = {
        [VX_COUNTER_MUTATIONS.INCREMENT.substr(VX_COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count += payload;
        },

        [VX_COUNTER_MUTATIONS.DECREMENT.substr(VX_COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count -= payload;
        }
      };
      
      export const mutations = vxMutations;
    `)
  },

  {
    title: `
    Should properly create mutation names from a nested name-spaced module
    by removing a prefix from the mutation name (represented
    by a constant).
    `,

    code: `
      export const VX_COUNTER_MUTATIONS = {
        INCREMENT: ["counter", "nested"],
        DECREMENT: ["counter", "nested"]
      };

      export const vxMutations = {
        [VX_COUNTER_MUTATIONS.INCREMENT] (state, payload) {
          state.count += payload;
        },

        [VX_COUNTER_MUTATIONS.DECREMENT] (state, payload) {
          state.count -= payload;
        }
      };
    `,

    output: formatResult(`
      export const VX_COUNTER_MUTATIONS = {
        INCREMENT: "counter/nested/increment",
        DECREMENT: "counter/nested/decrement"
      };

      export const vxMutations = {
        [VX_COUNTER_MUTATIONS.INCREMENT.substr(VX_COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count += payload;
        },

        [VX_COUNTER_MUTATIONS.DECREMENT.substr(VX_COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count -= payload;
        }
      };
    `)
  },

  {
    title: `
    Should properly create mutation names (late assignment) from a nested name-spaced module
    by removing a prefix from the mutation name (represented
    by a constant).
    `,

    code: `
      export const VX_COUNTER_MUTATIONS = {
        INCREMENT: ["counter", "nested"],
        DECREMENT: ["counter", "nested"]
      };

      const vxMutations = {
        [VX_COUNTER_MUTATIONS.INCREMENT] (state, payload) {
          state.count += payload;
        },

        [VX_COUNTER_MUTATIONS.DECREMENT] (state, payload) {
          state.count -= payload;
        }
      };
      
      export const mutations = vxMutations;
    `,

    output: formatResult(`
      export const VX_COUNTER_MUTATIONS = {
        INCREMENT: "counter/nested/increment",
        DECREMENT: "counter/nested/decrement"
      };

      const vxMutations = {
        [VX_COUNTER_MUTATIONS.INCREMENT.substr(VX_COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count += payload;
        },

        [VX_COUNTER_MUTATIONS.DECREMENT.substr(VX_COUNTER_MUTATIONS.DECREMENT.lastIndexOf("/") + 1)](state, payload) {
          state.count -= payload;
        }
      };
      
      export const mutations = vxMutations;
    `)
  },

  {
    title: `
    Should properly create getter names from a name-spaced module
    by removing a prefix from the getter name (represented
    by a constant).
    `,

    code: `
      export const VX_COUNTER_GETTERS = {
        TOTAL: ["counter"],
        TOTAL_MULTIPLIED: ["counter"]
      };

      export const vxGetters = {
        [VX_COUNTER_GETTERS.TOTAL] (state) {
          return state.count;
        },

        [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED]: state => multiplier => {
          return state.count * multiplier;
        }
      };
    `,

    output: formatResult(`
      export const VX_COUNTER_GETTERS = {
        TOTAL: "counter/total",
        TOTAL_MULTIPLIED: "counter/totalMultiplied"
      };

      export const vxGetters = {
        [VX_COUNTER_GETTERS.TOTAL.substr(VX_COUNTER_GETTERS.TOTAL.lastIndexOf("/") + 1)](state) {
          return state.count;
        },

        [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED.substr(VX_COUNTER_GETTERS.TOTAL_MULTIPLIED.lastIndexOf("/") + 1)]: state => multiplier => {
          return state.count * multiplier;
        }
      };
    `)
  },

  {
    title: `
    Should properly create getter names (late assignment) from a name-spaced module
    by removing a prefix from the getter name (represented
    by a constant).
    `,

    code: `
      export const VX_COUNTER_GETTERS = {
        TOTAL: ["counter"],
        TOTAL_MULTIPLIED: ["counter"]
      };

      const vxGetters = {
        [VX_COUNTER_GETTERS.TOTAL] (state) {
          return state.count;
        },

        [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED]: state => multiplier => {
          return state.count * multiplier;
        }
      };
      
      export const getters = vxGetters;
    `,

    output: formatResult(`
      export const VX_COUNTER_GETTERS = {
        TOTAL: "counter/total",
        TOTAL_MULTIPLIED: "counter/totalMultiplied"
      };

      const vxGetters = {
        [VX_COUNTER_GETTERS.TOTAL.substr(VX_COUNTER_GETTERS.TOTAL.lastIndexOf("/") + 1)](state) {
          return state.count;
        },

        [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED.substr(VX_COUNTER_GETTERS.TOTAL_MULTIPLIED.lastIndexOf("/") + 1)]: state => multiplier => {
          return state.count * multiplier;
        }
      };
      
      export const getters = vxGetters;
    `)
  },

  {
    title: `
    Should properly create getter names from a nested name-spaced module
    by removing a prefix from the getter name (represented
    by a constant).
    `,

    code: `
      export const VX_COUNTER_GETTERS = {
        TOTAL: ["counter", "nested"],
        TOTAL_MULTIPLIED: ["counter", "nested"]
      };

      export const vxGetters = {
        [VX_COUNTER_GETTERS.TOTAL] (state) {
          return state.count;
        },

        [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED]: state => multiplier => {
          return state.count * multiplier;
        }
      };
    `,

    output: formatResult(`
      export const VX_COUNTER_GETTERS = {
        TOTAL: "counter/nested/total",
        TOTAL_MULTIPLIED: "counter/nested/totalMultiplied"
      };

      export const vxGetters = {
        [VX_COUNTER_GETTERS.TOTAL.substr(VX_COUNTER_GETTERS.TOTAL.lastIndexOf("/") + 1)](state) {
          return state.count;
        },

        [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED.substr(VX_COUNTER_GETTERS.TOTAL_MULTIPLIED.lastIndexOf("/") + 1)]: state => multiplier => {
          return state.count * multiplier;
        }
      };
    `)
  },

  {
    title: `
    Should properly create getter names (late assignment) from a nested name-spaced module
    by removing a prefix from the getter name (represented
    by a constant).
    `,

    code: `
      export const VX_COUNTER_GETTERS = {
        TOTAL: ["counter", "nested"],
        TOTAL_MULTIPLIED: ["counter", "nested"]
      };

      const vxGetters = {
        [VX_COUNTER_GETTERS.TOTAL] (state) {
          return state.count;
        },

        [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED]: state => multiplier => {
          return state.count * multiplier;
        }
      };
      
      export const getters = vxGetters;
    `,

    output: formatResult(`
      export const VX_COUNTER_GETTERS = {
        TOTAL: "counter/nested/total",
        TOTAL_MULTIPLIED: "counter/nested/totalMultiplied"
      };

      const vxGetters = {
        [VX_COUNTER_GETTERS.TOTAL.substr(VX_COUNTER_GETTERS.TOTAL.lastIndexOf("/") + 1)](state) {
          return state.count;
        },

        [VX_COUNTER_GETTERS.TOTAL_MULTIPLIED.substr(VX_COUNTER_GETTERS.TOTAL_MULTIPLIED.lastIndexOf("/") + 1)]: state => multiplier => {
          return state.count * multiplier;
        }
      };
      
      export const getters = vxGetters;
    `)
  },

  {
    title: `
    Should properly create action names from a name-spaced module
    by removing a prefix from the action name (represented by a constant).
    -store- is used instead of { commit, dispatch }
    `,

    code: `
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: ["counter"]
      };

      export const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT] (store, payload) {
          store.commit(VX_COUNTER_MUTATIONS.INCREMENT, payload);
          store.dispatch(VX_COUNTER_ACTIONS.OTHER_ACTION, payload);
        }
      };
    `,

    output: formatResult(`
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: "counter/increment"
      };

      export const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT.substr(VX_COUNTER_ACTIONS.INCREMENT.lastIndexOf("/") + 1)](store, payload) {
          store.commit(VX_COUNTER_MUTATIONS.INCREMENT.substr(VX_COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
          store.dispatch(VX_COUNTER_ACTIONS.OTHER_ACTION.substr(VX_COUNTER_ACTIONS.OTHER_ACTION.lastIndexOf("/") + 1), payload);
        }
      };
    `)
  },

  {
    title: `
    Should properly create action names (late assignment) from a name-spaced module
    by removing a prefix from the action name (represented by a constant).
    -store- is used instead of { commit, dispatch }
    `,

    code: `
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: ["counter"]
      };

      const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT] (store, payload) {
          store.commit(VX_COUNTER_MUTATIONS.INCREMENT, payload);
          store.dispatch(VX_COUNTER_ACTIONS.OTHER_ACTION, payload);
        }
      };
      
      export const actions = vxActions;
    `,

    output: formatResult(`
      import { VX_COUNTER_MUTATIONS } from './mutations';

      export const VX_COUNTER_ACTIONS = {
        INCREMENT: "counter/increment"
      };

      const vxActions = {
        [VX_COUNTER_ACTIONS.INCREMENT.substr(VX_COUNTER_ACTIONS.INCREMENT.lastIndexOf("/") + 1)](store, payload) {
          store.commit(VX_COUNTER_MUTATIONS.INCREMENT.substr(VX_COUNTER_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
          store.dispatch(VX_COUNTER_ACTIONS.OTHER_ACTION.substr(VX_COUNTER_ACTIONS.OTHER_ACTION.lastIndexOf("/") + 1), payload);
        }
      };
      
      export const actions = vxActions;
    `)
  },
]
