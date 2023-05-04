const fs = require("fs");
// esta pagina sólo maneja la implementacion de fs

// 3. identificar si es directorio o archivo
const identifyDirectory = (path) => {
  fs.stat(path, (err, stats) => {
    if (err) {
      console.error(err, "hola");
      return;
    }
    // if stats me retorna un boleano true or false si es que es un directorio o no
    if (stats.isDirectory()) {
      console.log("the file is a directory"); // nos debería dar TRUE
    } else {
      console.log("the is a file"); // nos debería dar FALSE
      // './Ghost Files/Test 1.txt'
    }
  });
};

// 4. función que lee el directorio y retorna un array con los nombres de los archivos y subdirectorios
const readDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
        console.log("Error reading directory");
      } else {
        resolve(files);
        console - log("directory found: " + path);
      }
    });
  });
};

module.exports = {
  readDirectory,
  identifyDirectory,
};
