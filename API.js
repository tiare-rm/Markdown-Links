const fs = require("fs");
// esta pagina sólo maneja la implementacion de fs
const directory =
  "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links";
const fileLinks =
  "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links/ejemplo.md";

// 4. función que lee el directorio y retorna un array con los nombres de los archivos y subdirectorios
// path en este caso sería la constante ya definida en directory
const readDirectory = (path) => {
  return new Promise((resolve, reject) => {
    // se usa readdir para leer los archivos y directorios especificados en path
    fs.readdir(path, (err, files) => {
      if (err) {
        // si hay error se rechaza la promesa
        reject(err);
        console.log("Error reading directory");
      } else {
        // si la lectura se realiza correctamente de devuelve la promesa del array
        // del nombre del archivo y directorios
        resolve(files);
        console.log("directory found: " + path);
      }
    });
  });
};
readDirectory(directory); // llamada a la funcion para que sea pintada en la terminal

//5 leer archivo y buscar los enlaces dentro de él.
// file links es la ruta
const findingLinks = (fileLinks) => {
  // se usa la biblioteca fs de node para leer el archivo de fileLinks 
  fs.promises
    .readFile(fileLinks, "utf8") // utf8, is a variable-length character encoding standard used for electronic communication
    .then((data) => {
      // se busca en el archivo algun texto md con esta expresion regular
      const regex = /\[(.+)\]\((http[s]?:\/\/.+)\)/g;
      // si se encuentra el enlace se extrae el url y el texto que se imprime en la consola
      let match;
      while ((match = regex.exec(data))) {
        const href = match[1]; // URL
        const text = match[2]; //texto
        console.log(href, text, fileLinks);
      }
    })
    .catch((err) => {
      console.error(err, "cannot read file");
    });
};
findingLinks("ejemplo.md");

module.exports = {
  readDirectory,
  findingLinks,
};

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
