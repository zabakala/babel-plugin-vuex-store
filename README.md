<div align="center">
<h1>babel-plugin-vuex-store</h1>

[![Build Status](https://travis-ci.com/zabakala/babel-plugin-vuex-store.svg?token=qRgvpnpesqLQasVDw5sN&branch=master)](https://travis-ci.com/zabakala/babel-plugin-vuex-store)
[![codecov](https://codecov.io/gh/zabakala/babel-plugin-vuex-store/branch/master/graph/badge.svg?token=JH6HQI0UUB)](https://codecov.io/gh/zabakala/babel-plugin-vuex-store)

**Babel-Plugin-Vuex-Store** (shortly **vx** for Vuex) packs along a couple of features to simplify your Vuex-related coding.
</div>


## Installation and usage
#### Install

```sh
npm install babel-plugin-vuex-store
```
#### Basic usage
_.babelrc_ (applicable to **nuxt** as well)
```sh
{
  "plugins": [
    "babel-plugin-vuex-store"
  ]
}
```
#### Typescript usage
_.babelrc_ (order matters)
```sh
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-transform-typescript",
    "babel-plugin-vuex-store"
  ]
}
```

The app entry file should also import proper typings:
```sh
/// <reference path="node_modules/babel-plugin-vuex-store/vuex.d.ts" />
```

## Examples
#### Actions, Mutations, Getters
Suppose you have a file defined like this:
```sh
export const COUNTER_ACTIONS = {
    INCREMENT: "counter/increment"
};

export const COUNTER_MUTATIONS = {
    INCREMENT: "increment"
};

export const COUNTER_GETTERS = {
  TOTAL: 'counter/total'
}
```
This tends to be repetitive as you mostly mention the action, mutation or getter names twice, firstly as a key and secondly as a value after the module namespace.

Using this plugin allows you to specify only the module name as an array item. That is all there is to it:
```sh
export const VX_COUNTER_ACTIONS = {
  INCREMENT: ['counter']
}

export const VX_COUNTER_MUTATIONS = {
  INCREMENT: ['counter']
}

export const VX_COUNTER_GETTERS = {
  TOTAL: ['counter']
}
```

By now you have probably guessed it right for how to deal with nested modules. Just extend the array with the nested module:
```sh
export const VX_NESTED_ACTIONS = {
  INCREMENT: ['counter', 'nestedModule']
}

export const VX_NESTED_MUTATIONS = {
  INCREMENT: ['counter', 'nestedModule']
}

export const VX_NESTED_GETTERS = {
  TOTAL: ['counter', 'nestedModule']
}
```

To make it all possible, the only requirements are:
**1** - sticking to a prefix naming convention when defining your actions, mutations or getters schema:
- VX_[...]

i.e.:

- export const VX_COUNTER_ACTIONS = { ... }<br>
- export const VX_COUNTER_MUTATIONS = { ... }<br>
- export const VX_COUNTER_GETTERS = { ... }

**2** - sticking to a prefix naming convention when defining the implementation body of your actions, mutations or getters:

- vx[...]

i.e.:

- export const vxActions = { ... }<br>
- export const vxMutations = { ... }<br>
- export const vxGetters = { ... }

You can then do your imports within your store without a need to do any module name-spacing stuff, just:
```sh
import { VX_COUNTER_ACTIONS, VX_COUNTER_MUTATIONS } from '...'

export const vxActions = {
  [VX_COUNTER_ACTIONS.INCREMENT] ({ commit }, payload) {
    commit(VX_COUNTER_MUTATIONS.INCREMENT, payload)
  }
}
```

```sh
import { VX_COUNTER_MUTATIONS } from '...'

export const vxMutations = {
  [VX_COUNTER_MUTATIONS.INCREMENT] (state, payload) {
    state.count += payload
  }
}
```

```sh
import { VX_COUNTER_GETTERS } from '...'

export const vxGetters = {
  [VX_COUNTER_GETTERS.TOTAL] (state) {
    return state.count
  }
}
```

It is all the same inside a component. just do your imports, no module name-spacing needed:

_example_template.vue_
```sh
<template>
    ...
</template>

<script>
    import { mapActions, mapGetters, mapState } 
        from 'vuex'
    import { VX_COUNTER_GETTERS } 
        from './store/modules/counter/...'
    import { VX_NESTED_ACTIONS } 
        from './store/modules/counter/nested/...'
    
    export default {
        computed: {
          ...mapGetters({
            counter: VX_COUNTER_GETTERS.TOTAL
          }),
        },
        
        methods: {
          ...mapActions({
            incrementCounter: VX_COUNTER_ACTIONS.INCREMENT
          })
        }
    }
</script>
```

#### RootActions, RootMutations
Tired of something like this?
```sh
dispatch(COUNTER_ACTIONS.INCREMENT, null, { root: true });
dispatch(COUNTER_ACTIONS.INCREMENT, payload, { root: true });
```
This _{ root: true }_ is kind of repetitive and verbose too, especially if there is no payload (i.e. null) to deal with.

Time to meet your new friends, **rootDispatch** and **rootCommit**:
```sh
import { NESTED_ACTIONS } from './actions';
import { COUNTER_ACTIONS } from '../actions';
import { COUNTER_MUTATIONS } from '../mutations';

export const vxActions = {
    [NESTED_ACTIONS.INCREMENT] ({ rootCommit, rootDispatch }, payload) {
      rootCommit(COUNTER_MUTATIONS.SET_TIME_X);
      rootCommit(COUNTER_MUTATIONS.SET_TIME_Y, Date.now());
    
      rootDispatch(COUNTER_ACTIONS.INCREMENT_X);
      rootDispatch(COUNTER_ACTIONS.INCREMENT_Y, payload);
    }
};
```
Is it not a lot nicer and less verbose? 

Guess what, let's simplify it even more. Looking at the _example_template.vue_ component above, you have to import _mapState_, _mapActions_ and _mapGetters_ to get Vuex things going. But the plugin makes it possible to do without these imports.

Just meet your new prefix friends:
- **vxs** to represent Vuex state 
- **vxa** to represent Vuex actions 
- **vxg** to represent Vuex getters 

Take a look at the same component without the imports:

```sh
<template>
    <a href="javascript://" @click="vxa_incrementCounter(1)">
      Increment Counter
    </a>

    <p>
        {{ vxgCounter }}
        {{ vxgCounterMultiplied(2) }}
    </p>

    <p>
        {{ vxsAlias }} 
        {{ vxsCountBasic }} 
        {{ vxsCountNested }}</p>
    </p>
  </center>
</template>

<script>
  import { COUNTER_ACTIONS, COUNTER_GETTERS } 
    from './store/modules/counter/...'
  import { NESTED_ACTIONS, NESTED_GETTERS } 
    from './store/modules/counter/nested/...'

  export default {
    computed: {
      vxsAlias: { otherCount: 'counter' },
      vxsCountBasic: 'counter',
      vxsCountNested: 'counter/nested',

      vxgCounter: COUNTER_GETTERS.TOTAL,
      vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED
    },

    methods: {
      vxaIncrementCounter: () => COUNTER_ACTIONS.INCREMENT
    }
  }
</script>
```
The resultant component contains less code and is more straightforward in what it intends to do.

Now, let's code efficiently and do not hesitate to contribute.
