const {formatResult} = require('../../utils')

module.exports.rootOperations = [
  {
    title: `
    Should transform a -rootCommit- to a standard -commit- and remove the -rootCommit-
    afterwards as the same functionality is carried out by the -commit- operation.
    `,

    code: `
      import { COUNTER_MUTATIONS } from '../mutations';
      import { NESTED_MUTATIONS } from './mutations';

      export const NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      export const actions = {
        [NESTED_ACTIONS.INCREMENT] ({ commit, rootCommit }, payload) {
          commit(NESTED_MUTATIONS.INCREMENT, payload);

          rootCommit(COUNTER_MUTATIONS.SET_TIME);
          rootCommit(COUNTER_MUTATIONS.SET_TIME, Date.now());
        }
      };
    `,

    output: formatResult(`
      import { COUNTER_MUTATIONS } from '../mutations';
      import { NESTED_MUTATIONS } from './mutations';

      export const NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      export const actions = {
        [NESTED_ACTIONS.INCREMENT.substr(NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit }, payload) {
          commit(NESTED_MUTATIONS.INCREMENT.substr(NESTED_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);

          commit(COUNTER_MUTATIONS.SET_TIME, null, { root: true });
          commit(COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });
        }
      };
    `)
  },

  {
    title: `
    Should transform a -rootDispatch- to a standard -dispatch- and rename the -rootDispatch-
    afterwards as the same functionality is carried out by the -dispatch- operation.
    `,

    code: `
      import { COUNTER_ACTIONS } from '../actions';

      export const NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      export const actions = {
        [NESTED_ACTIONS.INCREMENT] ({ rootDispatch }, payload) {
          rootDispatch(COUNTER_ACTIONS.INCREMENT);
          rootDispatch(COUNTER_ACTIONS.INCREMENT, payload);
        }
      };
    `,

    output: formatResult(`
      import { COUNTER_ACTIONS } from '../actions';

      export const NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      export const actions = {
        [NESTED_ACTIONS.INCREMENT.substr(NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ dispatch }, payload) {
          dispatch(COUNTER_ACTIONS.INCREMENT, null, { root: true });
          dispatch(COUNTER_ACTIONS.INCREMENT, payload, { root: true });
        }
      };
    `)
  },

  {
    title: `
    Should transform both -rootCommit- and -rootDispatch- to a standard -commit- and -dispatch-
    and rename both the -rootCommit- and the -rootDispatch- afterwards as the same functionality
    is carried out by their non-root counterparts.
    `,

    code: `
      import { COUNTER_ACTIONS } from '../actions';
      import { COUNTER_MUTATIONS } from '../mutations';

      export const NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      export const actions = {
        [NESTED_ACTIONS.INCREMENT] ({ rootCommit, rootDispatch }, payload) {
          rootCommit(COUNTER_MUTATIONS.SET_TIME);
          rootCommit(COUNTER_MUTATIONS.SET_TIME, Date.now());

          rootDispatch(COUNTER_ACTIONS.INCREMENT);
          rootDispatch(COUNTER_ACTIONS.INCREMENT, payload);
        }
      };
    `,

    output: formatResult(`
      import { COUNTER_ACTIONS } from '../actions';
      import { COUNTER_MUTATIONS } from '../mutations';

      export const NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      export const actions = {
        [NESTED_ACTIONS.INCREMENT.substr(NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit, dispatch }, payload) {
          commit(COUNTER_MUTATIONS.SET_TIME, null, { root: true });
          commit(COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });

          dispatch(COUNTER_ACTIONS.INCREMENT, null, { root: true });
          dispatch(COUNTER_ACTIONS.INCREMENT, payload, { root: true });
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
    `,

    code: `
      import { COUNTER_ACTIONS } from '../actions';
      import { COUNTER_MUTATIONS } from '../mutations';
      import { NESTED_MUTATIONS } from './mutations';

      export const NESTED_ACTIONS = {
        INCREMENT: ["counter", "nested"]
      };

      export const actions = {
        [NESTED_ACTIONS.INCREMENT] ({ commit, rootCommit, dispatch, rootDispatch }, payload) {
          commit(NESTED_MUTATIONS.INCREMENT, payload);
          dispatch(NESTED_ACTIONS.OTHER_ACTION, payload);

          rootCommit(COUNTER_MUTATIONS.SET_TIME);
          rootCommit(COUNTER_MUTATIONS.SET_TIME, Date.now());

          rootDispatch(COUNTER_ACTIONS.INCREMENT);
          rootDispatch(COUNTER_ACTIONS.INCREMENT, payload);
        }
      };
    `,

    output: formatResult(`
      import { COUNTER_ACTIONS } from '../actions';
      import { COUNTER_MUTATIONS } from '../mutations';
      import { NESTED_MUTATIONS } from './mutations';

      export const NESTED_ACTIONS = {
        INCREMENT: "counter/nested/increment"
      };

      export const actions = {
        [NESTED_ACTIONS.INCREMENT.substr(NESTED_ACTIONS.INCREMENT.lastIndexOf("/") + 1)]({ commit, dispatch }, payload) {
          commit(NESTED_MUTATIONS.INCREMENT.substr(NESTED_MUTATIONS.INCREMENT.lastIndexOf("/") + 1), payload);
          dispatch(NESTED_ACTIONS.OTHER_ACTION.substr(NESTED_ACTIONS.OTHER_ACTION.lastIndexOf("/") + 1), payload);

          commit(COUNTER_MUTATIONS.SET_TIME, null, { root: true });
          commit(COUNTER_MUTATIONS.SET_TIME, Date.now(), { root: true });

          dispatch(COUNTER_ACTIONS.INCREMENT, null, { root: true });
          dispatch(COUNTER_ACTIONS.INCREMENT, payload, { root: true });
        }
      };
    `)
  },
]
