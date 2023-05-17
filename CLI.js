#!/usr/bin/env node 

// aquí debo agregar la logica para detectar las opciones --, luego estas las llamo
// desde index.js(mdLinks) para así obtener los archivos y validarlos y ser impresos en la consola

const colors = require("colors");
const mdLinks = require("./index.js");

const CLI = () => {
  console.log(colors.bgCyan("*** Welcome to Markdown-Links *** "));
  console.log(colors.bgCyan("*** by Tiare Rojas Madariaga***"));
};

module.exports = {
  CLI,
};

const [,, ...args] = process.argv
console.log('hello world ${args')
