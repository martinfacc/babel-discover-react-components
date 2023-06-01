import reactArrowFunctionComponents from "./methods/arrowFunction.js";
import reactFunctionComponents from "./methods/function.js";
import reactClassComponents from "./methods/class.js";
import types from "./utils/types.js";

const reactComponents = {
  [types.ARROW_FUNCTION]: reactArrowFunctionComponents,
  [types.FUNCTION]: reactFunctionComponents,
  [types.CLASS]: reactClassComponents,
};

console.log("Componentes de React encontrados:");
console.log(reactComponents);
