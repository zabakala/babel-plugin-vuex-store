const visitor = (t) => ({
  AssignmentExpression (path) {
    if (
        t.isIdentifier(path.node.left) &&
        !path.scope.hasBinding(path.node.left.name)
    ) {
      path.node.left = t.memberExpression(t.identifier('window'), t.identifier(path.node.left.name))
    }

    if (
        t.isMemberExpression(path.node.left) &&
        path.node.left.object.name === 'window'
    ) {
      const typeOfNode = t.unaryExpression('typeof', path.node.left)
      const isNodeUndefined = t.binaryExpression('===', typeOfNode, t.stringLiteral('undefined'))
      const ifNodeUndefined = t.ifStatement(isNodeUndefined, t.expressionStatement(path.node))

      path.replaceWith(ifNodeUndefined)
      path.skip()
    }
  }
})

module.exports = function tester ({ types: t }) {
  return {
    name: 'window',
    visitor: visitor(t)
  }
}
