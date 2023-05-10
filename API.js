const fs = require("fs");
// esta pagina sólo maneja la implementacion de fs
const directory =
  "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links";

// 4. identificar si es directorio o archivo
/* const identifyDirectory = () => {
  // se llama la ruta del directorio que se desea verificar y así pasarla
  fs.stat(directory, (err, stats) => {
    if (err) {
      console.error(err);
      return "problem at trying to identify directory";
    }
    if (stats.isDirectory()) {
      console.log("the file is a directory");
    } else {
      // console.log("the is a file");
    }
  });
};
identifyDirectory(); //llamada a la funcion para que sea pintada en la terminal */

// 5. función que lee el directorio y retorna un array con los nombres de los archivos y subdirectorios
// path en este caso sería la constante ya definida en directory
const readDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
        console.log("Error reading directory");
      } else {
        resolve(files);
        console.log("directory found: " + path);
      }
    });
  });
};
readDirectory(directory); // llamada a la funcion para que sea pintada en la terminal

//5 filtrar los archivos e identificar si hay .md

module.exports = {
 readDirectory,
};
