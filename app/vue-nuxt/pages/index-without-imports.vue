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
          @click="vxa_incrementCounter(1)"
        >
          Increment Counter
        </a>
        <a
          class="link2 button--grey"
          href="javascript:void(0)"
          @click="vxa_randomizeNumber"
        >
          Randomize Number
        </a>
      </div>

      <div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { COUNTER_ACTIONS, COUNTER_GETTERS } from '../store/counter/_map'
import { NESTED_ACTIONS, NESTED_GETTERS } from '../store/counter/nested/_map'

import Logo from '~/components/Logo.vue'

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
