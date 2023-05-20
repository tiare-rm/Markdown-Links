#!/usr/bin/env node
const colors = require("colors");
const { mdLinks } = require("./index.js");
const { getStats, getBroken } = require("./stats");
const { argv } = require("process");
const { validateLinks } = require("./valid");

const CLI = () => {
  console.log(colors.magenta("*** Welcome to Markdown-Links *** "));
  console.log(colors.magenta("*** by Tiare Rojas Madariaga ***"));
  console.log(colors.magenta("*** please provide a path ***"));
  console.log(colors.magenta("*** or use --help to see the menu ***"));

  const filePath = argv.slice(2)[0];
  const options = {
    validate: argv.includes("--validate"),
    stats: argv.includes("--stats"),
  };

  if (argv.includes("--help")) {
    console.log(colors.cyan("Use md-links <path-to-file> [options]"));
    console.log(
      colors.cyan("\t--display path      Display text, href and file")
    );
    console.log(colors.cyan("\t--help              Display menu"));
    console.log(
      colors.cyan(
        "\t--validate          Display the route, text, href, file, status and message (ok or fail)"
      )
    );
    console.log(
      colors.cyan("\t--stats             Display information about statistics")
    );
    console.log(
      colors.cyan(
        "\t--validate --stats  Display statistics from the results (total, unique and broken links)"
      )
    );
    return;
  }

  // se verifica si la variable filePath esta vacía si es así me da error en color rojo.
  if (!filePath) {
    console.error(colors.bgRed("Please provide a path"));
    // finaliza el proceso con el codigo de salida 1
    process.exit(1);
  }

  // si validate y stats son verdaderas se llama a getLinks con true true
  if (options.validate && options.stats) {
    getLinks(filePath, options, true, true);
  } else if (options.validate) {
    // Si solo options.validate es verdadero, se llama a getLinks con los parámetros true false
    getLinks(filePath, options, true, false);
  } else if (options.stats) {
    // stats es verdadero, se llama a getLinks con los parámetros false true
    getLinks(filePath, options, false, true);
  } else {
    // si ninguna de las opciones es verdadera se llama con false, false.
    getLinks(filePath, options, false, false);
  }

  function getLinks(filePath, options, validate, stats) {
    mdLinks(filePath, options)
      .then((links) => {
        if (validate) {
          // si validate es verdadero, se llama a validateLinks para validar los enlaces obtenidos
          validateLinks(links)
            .then((validatedLinks) => {
              // se imprime información sobre cada enlace validado
              validatedLinks.forEach((link) => {
                console.log(colors.green(`href: '${link.href.trim()}'`));
                console.log(colors.green(`text: '${link.text.trim()}'`));
                console.log(colors.green(`file: '${filePath.trim()}'`));
                console.log(
                  colors.green(
                    `status: '${
                      link.status ? link.status.toString().trim() : ""
                    }'`
                  )
                );
                console.log(
                  colors.green(
                    `message: '${
                      link.message ? link.message.toString().trim() : ""
                    }'\n`
                  )
                );
              });

              const brokenLinksCount = getBroken(validatedLinks).length;
              if (stats) {
                // imprimir estadisticas de los enlaces
                // si stats es verdadero se llama getStats para las estadisticas sobre los enlaces
                const stats = getStats(links);
                console.log(`Unique: ${stats.unique}`);
                console.log(`Broken: ${brokenLinksCount}`);
                console.log(`Total: ${stats.total}`);
              }
            })
            .catch((err) => {
              console.error(colors.bgRed(err.message));
              process.exit(1);
            });
        } else if (stats) {
          // imprimir información sobre cada enlace 
          const stats = getStats(links);
          console.log(`Unique: ${stats.unique}`);
          console.log(`Total: ${stats.total}`);
        } else {
          links.forEach((link) => {
            console.log(colors.green(`href: '${link.href.trim()}'`));
            console.log(colors.green(`text: '${link.text.trim()}'`));
            console.log(colors.green(`file: '${filePath.trim()}'`));
          });
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
