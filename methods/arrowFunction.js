import _traverse from "@babel/traverse";
import * as t from "@babel/types";
import ast from "../utils/ast.js";
import isReactComponent from "../utils/isReactComponent.js";
import types from "../utils/types.js";

const traverse = _traverse.default;

const reactArrowFunctionComponents = [];

traverse(ast, {
  VariableDeclarator(path) {
    if (t.isArrowFunctionExpression(path.node.init)) {
      if (t.isJSXElement(path.node.init.body)) {
        reactArrowFunctionComponents.push(path.node.id.name);
      } else if (
        isReactComponent(
          types.ARROW_FUNCTION,
          path.node.init,
          path.scope,
          path.parentPath
        )
      ) {
        reactArrowFunctionComponents.push(path.node.id.name);
      }
    }
  },
  ArrowFunctionExpression(path) {
    if (
      isReactComponent(
        types.ARROW_FUNCTION,
        path.node,
        path.scope,
        path.parentPath
      )
    ) {
      const parent = path.findParent(
        (p) => p.isVariableDeclaration() || p.isAssignmentExpression()
      );
      if (parent && t.isIdentifier(parent.node.id)) {
        reactArrowFunctionComponents.push(parent.node.id.name);
      }
    }
  },
});

console.log("Componentes de React encontrados (Arrow Functions):");
console.log(reactArrowFunctionComponents);

export default reactArrowFunctionComponents;
