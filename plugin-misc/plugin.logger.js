const visitor = (t) => ({
  Identifier (path) {
    if (path.node.name === "i") path.node.name = "x"
  },

  BinaryExpression (path) {
    if (path.node.right.value === 42) path.node.right = t.identifier("n")
  },

  FunctionDeclaration: {
    enter (path) {
      path
        .get("body")
        .unshiftContainer(
            "body",
            t.callExpression(
                t.memberExpression(t.identifier("console"), t.identifier("time")),
                [t.stringLiteral(path.node.id.name)]
            )
        )
    },

    exit (path) {
      const blockStatement = path.get("body")
      const lastExpression = blockStatement.get("body").pop()

      const timeStatement = t.callExpression(
          t.memberExpression(t.identifier("console"), t.identifier("timeEnd")),
          [t.stringLiteral(path.node.id.name)]
      )

      if (t.isReturnStatement(lastExpression)) {
        lastExpression.insertBefore(timeStatement)
      } else {
        lastExpression.insertAfter(timeStatement)
      }
    }
  }
})

module.exports = function tester ({ types: t }) {
  return {
    name: 'logger',
    visitor: visitor(t)
  }
}
