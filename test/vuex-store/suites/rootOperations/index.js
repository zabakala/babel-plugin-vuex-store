const {formatResult} = require('../../utils')

module.exports.rootOperations = [
  {
    title: `
    Should transform a -rootCommit- to a standard -commit- and remove the -rootCommit-
    afterwards as the same functionality is carried out by the -commit- operation.
    `,

    code: `
      import { VX_COUNTER_MUTATIONS } from '../mutations';
      import { VX_NESTED_MUTATIONS } from './mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      export const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT] ({ commit, rootCommit }, payload) {
          commit(VX_NESTED_MUTATIONS.INCREMENT, payload);

          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME);
          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now());
        }
      };
    `,

    output: formatResult(`
      import { VX_COUNTER_MUTATIONS } from '../mutations';
      import { VX_NESTED_MUTATIONS } from './mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      export const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT.substr(VX_NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(VX_NESTED_MUTATIONS.INCREMENT.substr(VX_NESTED_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);

          commit(VX_COUNTER_MUTATIONS.SET_TIME, null, { root: true });
          commit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });
        }
      };
    `)
  },

  {
    title: `
    Should transform a -rootCommit- to a standard -commit- and remove the -rootCommit-
    afterwards as the same functionality is carried out by the -commit- operation.
    Late assignment.
    `,

    code: `
      import { VX_COUNTER_MUTATIONS } from '../mutations';
      import { VX_NESTED_MUTATIONS } from './mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT] ({ commit, rootCommit }, payload) {
          commit(VX_NESTED_MUTATIONS.INCREMENT, payload);

          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME);
          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now());
        }
      };
      
      export const actions = vxActions;
    `,

    output: formatResult(`
      import { VX_COUNTER_MUTATIONS } from '../mutations';
      import { VX_NESTED_MUTATIONS } from './mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT.substr(VX_NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(VX_NESTED_MUTATIONS.INCREMENT.substr(VX_NESTED_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);

          commit(VX_COUNTER_MUTATIONS.SET_TIME, null, { root: true });
          commit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });
        }
      };
      
      export const actions = vxActions;
    `)
  },

  {
    title: `
    Should transform a -rootDispatch- to a standard -dispatch- and rename the -rootDispatch-
    afterwards as the same functionality is carried out by the -dispatch- operation.
    `,

    code: `
      import { VX_COUNTER_ACTIONS } from '../actions';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      export const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT] ({ rootDispatch }, payload) {
          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT);
          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT, payload);
        }
      };
    `,

    output: formatResult(`
      import { VX_COUNTER_ACTIONS } from '../actions';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      export const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT.substr(VX_NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ dispatch }, payload) {
          dispatch(VX_COUNTER_ACTIONS.INCREMENT, null, { root: true });
          dispatch(VX_COUNTER_ACTIONS.INCREMENT, payload, { root: true });
        }
      };
    `)
  },

  {
    title: `
    Should transform a -rootDispatch- to a standard -dispatch- and rename the -rootDispatch-
    afterwards as the same functionality is carried out by the -dispatch- operation.
    Late assignment.
    `,

    code: `
      import { VX_COUNTER_ACTIONS } from '../actions';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT] ({ rootDispatch }, payload) {
          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT);
          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT, payload);
        }
      };
      
      export const actions = vxActions;
    `,

    output: formatResult(`
      import { VX_COUNTER_ACTIONS } from '../actions';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT.substr(VX_NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ dispatch }, payload) {
          dispatch(VX_COUNTER_ACTIONS.INCREMENT, null, { root: true });
          dispatch(VX_COUNTER_ACTIONS.INCREMENT, payload, { root: true });
        }
      };
      
      export const actions = vxActions;
    `)
  },

  {
    title: `
    Should transform both -rootCommit- and -rootDispatch- to a standard -commit- and -dispatch-
    and rename both the -rootCommit- and the -rootDispatch- afterwards as the same functionality
    is carried out by their non-root counterparts.
    `,

    code: `
      import { VX_COUNTER_ACTIONS } from '../actions';
      import { VX_COUNTER_MUTATIONS } from '../mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      export const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT] ({ rootCommit, rootDispatch }, payload) {
          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME);
          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now());

          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT);
          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT, payload);
        }
      };
    `,

    output: formatResult(`
      import { VX_COUNTER_ACTIONS } from '../actions';
      import { VX_COUNTER_MUTATIONS } from '../mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      export const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT.substr(VX_NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit, dispatch }, payload) {
          commit(VX_COUNTER_MUTATIONS.SET_TIME, null, { root: true });
          commit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });

          dispatch(VX_COUNTER_ACTIONS.INCREMENT, null, { root: true });
          dispatch(VX_COUNTER_ACTIONS.INCREMENT, payload, { root: true });
        }
      };
    `)
  },

  {
    title: `
    Should transform both -rootCommit- and -rootDispatch- to a standard -commit- and -dispatch-
    and rename both the -rootCommit- and the -rootDispatch- afterwards as the same functionality
    is carried out by their non-root counterparts.
    Late assignment.
    `,

    code: `
      import { VX_COUNTER_ACTIONS } from '../actions';
      import { VX_COUNTER_MUTATIONS } from '../mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT] ({ rootCommit, rootDispatch }, payload) {
          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME);
          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now());

          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT);
          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT, payload);
        }
      };
      
      export const actions = vxActions;
    `,

    output: formatResult(`
      import { VX_COUNTER_ACTIONS } from '../actions';
      import { VX_COUNTER_MUTATIONS } from '../mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT.substr(VX_NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit, dispatch }, payload) {
          commit(VX_COUNTER_MUTATIONS.SET_TIME, null, { root: true });
          commit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });

          dispatch(VX_COUNTER_ACTIONS.INCREMENT, null, { root: true });
          dispatch(VX_COUNTER_ACTIONS.INCREMENT, payload, { root: true });
        }
      };
      
      export const actions = vxActions;
    `)
  },

  {
    title: `
    Should transform both -rootCommit- and -rootDispatch- to a standard -commit- and -dispatch-
    and remove both the -rootCommit- and the -rootDispatch- afterwards as the same functionality
    is carried out by their non-root counterparts. The already existing -commit- and -dispatch-
    operation must remain untouched.
    `,

    code: `
      import { VX_COUNTER_ACTIONS } from '../actions';
      import { VX_COUNTER_MUTATIONS } from '../mutations';
      import { VX_NESTED_MUTATIONS } from './mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      export const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT] ({ commit, rootCommit, dispatch, rootDispatch }, payload) {
          commit(VX_NESTED_MUTATIONS.INCREMENT, payload);
          dispatch(VX_NESTED_ACTIONS.OTHER_ACTION, payload);

          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME);
          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now());

          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT);
          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT, payload);
        }
      };
    `,

    output: formatResult(`
      import { VX_COUNTER_ACTIONS } from '../actions';
      import { VX_COUNTER_MUTATIONS } from '../mutations';
      import { VX_NESTED_MUTATIONS } from './mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      export const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT.substr(VX_NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit, dispatch }, payload) {
          commit(VX_NESTED_MUTATIONS.INCREMENT.substr(VX_NESTED_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
          dispatch(VX_NESTED_ACTIONS.OTHER_ACTION.substr(VX_NESTED_ACTIONS.OTHER_ACTION.lastIndexOf("/") + 1), payload);

          commit(VX_COUNTER_MUTATIONS.SET_TIME, null, { root: true });
          commit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });

          dispatch(VX_COUNTER_ACTIONS.INCREMENT, null, { root: true });
          dispatch(VX_COUNTER_ACTIONS.INCREMENT, payload, { root: true });
        }
      };
    `)
  },

  {
    title: `
    Should transform both -rootCommit- and -rootDispatch- to a standard -commit- and -dispatch-
    and remove both the -rootCommit- and the -rootDispatch- afterwards as the same functionality
    is carried out by their non-root counterparts. The already existing -commit- and -dispatch-
    operation must remain untouched.
    Late assignment.
    `,

    code: `
      import { VX_COUNTER_ACTIONS } from '../actions';
      import { VX_COUNTER_MUTATIONS } from '../mutations';
      import { VX_NESTED_MUTATIONS } from './mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT] ({ commit, rootCommit, dispatch, rootDispatch }, payload) {
          commit(VX_NESTED_MUTATIONS.INCREMENT, payload);
          dispatch(VX_NESTED_ACTIONS.OTHER_ACTION, payload);

          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME);
          rootCommit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now());

          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT);
          rootDispatch(VX_COUNTER_ACTIONS.INCREMENT, payload);
        }
      };
      
      export const actions = vxActions;
    `,

    output: formatResult(`
      import { VX_COUNTER_ACTIONS } from '../actions';
      import { VX_COUNTER_MUTATIONS } from '../mutations';
      import { VX_NESTED_MUTATIONS } from './mutations';

      export const VX_NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      const vxActions = {
        [VX_NESTED_ACTIONS.INCREMENT.substr(VX_NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit, dispatch }, payload) {
          commit(VX_NESTED_MUTATIONS.INCREMENT.substr(VX_NESTED_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
          dispatch(VX_NESTED_ACTIONS.OTHER_ACTION.substr(VX_NESTED_ACTIONS.OTHER_ACTION.lastIndexOf("/") + 1), payload);

          commit(VX_COUNTER_MUTATIONS.SET_TIME, null, { root: true });
          commit(VX_COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });

          dispatch(VX_COUNTER_ACTIONS.INCREMENT, null, { root: true });
          dispatch(VX_COUNTER_ACTIONS.INCREMENT, payload, { root: true });
        }
      };
      
      export const actions = vxActions;
    `)
  },
]
