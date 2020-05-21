const {
  STR_ACTIONS,
  STR_MUTATIONS,
  STR_GETTERS,

  STR_COMMIT,
  STR_DISPATCH,

  STR_ROOT_COMMIT,
  STR_ROOT_DISPATCH,

  SUFFIX_ACTIONS,
  SUFFIX_MUTATIONS,
  SUFFIX_GETTERS,

  STR_COMPUTED,
  STR_METHODS,
  STR_MAP_ACTIONS,
  STR_MAP_GETTERS,
  STR_MAP_STATE,

  ABBR_VX_ACT,
  ABBR_VX_GET,
  ABBR_VX_STT,
} = require('./const')

const {
  addCamelCaseValueToSnakeCaseKey,
  getClassWrapper,
  getExportWrapper,
  getSpreadMapping,
  getSpreadStateMapping,
  insertMappingImport,
  isInCallExpressionContext,
  isInExportDeclarationContext,
  mapPropsToActions,
  mapPropsToGettersOrState,
  stripModulePrefix,
  mapActions,
  replacePrefixedProps,
} = require('./utils')

/**
 *
 * @param t
 * @returns {Object}
 */
const visitor = (t) => ({
  ObjectProperty (path) {
    if (isInExportDeclarationContext(t, path, STR_METHODS)) {
      let wrapper = getExportWrapper(t, path)

      // map to action if the fn name begins with -vuexFooBazBar-
      const actionsMap = mapPropsToActions(t, path, mapActions, ABBR_VX_ACT)

      if (actionsMap.length) {
        // insert import declaration
        insertMappingImport(t, wrapper, STR_MAP_ACTIONS)

        path.node.value.properties = replacePrefixedProps(path, ABBR_VX_ACT)

        const spreadElement = getSpreadMapping(t, STR_MAP_ACTIONS, actionsMap)
        path.node.value.properties.push(spreadElement)
      }

      return
    }

    if (isInExportDeclarationContext(t, path, STR_COMPUTED)) {
      let wrapper = getExportWrapper(t, path)

      // map to getter if the object key name begins with -vuexGetFooBazBar-
      const gettersMap = mapPropsToGettersOrState(t, path, ABBR_VX_GET)

      // map to state if the object key name begins with -vuexStateFooBazBar-
      const stateMap = mapPropsToGettersOrState(t, path, ABBR_VX_STT)

      if (gettersMap.length) {
        // insert import declaration
        insertMappingImport(t, wrapper, STR_MAP_GETTERS)

        path.node.value.properties = replacePrefixedProps(path, ABBR_VX_GET)

        const spreadElement = getSpreadMapping(t, STR_MAP_GETTERS, gettersMap)
        path.node.value.properties.push(spreadElement)
      }

      if (stateMap.length) {
        // insert import declaration
        insertMappingImport(t, wrapper, STR_MAP_STATE)

        path.node.value.properties = replacePrefixedProps(path, ABBR_VX_STT)

        stateMap.forEach((prop) => {
          const spreadElement = getSpreadStateMapping(
            t, STR_MAP_STATE, prop.key.name, prop.value
          )
          path.node.value.properties.push(spreadElement)
        })
      }
    }

    // class component
    if (isInCallExpressionContext(t, path, STR_METHODS)) {
      let wrapper = getClassWrapper(t, path)

      // map to action if the fn name begins with -vuexFooBazBar-
      const actionsMap = mapPropsToActions(t, path, mapActions, ABBR_VX_ACT)

      if (actionsMap.length) {
        // insert import declaration
        insertMappingImport(t, wrapper, STR_MAP_ACTIONS)

        path.node.value.properties = replacePrefixedProps(path, ABBR_VX_ACT)

        const spreadElement = getSpreadMapping(t, STR_MAP_ACTIONS, actionsMap)
        path.node.value.properties.push(spreadElement)
      }

      return
    }

    // class component
    if (isInCallExpressionContext(t, path, STR_COMPUTED)) {
      let wrapper = getClassWrapper(t, path)

      // map to getter if the object key name begins with -vuexGetFooBazBar-
      const gettersMap = mapPropsToGettersOrState(t, path, ABBR_VX_GET)

      // map to state if the object key name begins with -vuexStateFooBazBar-
      const stateMap = mapPropsToGettersOrState(t, path, ABBR_VX_STT)

      if (gettersMap.length) {
        // insert import declaration
        insertMappingImport(t, wrapper, STR_MAP_GETTERS)

        path.node.value.properties = replacePrefixedProps(path, ABBR_VX_GET)

        const spreadElement = getSpreadMapping(t, STR_MAP_GETTERS, gettersMap)
        path.node.value.properties.push(spreadElement)
      }

      if (stateMap.length) {
        // insert import declaration
        insertMappingImport(t, wrapper, STR_MAP_STATE)

        path.node.value.properties = replacePrefixedProps(path, ABBR_VX_STT)

        stateMap.forEach((prop) => {
          const spreadElement = getSpreadStateMapping(
            t, STR_MAP_STATE, prop.key.name, prop.value.body
          )
          path.node.value.properties.push(spreadElement)
        })
      }
    }
  },

  Identifier (path) {
    if (
        [STR_ACTIONS, STR_MUTATIONS, STR_GETTERS].includes(path.node.name)
    ) {
      if (!path.parentPath.node.init.properties) return

      path.parentPath.node.init.properties.forEach((node) => {
        /* istanbul ignore else  */
        if (t.isMemberExpression(node.key)) {
          node.key = stripModulePrefix(t, node.key)
        }
      })

      path.parentPath.traverse({
        CallExpression(path) {
          if (
              (
                  // search for commit(..), dispatch(...)
                  t.isIdentifier(path.node.callee) &&
                  [STR_COMMIT, STR_DISPATCH].includes(path.node.callee.name)
              ) || (
                  // search for store.commit(...), store.dispatch(...)
                  t.isMemberExpression(path.node.callee) &&
                  [STR_COMMIT, STR_DISPATCH].includes(path.node.callee.property.name)
              )
          ) {
            path.node.arguments[0] = stripModulePrefix(t, path.node.arguments[0])
          }
          else if (
              t.isIdentifier(path.node.callee) &&
              [STR_ROOT_COMMIT, STR_ROOT_DISPATCH].includes(path.node.callee.name)
          ) {
            path.node.callee.name = path.node.callee.name.substr('root'.length).toLowerCase()

            // add -null- if there is no payload associated
            if (path.node.arguments.length === 1) path.node.arguments.push(t.nullLiteral())

            path.node.arguments.push(
                t.objectExpression([
                  t.objectProperty(t.identifier('root'), t.BooleanLiteral(true))
                ])
            )
          }
        },

        ObjectPattern (path) {
          const props = path.node.properties

          let removeRootCommits = false
          let renameRootCommits = false

          let removeRootDispatches = false
          let renameRootDispatches = false

          const commits = props.filter((prop) => prop.key.name === STR_COMMIT)
          const rootCommits = props.filter((prop) => prop.key.name === STR_ROOT_COMMIT)

          const dispatches = props.filter((prop) => prop.key.name === STR_DISPATCH)
          const rootDispatches = props.filter((prop) => prop.key.name === STR_ROOT_DISPATCH)

          // (root)commits
          if (commits.length && rootCommits.length) {
            removeRootCommits = true
            renameRootCommits = false
          }
          else if (!commits.length && rootCommits.length) {
            removeRootCommits = false
            renameRootCommits = true
          }

          if (removeRootCommits) {
            path.node.properties = path.node.properties.filter((prop) =>
                prop.key.name !== STR_ROOT_COMMIT
            )
          }
          else if (renameRootCommits) {
            path.node.properties = path.node.properties.map((prop) => {
              if (prop.key.name === STR_ROOT_COMMIT) {
                prop.key.name = prop.value.name = STR_COMMIT
              }

              return prop
            })
          }

          // (root)dispatches
          if (dispatches.length && rootDispatches.length) {
            removeRootDispatches = true
            renameRootDispatches = false
          }
          else if (!dispatches.length && rootDispatches.length) {
            removeRootDispatches = false
            renameRootDispatches = true
          }

          if (removeRootDispatches) {
            path.node.properties = path.node.properties.filter((prop) =>
                prop.key.name !== STR_ROOT_DISPATCH
            )
          }
          else if (renameRootDispatches) {
            path.node.properties = path.node.properties.map((prop) => {
              if (prop.key.name === STR_ROOT_DISPATCH) {
                prop.key.name = prop.value.name = STR_DISPATCH
              }

              return prop
            })
          }
        }
      })

      return
    }

    if (
        path.node.name.includes('_') &&
        t.isVariableDeclarator(path.parent)
    ) {
      const nodeSuffix = [
        SUFFIX_ACTIONS,
        SUFFIX_MUTATIONS,
        SUFFIX_GETTERS
      ].filter((v) => path.node.name.includes(v))

      /* istanbul ignore else  */
      if (
          nodeSuffix[0] && path.node.name.endsWith(nodeSuffix[0])
      ) {
        path.parentPath.node.init.properties.forEach((node) => {
          addCamelCaseValueToSnakeCaseKey(t, node)
        })
      }

      path.stop()
    }
  }
})

module.exports = function ({ types: t }) {
  return {
    name: 'vuex-store',
    visitor: visitor(t)
  }
}
