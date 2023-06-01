import * as t from "@babel/types";
import _traverse from "@babel/traverse";
import types from "./types.js";

const traverse = _traverse.default;

function isArrowFunctionComponent(node, scope, parentPath) {
  // Comprueba si retorna JSX
  let returnsJSX = false;
  let hasReactComponent = false;

  traverse(
    node,
    {
      ReturnStatement(returnPath) {
        const argument = returnPath.node.argument;
        if (t.isJSXElement(argument) || t.isJSXFragment(argument)) {
          returnsJSX = true;
          hasReactComponent = true;
          returnPath.stop();
        }
      },
      CallExpression(callPath) {
        const callee = callPath.get("callee");
        const calleeName = callee.node.name;
        if (calleeName === "createElement" || calleeName === "jsx") {
          hasReactComponent = true;
          callPath.stop();
        }
      },
    },
    scope,
    parentPath
  );

  return returnsJSX || hasReactComponent;
}

function isClassComponent(node) {
  // Comprueba si extiende de React.Component o React.PureComponent
  if (node.superClass) {
    const superClass = node.superClass;
    if (
      (t.isIdentifier(superClass, { name: "Component" }) &&
        superClass.name === "React") ||
      (t.isMemberExpression(superClass) &&
        t.isIdentifier(superClass.object, { name: "React" }) &&
        t.isIdentifier(superClass.property, { name: "Component" })) ||
      (t.isIdentifier(superClass, { name: "PureComponent" }) &&
        superClass.name === "React") ||
      (t.isMemberExpression(superClass) &&
        t.isIdentifier(superClass.object, { name: "React" }) &&
        t.isIdentifier(superClass.property, { name: "PureComponent" }))
    ) {
      return true;
    }
  }
  return false;
}

function isFunctionComponent(node, scope, parentPath) {
  // Comprueba si es una función pura
  if (!t.isFunction(node) || node.async || node.generator) {
    return false;
  }

  // Comprueba si retorna JSX
  let returnsJSX = false;
  traverse(
    node,
    {
      ReturnStatement(returnPath) {
        const argument = returnPath.node.argument;
        if (t.isJSXElement(argument) || t.isJSXFragment(argument)) {
          returnsJSX = true;
          returnPath.stop();
        }
      },
    },
    scope,
    parentPath
  );

  return returnsJSX;
}

function isReactComponent(type, node, scope = null, parentPath = null) {
  if (type === types.ARROW_FUNCTION) {
    return isArrowFunctionComponent(node, scope, parentPath);
  } else if (type === types.CLASS) {
    return isClassComponent(node);
  } else if (type === types.FUNCTION) {
    return isFunctionComponent(node, scope, parentPath);
  }
}

export default isReactComponent;
