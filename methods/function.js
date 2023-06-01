import _traverse from "@babel/traverse";
import ast from "../utils/ast.js";
import isReactComponent from "../utils/isReactComponent.js";
import types from "../utils/types.js";

const traverse = _traverse.default;

const reactFunctionComponents = [];

traverse(ast, {
  FunctionDeclaration(path) {
    if (
      isReactComponent(types.FUNCTION, path.node, path.scope, path.parentPath)
    ) {
      reactFunctionComponents.push(path.node.id.name);
    }
  },
  FunctionExpression(path) {
    if (
      isReactComponent(types.FUNCTION, path.node, path.scope, path.parentPath)
    ) {
      const name = path.node.id ? path.node.id.name : "Anonymous Component";
      reactFunctionComponents.push(name);
    }
  },
});

console.log("Componentes de React encontrados (Functions):");
console.log(reactFunctionComponents);

export default reactFunctionComponents;
