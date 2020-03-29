const { formatResult } = require('../../utils')
const {
  ABBR_VX_ACT,
  ABBR_VX_GET,
  ABBR_VX_STT,
} = require('../../../../plugin/vuex-store/const')

module.exports.injectMappings = [
  /**
   * mapActions
   */
  {
    title: `
    Should import -mapActions- from -vuex-.
    Should replace methods prefixed with -${ABBR_VX_ACT}- with its store
    counterpart, i.e. -mapActions({ ... })-.
    Single method.
    `,

    code: `
      export default {
        methods: {
          vxa_incrementCounter: () => COUNTER_ACTIONS.INCREMENT
        }
      };
    `,

    output: formatResult(`
      import { mapActions } from "vuex";
      
      export default {
        methods: {
          ...mapActions({
            vxa_incrementCounter: COUNTER_ACTIONS.INCREMENT
          })
        }
      };
    `)
  },

  {
    title: `
    Should import -mapActions- from -vuex-.
    Should replace methods prefixed with -${ABBR_VX_ACT}- with its store
    counterpart, i.e. -mapActions({ ... })-.
    Multiple methods.
    `,

    code: `
      export default {
        methods: {
          vxa_incrementCounter: () => COUNTER_ACTIONS.INCREMENT,
          vxa_incrementCounter: () => { return COUNTER_ACTIONS.INCREMENT },
          vxa_randomizeNumber () { return NESTED_ACTIONS.RANDOMIZE }
        }
      };
    `,

    output: formatResult(`
      import { mapActions } from "vuex";
      
      export default {
        methods: {
          ...mapActions({
            vxa_incrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxa_incrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxa_randomizeNumber: NESTED_ACTIONS.RANDOMIZE
          })
        }
      };
    `)
  },

  {
    title: `
    Should import -mapActions- from -vuex-.
    Should replace methods prefixed with -${ABBR_VX_ACT}- with its store
    counterpart, i.e. -mapActions({ ... })-.
    Multiple methods mixed with other unrelated methods.
    `,

    code: `
      export default {
        methods: {
          test() {},
          vxa_incrementCounter: () => COUNTER_ACTIONS.INCREMENT,
          vxa_incrementCounter: () => { return COUNTER_ACTIONS.INCREMENT },
          test() {},
          vxa_randomizeNumber () { return NESTED_ACTIONS.RANDOMIZE },
          test() {}
        }
      };
    `,

    output: formatResult(`
      import { mapActions } from "vuex";
      
      export default {
        methods: {
          test() {},
          test() {},
          test() {},
          
          ...mapActions({
            vxa_incrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxa_incrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxa_randomizeNumber: NESTED_ACTIONS.RANDOMIZE
          })
        }
      };
    `)
  },

  {
    title: `
    Should import -mapActions- from -vuex-.
    Should replace props prefixed with -${ABBR_VX_ACT}- with its store
    counterpart, i.e. -mapActions({ ... })-.
    Multiple props mixed with other unrelated props.
    Computed props are function calls here as we are testing typescript
    class components.
    `,

    code: `
      let cmp = Component({
        methods: {
          test() {},
          vxa_incrementCounter: () => COUNTER_ACTIONS.INCREMENT,
          vxa_incrementCounter: () => { return COUNTER_ACTIONS.INCREMENT },
          test() {},
          vxa_randomizeNumber () { return NESTED_ACTIONS.RANDOMIZE },
          test() {}
        }
      });
    `,

    output: formatResult(`
      import { mapActions } from "vuex";

      let cmp = Component({
        methods: {
          test() {},
          test() {},
          test() {},
          
          ...mapActions({
            vxa_incrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxa_incrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxa_randomizeNumber: NESTED_ACTIONS.RANDOMIZE
          })
        }
      });
    `)
  },

  /**
   * mapGetters
   */
  {
    title: `
    Should import -mapGetters- from -vuex-.
    Should replace methods prefixed with -${ABBR_VX_GET}- with its store
    counterpart, i.e. -mapGetters({ ... })-.
    Single method.
    `,

    code: `
      export default {
        computed: {
          vxg_counter: COUNTER_GETTERS.TOTAL
        }
      };
    `,

    output: formatResult(`
      import { mapGetters } from "vuex";
      
      export default {
        computed: {
          ...mapGetters({
            vxg_counter: COUNTER_GETTERS.TOTAL
          })
        }
      };
    `)
  },

  {
    title: `
    Should import -mapGetters- from -vuex-.
    Should replace methods prefixed with -${ABBR_VX_GET}- with its store
    counterpart, i.e. -mapGetters({ ... })-.
    Multiple methods.
    `,

    code: `
      export default {
        computed: {
          vxg_counter: COUNTER_GETTERS.TOTAL,
          vxg_counterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
          vxg_nestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
        }
      };
    `,

    output: formatResult(`
      import { mapGetters } from "vuex";
      
      export default {
        computed: {
          ...mapGetters({
            vxg_counter: COUNTER_GETTERS.TOTAL,
            vxg_counterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
            vxg_nestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED
          })
        }
      };
    `)
  },

  {
    title: `
    Should import -mapGetters- from -vuex-.
    Should replace methods prefixed with -${ABBR_VX_GET}- with its store
    counterpart, i.e. -mapGetters({ ... })-.
    Multiple methods mixed with other unrelated methods.
    `,

    code: `
      export default {
        computed: {
          test() {},
          vxg_counter: COUNTER_GETTERS.TOTAL,
          vxg_counterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
          test() {},
          vxg_nestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
          test() {}
        }
      };
    `,

    output: formatResult(`
      import { mapGetters } from "vuex";
      
      export default {
        computed: {
          test() {},
          test() {},
          test() {},
          
          ...mapGetters({
            vxg_counter: COUNTER_GETTERS.TOTAL,
            vxg_counterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
            vxg_nestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED
          })
        }
      };
    `)
  },

  {
    title: `
    Should import -mapGetters- from -vuex-.
    Should replace props prefixed with -${ABBR_VX_GET}- with its store
    counterpart, i.e. -mapGetters({ ... })-.
    Multiple props mixed with other unrelated props.
    Computed props are function calls here as we are testing typescript
    class components.
    `,

    code: `
      let cmp = Component({
        computed: {
          test: 1,
          vxg_counter: COUNTER_GETTERS.TOTAL,
          test: 1
        }
      });
    `,

    output: formatResult(`
      import { mapGetters } from "vuex";

      let cmp = Component({
        computed: {
          test: 1,
          test: 1,
          
          ...mapGetters({
            vxg_counter: COUNTER_GETTERS.TOTAL
          })
        }
      });
    `)
  },

  /**
   * mapState
   */
  {
    title: `
    Should import -mapState- from -vuex-.
    Should replace props prefixed with -${ABBR_VX_STT}- with its store
    counterpart, i.e. -mapState({ ... })-.
    Single method.
    `,

    code: `
      export default {
        computed: {
          vxs_actionTime: 'counter'
        }
      };
    `,

    output: formatResult(`
      import { mapState } from "vuex";
      
      export default {
        computed: {
          ...mapState("counter", {
            vxs_actionTime: "actionTime"
          })
        }
      };
    `)
  },

  {
    title: `
    Should import -mapState- from -vuex-.
    Should replace props prefixed with -${ABBR_VX_STT}- with its store
    counterpart, i.e. -mapState({ ... })-.
    Multiple methods.
    `,

    code: `
      export default {
        computed: {
          vxs_actionTime: 'counter',
          vxs_countPowered: 'counter',
          vxs_nestedRandom: 'counter/nested'
        }
      };
    `,

    output: formatResult(`
      import { mapState } from "vuex";

      export default {
        computed: {
          ...mapState("counter", {
            vxs_actionTime: "actionTime"
          }),
          
          ...mapState("counter", {
            vxs_countPowered: "countPowered"
          }),
          
          ...mapState("counter/nested", {
            vxs_nestedRandom: "nestedRandom"
          })
        }
      };
    `)
  },

  {
    title: `
    Should import -mapState- from -vuex-.
    Should replace props prefixed with -${ABBR_VX_STT}- with its store
    counterpart, i.e. -mapState({ ... })-.
    Multiple props mixed with other unrelated props.
    `,

    code: `
      export default {
        computed: {
          test: 1,
          vxs_alias: { actionTime: 'counter' },
          vxs_countPowered: 'counter',
          test: 1,
          vxs_nestedRandom: 'counter/nested',
          test: 1
        }
      };
    `,

    output: formatResult(`
      import { mapState } from "vuex";

      export default {
        computed: {
          test: 1,
          test: 1,
          test: 1,
          
          ...mapState("counter", {
            vxs_alias: "actionTime"
          }),
          
          ...mapState("counter", {
            vxs_countPowered: "countPowered"
          }),
          
          ...mapState("counter/nested", {
            vxs_nestedRandom: "nestedRandom"
          })
        }
      };
    `)
  },

  {
    title: `
    Should import -mapState- from -vuex-.
    Should replace props prefixed with -${ABBR_VX_STT}- with its store
    counterpart, i.e. -mapState({ ... })-.
    Multiple props mixed with other unrelated props.
    Computed props are function calls here as we are testing typescript
    class components.
    `,

    code: `
      let cmp = Component({
        computed: {
          test: 1,
          vxs_aliasFoo: () => ({ actionTime: 'counter' }),
          vxs_countPowered: () => 'counter',
          test: 1,
          vxs_nestedRandom: () => 'counter/nested',
          test: 1
        }
      });
    `,

    output: formatResult(`
      import { mapState } from "vuex";

      let cmp = Component({
        computed: {
          test: 1,
          test: 1,
          test: 1,
          
          ...mapState("counter", {
            vxs_aliasFoo: "actionTime"
          }),
          
          ...mapState("counter", {
            vxs_countPowered: "countPowered"
          }),
          
          ...mapState("counter/nested", {
            vxs_nestedRandom: "nestedRandom"
          })
        }
      });
    `)
  },
]
