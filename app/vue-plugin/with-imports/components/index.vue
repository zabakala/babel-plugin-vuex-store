<template>
  <center class="container">
    <logo />

    <h1>vue</h1>
    <h2>babel-plugin-vuex-store</h2>

    <a
      class="link1"
      href="javascript://"
      @click="incrementCounter(1)">
      Increment Counter
    </a>

    <a
      class="link2"
      href="javascript://"
      @click="randomizeNumber">
      Randomize Number
    </a>

    <p class="p1-link1">
      {{ counter || 0 }}
    </p>
    <p class="p2-link1">
      {{ counterMultiplied(2) || 0 }}
    </p>
    <p class="p3-link1">
      {{ countPowered || 0 }}
    </p>

    <p class="p1-link2">
      root: <span>{{ rootRandom || 0 }}</span> vs nested: <span>{{ nestedRandom || 0 }}</span>
    </p>
    <p class="p2-link2">
      nested getter: <span>{{ nestedRandomMultiplied(2) || 0 }}</span>
    </p>
    <p class="p3-link2">
      Action Time: <span>{{ actionTimeAlias }}</span>
    </p>
  </center>
</template>

<script>
  import Logo from '../../components/Logo'

  import { mapActions, mapGetters, mapState } from 'vuex'
  import { VX_COUNTER_ACTIONS, VX_COUNTER_GETTERS } from '../../store/modules/counter/_map'
  import { VX_NESTED_ACTIONS, VX_NESTED_GETTERS } from '../../store/modules/counter/nested/_map'

  export default {
    components: {
      Logo
    },

    computed: {
      ...mapState('counter', ['countPowered', 'rootRandom']),
      ...mapState('counter', { actionTimeAlias: 'actionTime'}),
      ...mapState('counter/nested', ['nestedRandom']),

      ...mapGetters({
        counter: VX_COUNTER_GETTERS.TOTAL,
        counterMultiplied: VX_COUNTER_GETTERS.TOTAL_MULTIPLIED,
        nestedRandomMultiplied: VX_NESTED_GETTERS.RANDOM_MULTIPLIED,
      }),
    },

    methods: {
      ...mapActions({
        incrementCounter: VX_COUNTER_ACTIONS.INCREMENT,
        randomizeNumber: VX_NESTED_ACTIONS.RANDOMIZE,
      }),
    }
  }
</script>

