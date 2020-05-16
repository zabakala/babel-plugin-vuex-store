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
          class="link1 button--green"
          href="javascript:void(0)"
          @click="incrementCounter(1)"
        >
          Increment Counter
        </a>
        <a
          class="link2 button--grey"
          href="javascript:void(0)"
          @click="randomizeNumber"
        >
          Randomize Number
        </a>
      </div>

      <div>
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
