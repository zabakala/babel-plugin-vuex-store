const pluginTester = require('babel-plugin-tester').default
const plugin = require('../../plugin/src')

const { arrToCamelCase } = require('./suites/arrToCamelCase')
const { substrConstName } = require('./suites/substrConstName')
const { rootOperations } = require('./suites/rootOperations')
const { pluginNotApplied } = require('./suites/pluginNotApplied')
const { injectMappings } = require('./suites/injectMappings')

const formatResult = (code) => code.replace(/\n/g, ' ').replace(/\s\s+/g, ' ')

pluginTester({
  plugin,

  formatResult,

  tests: arrToCamelCase
    .concat(substrConstName)
    .concat(rootOperations)
    .concat(pluginNotApplied)
    .concat(injectMappings)
})
