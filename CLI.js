#!/usr/bin/env node 

// aquí debo agregar la logica para detectar las opciones --, luego estas las llamo
// desde index.js(mdLinks) para así obtener los archivos y validarlos y ser impresos en la consola
const colors = require("colors");
const mdLinks = require("./index.js");
const { getStats, getBroken } = require('./stats');

/* const [,, ...args] = process.argv
console.log('hello world ${args') */

const CLI = () => {
  console.log(colors.bgCyan("*** Welcome to Markdown-Links *** "));
  console.log(colors.bgCyan("*** by Tiare Rojas Madariaga***"));
};

module.exports = {
  CLI,
};
// matriz que contiene los argumentos de línea de comando con las rutas ejecutable
const args = process.argv.slice(2);
// se asigna el primer argumento path y se espera que el primer argumentos sea la ruta del directorio
const path = args[0];
// se crea objeto options con validate y stats
const options = {
  validate: args.includes('--validate'), // se establece true so es validate
  stats: args.includes('--stats'), // se establece true si esta presente en elos argumentos sino será falso
};
// si no hay ruta manda error 
if (!path) {
  console.error('Debes proporcionar una ruta');
  process.exit(1);
}

mdLinks(path, options)
  .then((links) => {
    if (options.stats) {
      // se comprueba si la opción stats es true y se consiguen las estadisticas
      const stats = getStats(links);
      console.log(`Total: ${stats.total}`);
      console.log(`Unique: ${stats.unique}`);
      if (options.validate) {
        // si es false me da broken en la consola 
        const brokenLinks = getBroken(links);
        console.log(`Broken: ${brokenLinks.length}`);
      }
    } else {
      // si la opcion stats es falsa 
      links.forEach((link) => {
        console.log(`${link.file} ${link.href} ${link.status} ${link.statusText} ${link.text}`);
      });
    }
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });


