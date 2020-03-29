<template>
  <div class="container">
    <div>
      <logo />

      <h1 class="title">
        vue-nuxt
      </h1>

      <h2 class="subtitle">
        babel-plugin-vuex-store
      </h2>

      <div class="links">
        <a
          @click="incrementCounter(1)"
          href="javascript:void(0)"
          class="button--green"
        >
          Increment Counter
        </a>
        <a
          @click="randomizeNumber"
          href="javascript:void(0)"
          class="button--grey"
        >
          Randomize Number
        </a>
      </div>

      <div>
        <p>{{ counter || 0 }}</p>
        <p>{{ counterMultiplied(2) || 0 }}</p>
        <p>{{ countPowered || 0 }}</p>

        <p>root: {{ rootRandom || 0 }} vs nested: {{ nestedRandom || 0 }}</p>
        <p>nested getter: {{ nestedRandomMultiplied(2) || 0 }}</p>

        <p>Action Time: {{ actionTimeAlias }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { COUNTER_ACTIONS, COUNTER_GETTERS } from '../store/counter/_map'
import { NESTED_ACTIONS, NESTED_GETTERS } from '../store/counter/nested/_map'

import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },

  computed: {
    ...mapState('counter', ['countPowered', 'rootRandom']),
    ...mapState('counter', { actionTimeAlias: 'actionTime'}),
    ...mapState('counter/nested', ['nestedRandom']),

    ...mapGetters({
      counter: COUNTER_GETTERS.TOTAL,
      counterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
      nestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
    }),
  },

  methods: {
    ...mapActions({
      incrementCounter: COUNTER_ACTIONS.INCREMENT,
      randomizeNumber: NESTED_ACTIONS.RANDOMIZE,
    }),
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 22px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

p {
  margin: 16px 0;
}
</style>
