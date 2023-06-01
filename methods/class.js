import _traverse from "@babel/traverse";
import ast from "../utils/ast.js";
import isReactComponent from "../utils/isReactComponent.js";
import types from "../utils/types.js";

const traverse = _traverse.default;

const reactClassComponents = [];

traverse(ast, {
  ClassDeclaration(path) {
    if (isReactComponent(types.CLASS, path.node)) {
      reactClassComponents.push(path.node.id.name);
    }
  },
});

console.log("Componentes de React encontrados (Clases):");
console.log(reactClassComponents);

export default reactClassComponents;
