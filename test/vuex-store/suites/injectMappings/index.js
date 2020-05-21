const { formatResult } = require('../../utils')
const {
  ABBR_VX_ACT,
  ABBR_VX_GET,
  ABBR_VX_STT,
} = require('../../../../plugin/src/const')

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
          vxaIncrementCounter: () => COUNTER_ACTIONS.INCREMENT
        }
      };
    `,

    output: formatResult(`
      import { mapActions } from "vuex";
      
      export default {
        methods: {
          ...mapActions({
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT
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
          vxaIncrementCounter: () => COUNTER_ACTIONS.INCREMENT,
          vxaIncrementCounter: () => { return COUNTER_ACTIONS.INCREMENT },
          vxaRandomizeNumber () { return NESTED_ACTIONS.RANDOMIZE }
        }
      };
    `,

    output: formatResult(`
      import { mapActions } from "vuex";
      
      export default {
        methods: {
          ...mapActions({
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxaRandomizeNumber: NESTED_ACTIONS.RANDOMIZE
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
          vxaIncrementCounter: () => COUNTER_ACTIONS.INCREMENT,
          vxaIncrementCounter: () => { return COUNTER_ACTIONS.INCREMENT },
          test() {},
          vxaRandomizeNumber () { return NESTED_ACTIONS.RANDOMIZE },
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
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxaRandomizeNumber: NESTED_ACTIONS.RANDOMIZE
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
          vxaIncrementCounter: () => COUNTER_ACTIONS.INCREMENT,
          vxaIncrementCounter: () => { return COUNTER_ACTIONS.INCREMENT },
          test() {},
          vxaRandomizeNumber () { return NESTED_ACTIONS.RANDOMIZE },
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
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxaRandomizeNumber: NESTED_ACTIONS.RANDOMIZE
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
          vxgCounter: COUNTER_GETTERS.TOTAL
        }
      };
    `,

    output: formatResult(`
      import { mapGetters } from "vuex";
      
      export default {
        computed: {
          ...mapGetters({
            vxgCounter: COUNTER_GETTERS.TOTAL
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
          vxgCounter: COUNTER_GETTERS.TOTAL,
          vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
          vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
        }
      };
    `,

    output: formatResult(`
      import { mapGetters } from "vuex";
      
      export default {
        computed: {
          ...mapGetters({
            vxgCounter: COUNTER_GETTERS.TOTAL,
            vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
            vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED
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
          vxgCounter: COUNTER_GETTERS.TOTAL,
          vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
          test() {},
          vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
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
            vxgCounter: COUNTER_GETTERS.TOTAL,
            vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
            vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED
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
          vxgCounter: COUNTER_GETTERS.TOTAL,
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
            vxgCounter: COUNTER_GETTERS.TOTAL
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
          vxsActionTime: 'counter'
        }
      };
    `,

    output: formatResult(`
      import { mapState } from "vuex";
      
      export default {
        computed: {
          ...mapState("counter", {
            vxsActionTime: "actionTime"
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
          vxsActionTime: 'counter',
          vxsCountPowered: 'counter',
          vxsNestedRandom: 'counter/nested'
        }
      };
    `,

    output: formatResult(`
      import { mapState } from "vuex";

      export default {
        computed: {
          ...mapState("counter", {
            vxsActionTime: "actionTime"
          }),
          
          ...mapState("counter", {
            vxsCountPowered: "countPowered"
          }),
          
          ...mapState("counter/nested", {
            vxsNestedRandom: "nestedRandom"
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
          vxsAlias: { actionTime: 'counter' },
          vxsCountPowered: 'counter',
          test: 1,
          vxsNestedRandom: 'counter/nested',
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
            vxsAlias: "actionTime"
          }),
          
          ...mapState("counter", {
            vxsCountPowered: "countPowered"
          }),
          
          ...mapState("counter/nested", {
            vxsNestedRandom: "nestedRandom"
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
          vxsAliasFoo: () => ({ actionTime: 'counter' }),
          vxsCountPowered: () => 'counter',
          test: 1,
          vxsNestedRandom: () => 'counter/nested',
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
            vxsAliasFoo: "actionTime"
          }),
          
          ...mapState("counter", {
            vxsCountPowered: "countPowered"
          }),
          
          ...mapState("counter/nested", {
            vxsNestedRandom: "nestedRandom"
          })
        }
      });
    `)
  },

  /**
   * mapState & mapGetters & mapActions
   */
  {
    title: `
    Should import -mapState-, -mapGetters- & -mapActions- from -vuex-.
    Should replace prefixed props with its store
    counterpart, i.e. -map[State|Getters|Actions]({ ... })-.
    `,

    code: `
      export default {
        computed: {
          test: 1,
          vxsAlias: { actionTime: 'counter' },
          vxsCountPowered: 'counter',
          test: 1,
          vxsNestedRandom: 'counter/nested',
          test() {},
          vxgCounter: COUNTER_GETTERS.TOTAL,
          vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
          test() {},
          vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
          test() {}
        },
        
        methods: {
          test() {},
          vxaIncrementCounter: () => COUNTER_ACTIONS.INCREMENT,
          vxaIncrementCounter: () => { return COUNTER_ACTIONS.INCREMENT },
          test() {},
          vxaRandomizeNumber () { return NESTED_ACTIONS.RANDOMIZE },
          test() {}
        }
      };
    `,

    output: formatResult(`
      import { mapGetters, mapState, mapActions } from "vuex";
      
      export default {
        computed: {
          test: 1,
          test: 1,
          test() {},
          test() {},
          test() {},
          
          ...mapGetters({
            vxgCounter: COUNTER_GETTERS.TOTAL,
            vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
            vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED
          }),
          
          ...mapState("counter", {
            vxsAlias: "actionTime"
          }),
          
          ...mapState("counter", {
            vxsCountPowered: "countPowered"
          }),
          
          ...mapState("counter/nested", {
            vxsNestedRandom: "nestedRandom"
          })
        },
        
        methods: {
          test() {},
          test() {},
          test() {},
          
          ...mapActions({
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxaRandomizeNumber: NESTED_ACTIONS.RANDOMIZE
          })
        }
      };
    `)
  },

  {
    title: `
    Should import -mapState-, -mapGetters- & -mapActions- from -vuex-.
    Should replace prefixed props with its store
    counterpart, i.e. -map[State|Getters|Actions]({ ... })-.
    We are testing typescript class components.
    `,

    code: `
      let cmp = Component({
        computed: {
          test: 1,
          vxsAlias: () => ({ actionTime: 'counter' }),
          vxsCountPowered: () => 'counter',
          test: 1,
          vxsNestedRandom: () => 'counter/nested',
          test() {},
          vxgCounter: COUNTER_GETTERS.TOTAL,
          vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
          test() {},
          vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
          test() {}
        },
        
        methods: {
          test() {},
          vxaIncrementCounter: () => COUNTER_ACTIONS.INCREMENT,
          vxaIncrementCounter: () => { return COUNTER_ACTIONS.INCREMENT },
          test() {},
          vxaRandomizeNumber () { return NESTED_ACTIONS.RANDOMIZE },
          test() {}
        }
      });
    `,

    output: formatResult(`
      import { mapGetters, mapState, mapActions } from "vuex";
      
      let cmp = Component({
        computed: {
          test: 1,
          test: 1,
          test() {},
          test() {},
          test() {},
          
          ...mapGetters({
            vxgCounter: COUNTER_GETTERS.TOTAL,
            vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
            vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED
          }),
          
          ...mapState("counter", {
            vxsAlias: "actionTime"
          }),
          
          ...mapState("counter", {
            vxsCountPowered: "countPowered"
          }),
          
          ...mapState("counter/nested", {
            vxsNestedRandom: "nestedRandom"
          })
        },
        
        methods: {
          test() {},
          test() {},
          test() {},
          
          ...mapActions({
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT,
            vxaRandomizeNumber: NESTED_ACTIONS.RANDOMIZE
          })
        }
      });
    `)
  },

  /**
   * Needless imports should not be duplicated
   */
  {
    title: `
    Imports -mapGetters- & -mapActions- from -vuex- needlessly provided.
    Duplicate imports should not provided again.
    `,

    code: `
      import { mapGetters, mapActions } from "vuex";
      
      export default {
        computed: {
          test() {},
          vxgCounter: COUNTER_GETTERS.TOTAL,
          vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
          test() {},
          vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
          test() {}
        },
        
        methods: {
          test() {},
          vxaIncrementCounter: () => COUNTER_ACTIONS.INCREMENT
        }
      };
    `,

    output: formatResult(`
      import { mapGetters, mapActions } from "vuex";
      
      export default {
        computed: {
          test() {},
          test() {},
          test() {},
          
          ...mapGetters({
            vxgCounter: COUNTER_GETTERS.TOTAL,
            vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
            vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED
          })
        },
        
        methods: {
          test() {},
          
          ...mapActions({
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT
          })
        }
      };
    `)
  },

  {
    title: `
    Import -mapActions- from -vuex- needlessly provided.
    Duplicate import should not provided again.
    `,

    code: `
      import { mapActions } from "vuex";
      
      export default {
        computed: {
          test() {},
          vxgCounter: COUNTER_GETTERS.TOTAL,
          vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
          test() {},
          vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED,
          test() {}
        },
        
        methods: {
          test() {},
          vxaIncrementCounter: () => COUNTER_ACTIONS.INCREMENT
        }
      };
    `,

    output: formatResult(`
      import { mapActions, mapGetters } from "vuex";
      
      export default {
        computed: {
          test() {},
          test() {},
          test() {},
          
          ...mapGetters({
            vxgCounter: COUNTER_GETTERS.TOTAL,
            vxgCounterMultiplied: COUNTER_GETTERS.TOTAL_MULTIPLIED,
            vxgNestedRandomMultiplied: NESTED_GETTERS.RANDOM_MULTIPLIED
          })
        },
        
        methods: {
          test() {},
          
          ...mapActions({
            vxaIncrementCounter: COUNTER_ACTIONS.INCREMENT
          })
        }
      };
    `)
  },

  {
    title: `
    Imports -mapState- & -mapGetters- from -vuex- needlessly provided.
    Duplicate imports should not be provided again.
    We are testing typescript class components.
    `,

    code: `
      import { mapGetters, mapState } from "vuex";
      
      let cmp = Component({
        computed: {
          vxsAlias: () => ({ actionTime: 'counter' }),
          vxgCounter: COUNTER_GETTERS.TOTAL
        }
      });
    `,

    output: formatResult(`
      import { mapGetters, mapState } from "vuex";
      
      let cmp = Component({
        computed: {
          ...mapGetters({
            vxgCounter: COUNTER_GETTERS.TOTAL
          }),
          
          ...mapState("counter", {
            vxsAlias: "actionTime"
          })
        }
      });
    `)
  },

  {
    title: `
    Import -mapState- from -vuex- needlessly provided.
    Duplicate import should not be provided again.
    We are testing typescript class components.
    `,

    code: `
      import { mapState } from "vuex";
      
      let cmp = Component({
        computed: {
          vxsAlias: () => ({ actionTime: 'counter' }),
          vxgCounter: COUNTER_GETTERS.TOTAL
        }
      });
    `,

    output: formatResult(`
      import { mapState, mapGetters } from "vuex";
      
      let cmp = Component({
        computed: {
          ...mapGetters({
            vxgCounter: COUNTER_GETTERS.TOTAL
          }),
          
          ...mapState("counter", {
            vxsAlias: "actionTime"
          })
        }
      });
    `)
  },
]
