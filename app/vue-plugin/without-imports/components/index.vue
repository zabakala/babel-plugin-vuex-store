<template>
  <center>
    <logo />

    <h1>vue</h1>
    <h2>babel-plugin-vuex-store</h2>

    <a href="javascript://" @click="vxa_incrementCounter(1)">
      Increment Counter
    </a>

    <a href="javascript://" @click="vxa_randomizeNumber">
      Randomize Number
    </a>

    <p>{{ vxg_counter || 0 }}</p>
    <p>{{ vxg_counterMultiplied(2) || 0 }}</p>
    <p>{{ vxs_countPowered || 0 }}</p>

    <p>root: {{ vxs_rootRandom || 0 }} vs nested: {{ vxs_nestedRandom || 0 }}</p>
    <p>nested getter: {{ vxg_nestedRandomMultiplied(2) || 0 }}</p>

    <p>Action Time: {{ vxs_alias }}</p>
  </center>
</template>

<script>
  import Logo from '../../components/Logo'

  import { COUNTER_ACTIONS, COUNTER_GETTERS } from '../../store/modules/counter/_map'
  import { NESTED_ACTIONS, NESTED_GETTERS } from '../../store/modules/counter/nested/_map'

  export default {
    components: {
      Logo
    },

    computed: {
      vxs_alias: { actionTime: 'counter' },
      vxs_countPowered: 'counter',
      vxs_rootRandom: 'counter',
      vxs_nestedRandom: 'counter/nested',

      vxg_counter: COUNTER_GETTERS.TOTAL,
      vxg_counterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
      vxg_nestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
    },

    methods: {
      vxa_incrementCounter: () => COUNTER_ACTIONS.INCREMENT,
      vxa_randomizeNumber: () => NESTED_ACTIONS.RANDOMIZE,
    }
  }
</script>

