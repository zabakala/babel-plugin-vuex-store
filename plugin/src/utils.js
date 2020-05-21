const {
  FORWARD_SLASH,
  STR_VUEX,
  ABBR_VX_STT,
} = require('./const')

/**
 * Ie. turn 'ABC_DEF' to 'abcDef'
 * @param {string} str
 * @returns {string}
 */
module.exports.toCamelCase = (str) => str
  .split('_')
  .map((v) => v.toLowerCase())
  .map((v, i) => i === 0 ? v : v.charAt(0).toUpperCase() + v.substr(1))
  .join('')

/**
 * Ie.turn 'counter/increment' to 'increment'
 * @param t
 * @param {object} target
 * @returns {*}
 */
module.exports.stripModulePrefix = (t, target) => {
  let member_lastIndexOf = t.memberExpression(target, t.identifier('lastIndexOf'))
  let member_substr = t.memberExpression(target, t.identifier('substr'))

  let call_indexOf = t.callExpression(
    member_lastIndexOf,
    [t.stringLiteral(FORWARD_SLASH)]
  )

  return t.callExpression(
    member_substr,
    [t.binaryExpression('+', call_indexOf, t.numericLiteral(1))]
  )
}

/**
 * Ie. turn 'ADD_TO_CART: [module]' to 'ADD_TO_CART: module/addToCart'
 * Ie. turn 'ADD_TO_CART: [module1, module2]' to 'ADD_TO_CART: module1/module2/addToCart'
 * @param t
 * @param node
 */
module.exports.addCamelCaseValueToSnakeCaseKey = (t, node) => {
  if (t.isArrayExpression(node.value)) {
    let camel = this.toCamelCase(node.key.name)

    camel = node.value.elements
      .map(({value}) => value)
      .join(FORWARD_SLASH) + FORWARD_SLASH + camel

    node.value = t.stringLiteral(camel)
  }
}

module.exports.isInExportDeclarationContext = (t, path, context) => {
  return (
    path.node.key.name === context &&
    t.isObjectProperty(path.node) &&
    t.isExportDeclaration(path.parentPath.parent)
  )
}

module.exports.isInCallExpressionContext = (t, path, context) => {
  return (
    path.node.key.name === context &&
    t.isObjectProperty(path.node) &&
    t.isCallExpression(path.parentPath.parent)
  )
}

module.exports.mapPropsToActions = (t, path, callback, context) => {
  return path.node.value.properties.map((prop) => {
    return (prop.key && prop.key.name.includes(context))
      ? callback(t, prop) : null
  }).filter((prop) => prop !== null)
}

module.exports.replacePrefixedProps = (path, context) => {
  // Replace with props that exclude prefixed elements
  // as they will reside inside -map[Mapping]- spread element below.
  return path.node.value.properties.filter((prop) => {
    return !prop.key || (prop.key && !prop.key.name.includes(context))
  })
}

module.exports.mapPropsToGettersOrState = (t, path, context) => {
  return path.node.value.properties.map((prop) => {
    return (
        prop.key && prop.key.name.includes(context) &&
        t.isObjectProperty(prop)
    ) ? prop : null
  }).filter((prop) => prop !== null)
}

module.exports.getClassWrapper = (t, path) =>
  path.findParent((path) =>
      t.isVariableDeclaration(path.parent)
  )

module.exports.getExportWrapper = (t, path) =>
  path.findParent((path) =>
      t.isExportDeclaration(path.parent)
  )

/**
 *
 * @param t
 * @param prop
 * @returns {*}
 */
module.exports.mapActions = (t, prop) => {
  let objProp
  const { key } = prop

  // vuexRandomizeNumber () { return NESTED_ACTIONS.RANDOMIZE }
  if (t.isObjectMethod(prop)) {
    objProp = t.objectProperty(key, prop.body.body[0].argument)
  }
  // vuexIncrementCounter: () => COUNTER_ACTIONS.INCREMENT
  else if (t.isMemberExpression(prop.value.body)) {
    objProp = t.objectProperty(key, prop.value.body)
  }
  // vuexIncrementCounter: () => { return COUNTER_ACTIONS.INCREMENT }
  else if (t.isBlockStatement(prop.value.body)) {
    objProp = t.objectProperty(key, prop.value.body.body[0].argument)
  }

  return objProp
}

/**
 *
 * @param t
 * @param wrapper
 * @param mappingType
 */
module.exports.insertMappingImport = (t, wrapper, mappingType) => {
  const program = wrapper.parentPath
  const programBody = program.container
  // collect all available top-level imports
  const imports = programBody.filter((node) => t.isImportDeclaration(node))

  let importedVuex = null
  let importedSpecifiers = []

  const buildSpecifier = (type) =>
    t.importSpecifier(t.identifier(type), t.identifier(type))

  // Save reference to imported vuex
  // Save references to imported vuex specifiers
  imports.forEach((node, i) => {
    if (node.source.value !== STR_VUEX) return
    importedVuex = node

    node.specifiers.forEach((n) => {
      importedSpecifiers.push(n.local.name)
    })
  });

  if (!importedVuex) {
    // vuex not yet imported so do it
    wrapper.parentPath.insertBefore(
        t.importDeclaration(
            [buildSpecifier(mappingType)],
            t.stringLiteral(STR_VUEX)
        )
    )
  } else if (!importedSpecifiers.includes(mappingType)) {
    // vuex already imported but concrete specifier is not imported yet
    if (!importedVuex) throw Error('Vuex import')
    importedVuex.specifiers.push(buildSpecifier(mappingType))
  }
}

/**
 *
 * @param t
 * @param mappingType
 * @param mappings
 * @returns {*}
 */
module.exports.getSpreadMapping = (t, mappingType, mappings) => {
  return t.spreadElement(
      t.callExpression(
          t.identifier(mappingType),
          [t.objectExpression(mappings)]
      )
  )
}

module.exports.getSpreadStateMapping = (t, mappingType, name, value) => {
  const targetState = name;

  if (t.isStringLiteral(value)) {
    /* not an alias (stringLiteral) */
    value = value.value
  } else {
    /* alias (objectProperty) */
    const props = value.properties[0]

    value = props.value.value
    name = props.key.name
  }

  if (name.includes(ABBR_VX_STT)) {
    name = name.split(ABBR_VX_STT)[1]
    name = name.charAt(0).toLowerCase() + name.substr(1)
  }

  return t.spreadElement(
      t.callExpression(
          t.identifier(mappingType),
          [
              t.stringLiteral(value),
              t.objectExpression([
                  t.objectProperty(
                    t.identifier(targetState),
                    t.stringLiteral(name)
                  )
              ])
          ]
      )
  )
}
