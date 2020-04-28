<h3>FLOW</h3>

Plugins run before presets.

<h3>RUNNING SCRIPTS</h3>

**vuex-base**<br>
**vuex-plugin**<br>
plugin: _./.babelrc_<br>
_node_modules/.bin/webpack_

**vue-nuxt**<br>
plugin: _./vue-nuxt/.babelrc_<br>
_npm run dev_<br>
_npm run generate (prod build)_<br>

**typescript**<br>
**typescript-class**<br>
 _../../../node_modules/.bin/tsc_ whenever a .ts file changes<br>
_node_modules/.bin/webpack_<br>
_@babel/plugin-transform-typescript_ removes typescript and then the custom plugin kicks in
