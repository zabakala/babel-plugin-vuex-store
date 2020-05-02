// we have to use module augmentation to enrich vuex/ActionContext with new methods
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation

import { ActionContext, Commit, Dispatch } from 'vuex'

// we are adding -rootCommit- & -rootDispatch- to make them available for typings
declare module 'vuex' {
    interface ActionContext<S, R> {
        rootCommit: Commit
        rootDispatch: Dispatch
    }
}
