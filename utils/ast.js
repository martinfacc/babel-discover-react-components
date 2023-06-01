import fs from "fs";
import parser from "@babel/parser";

// Lee el archivo "file.jsx"
const fileContent = fs.readFileSync("examples/file.jsx", "utf-8");

// Analiza el código con Babel y obtiene el AST
const ast = parser.parse(fileContent, {
  sourceType: "module",
  plugins: ["jsx"],
});

export default ast;
