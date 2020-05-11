<template>
  <center>
    <logo />

    <h1>vue</h1>
    <h2>babel-plugin-vuex-store</h2>

    <a
      class="link1"
      href="javascript://"
      @click="vxa_incrementCounter(1)">
      Increment Counter
    </a>

    <a
      class="link2"
      href="javascript://"
      @click="vxa_randomizeNumber">
      Randomize Number
    </a>

    <p class="p1-link1">
      {{ vxg_counter || 0 }}
    </p>
    <p class="p2-link1">
      {{ vxg_counterMultiplied(2) || 0 }}
    </p>
    <p class="p3-link1">
      {{ vxs_countPowered || 0 }}
    </p>

    <p class="p1-link2">
      root: <span>{{ vxs_rootRandom || 0 }}</span> vs nested: <span>{{ vxs_nestedRandom || 0 }}</span>
    </p>
    <p class="p2-link2">
      nested getter: <span>{{ vxg_nestedRandomMultiplied(2) || 0 }}</span>
    </p>
    <p class="p3-link2">
      Action Time: <span>{{ vxs_alias }}</span>
    </p>
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

