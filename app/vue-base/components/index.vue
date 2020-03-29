<template>
  <center>
    <logo />

    <h1>vue</h1>
    <h2>babel-plugin-vuex-store</h2>

    <a href="javascript://" @click="incrementCounter(1)">
      Increment Counter
    </a>

    <a href="javascript://" @click="randomizeNumber">
      Randomize Number
    </a>

    <p>{{ counter || 0 }}</p>
    <p>{{ counterMultiplied(2) || 0 }}</p>
    <p>{{ countPowered || 0 }}</p>

    <p>root: {{ rootRandom || 0 }} vs nested: {{ nestedRandom || 0 }}</p>
    <p>nested getter: {{ nestedRandomMultiplied(2) || 0 }}</p>

    <p>Action Time: {{ actionTime }}</p>
  </center>
</template>

<script>
  import Logo from './Logo'

  import { mapActions, mapGetters, mapState } from 'vuex'
  import { COUNTER_ACTIONS, COUNTER_GETTERS } from '../store/modules/counter/_map'
  import { NESTED_ACTIONS, NESTED_GETTERS } from '../store/modules/counter/nested/_map'

  export default {
    components: {
      Logo
    },

    computed: {
      ...mapGetters({
        counter: COUNTER_GETTERS.TOTAL,
        counterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
        nestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
      }),

      ...mapState('counter', ['actionTime', 'countPowered', 'rootRandom']),
      ...mapState('counter/nested', ['nestedRandom'])
    },

    methods: {
      ...mapActions({
        incrementCounter: COUNTER_ACTIONS.INCREMENT,
        randomizeNumber: NESTED_ACTIONS.RANDOMIZE,
      }),
    }
  }
</script>

