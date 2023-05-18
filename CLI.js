#!/usr/bin/env node
const colors = require("colors");
const { mdLinks } = require("./index.js");
const { getStats, getBroken } = require("./stats");
const { argv } = require("process");
const { displayLinks, findingLinks } = require("./API.js");
const { validateLinks } = require("./valid");

const CLI = () => {
  console.log(colors.magenta("*** Welcome to Markdown-Links *** "));
  console.log(colors.magenta("*** by Tiare Rojas Madariaga***"));

  // matriz que contiene los argumentos de línea de comando con las rutas ejecutable
  const commandArgs = process.argv.slice(2);
  // se asigna el primer argumento path y se espera que el primer argumentos sea la ruta del directorio
  const filePath = argv.slice(2)[0];
  // se crea objeto options con validate y stats
  const options = {
    validate: argv.includes("--validate"), // se establece true so es validate
    stats: argv.includes("--stats"), // se establece true si esta presente en elos argumentos sino será falso
  };
  if (argv.includes("--help")) {
    console.log(colors.cyan("Use md-links <path-to-file> [options]")); // muestra lo mismo de display path
    console.log(
      colors.cyan("\tdisplay path        Display text, href and file")
    );
    console.log(
      colors.cyan(
        "\t--validate          Display the route, text, href, file, status and message (ok or fail)"
      )
    );
    console.log(
      colors.cyan("\t--stats             Display information about stadistics")
    );
    console.log(
      colors.cyan(
        "\t-- validate --stats Display stadistics from the results (total, unique and broken links)"
      )
    );
    return; // se muestra menu en consola
  }
  // si no hay ruta manda error
  if (!filePath) {
    console.error(colors.bgRed("Please provide a path"));
    process.exit(1);
  }

  if (argv.includes("display path")) {
    // funciones traidas de la API para solo llamar los resultados en consola
    findingLinks(filePath, (links) => {
      // como se verá en consola lo que iré haciendo :)
      displayLinks(links);
    });
  } else {
    getLinks(filePath, options);
  }

  function getLinks(filePath, options) {
    mdLinks(filePath, options)
      .then((links) => {
        if (options.validate) {
          validateLinks(links)
            .then((validatedLinks) => {
              let output = "";
              validatedLinks.forEach((link) => {
                output += colors.green(
                  `\nhref: '${link.href.trim()}', \ntext: '${link.text.trim()}', \nfile: '${filePath.trim()}', \nstatus: '${
                    typeof link.status === "string"
                      ? link.status.trim()
                      : link.status
                  }', \nmessage: '${
                    typeof link.message === "string"
                      ? link.message.trim()
                      : link.message
                  }'\n`
                );
              });
              if (options.stats) {
                const stats = getStats(validatedLinks);
                output += `\nTotal: ${stats.total}\n`;
                output += `Unique: ${stats.unique}\n`;
                const brokenLinks = getBroken(validatedLinks);
                output += `Broken: ${brokenLinks.length}\n`;
              }
              console.log(output);
            })
            .catch((err) => {
              console.error(colors.bgRed(err.message));
              process.exit(1);
            });
        } else {
          if (options.stats) {
            const stats = getStats(links);
            console.log(`Total: ${stats.total}`);
            console.log(`Unique: ${stats.unique}`);
            const brokenLinks = getBroken(links);
            console.log(`Broken: ${brokenLinks.length}`);
          }
          displayLinks(links);
        }
      })
      .catch((err) => {
        console.error(colors.bgRed(err.message));
        process.exit(1);
      });
  }
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
