const pluginTester = require("babel-plugin-tester").default
const plugin = require("../../plugin.window")
const path = require("path")

pluginTester({
  plugin,

  formatResult: function (code) {
    return code.replace(/\n/g, " ").replace(/\s\s+/g, " ")
  },

  fixtures: path.join(__dirname, "../../fixtures/window")
})
