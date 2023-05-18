#!/usr/bin/env node

// aquí debo agregar la logica para detectar las opciones --, luego estas las llamo
// desde index.js(mdLinks) para así obtener los archivos y validarlos y ser impresos en la consola
const colors = require("colors");
const { mdLinks } = require("./index.js");
const { getStats, getBroken } = require("./stats");
const { argv } = require("process");
const path = "./ejemplo.md";

const CLI = () => {
  console.log(colors.magenta("*** Welcome to Markdown-Links *** "));
  console.log(colors.magenta("*** by Tiare Rojas Madariaga***"));

  // matriz que contiene los argumentos de línea de comando con las rutas ejecutable
  const commandArgs = process.argv.slice(2);
  // se asigna el primer argumento path y se espera que el primer argumentos sea la ruta del directorio
  const path = argv.slice(2)[0];
  // se crea objeto options con validate y stats
  const options = {
    validate: argv.includes("--validate"), // se establece true so es validate
    stats: argv.includes("--stats"), // se establece true si esta presente en elos argumentos sino será falso
  };
  // si no hay ruta manda error
  if(!path) {
    console.error(colors.bgRed("Debes proporcionar una ruta"));
    process.exit(1);
  }

  mdLinks (path, options)
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
          console.log(
            `${link.file} ${link.href} ${link.status} ${link.statusText} ${link.text}`
          );
        });
      }
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = {
  CLI,
};

CLI();

/*argv es una matriz que contiene los argumentos de línea de comandos proporcionados 
al ejecutar un script. El primer elemento argv[0] representa la ruta del ejecutable de Node.js,
el segundo elemento argv[1] representa la ruta del archivo del script que se está ejecutando y 
los elementos subsiguientes argv[2], argv[3], etc. representan los argumentos proporcionados.*/

/* El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```
*/