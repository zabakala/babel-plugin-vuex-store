import Vue from 'vue'
import Component from 'vue-class-component'

import Logo from '../../components/Logo'
import { COUNTER_ACTIONS, COUNTER_GETTERS } from '../../store/modules/counter/_map'
import { NESTED_ACTIONS, NESTED_GETTERS } from '../../store/modules/counter/nested/_map'

@Component({
    template: `
      <center class="container">
        <logo />

        <h1>vue</h1>
        <h2>babel-plugin-vuex-store</h2>

        <a
          class="link1"      
          href="javascript://" 
          @click="vxaIncrementCounter(1)">
          Increment Counter
        </a>

        <a
          class="link2"      
          href="javascript://" 
          @click="vxaRandomizeNumber">
          Randomize Number
        </a>

        <p class="p1-link1">
          {{ vxgCounter || 0 }}
        </p>
        <p class="p2-link1">
          {{ vxgCounterMultiplied(2) || 0 }}
        </p>
        <p class="p3-link1">
          {{ vxsCountPowered || 0 }}
        </p>

        <p class="p1-link2">
          root: <span>{{ vxsRootRandom || 0 }}</span> vs nested: <span>{{ vxsNestedRandom || 0 }}</span>
        </p>
        <p class="p2-link2">
          nested getter: <span>{{ vxgNestedRandomMultiplied(2) || 0 }}</span>
        </p>
        <p class="p3-link2">
          Action Time: <span>{{ vxsAlias }}</span>
        </p>
      </center>
    `,

    components: {
      Logo
    },

    computed: {
        vxsAlias: () => ({ actionTime: 'counter' }),
        vxsCountPowered: () => 'counter',
        vxsRootRandom: () => 'counter',
        vxsNestedRandom: () => 'counter/nested',

        vxgCounter: COUNTER_GETTERS.TOTAL,
        vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
        vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
    },

    methods: {
        vxaIncrementCounter: () => COUNTER_ACTIONS.INCREMENT,
        vxaRandomizeNumber: () => NESTED_ACTIONS.RANDOMIZE,
    }
})
export default class Index extends Vue {}
