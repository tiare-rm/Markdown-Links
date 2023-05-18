const fs = require("fs");
const colors = require("colors");
// esta pagina sólo maneja la implementacion de fs
const directory =
  "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links"; // mi path
const fileLinks =
  "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links/ejemplo.md";

// 4. función que lee el directorio y retorna un array con los nombres de los archivos y subdirectorios
const readDirectory = (path) => {
  return new Promise((resolve, reject) => {
    // se usa readdir para leer los archivos y directorios especificados en path
    fs.readdir(path, (err, files) => {
      if (err) {
        // si hay error se rechaza la promesa
        reject(err);
        // console.log("Error reading directory");
      } else {
        const filterFiles = files.filter((file) => /\.(txt|md)$/.test(file));
        // si la lectura se realiza correctamente de devuelve la promesa del array del nombre del archivo y directorios
        resolve(filterFiles);
        // console.log("directory found: " + path);
      }
    });
  });
};
readDirectory(directory); // llamada a la funcion para que sea pintada en la terminal

//5 leer archivo y buscar los enlaces dentro de él, file links es la ruta
// cadena que representa la ruta del archivo y el callback me llama a la función que llamará a los
// resultados de los enlaces, se usa en vez de usar async/await
const findingLinks = (fileLinks, callback) => {
  // se almacena el archivo de fileLinks en la variable data
  fs.readFile(fileLinks, "utf8", (err, data) => {
    // utf8, is a variable-length character encoding standard used for electronic communication
    if (err) {
      console.error(err);
      return;
    }
    // se busca en el archivo algun texto md con esta expresion regular, lo que hace es
    // que se busca un patrón de texto entre corchetes, URL y parantesis
    const regex = /\[(.+)\]\((http[s]?:\/\/.+)\)/g;
    // si se encuentra el enlace se extrae el url y el texto que se imprime en la consola
    // se almacena en el objeto array llamado links
    const links = [];
    let match;
    // se usa expresión while donde se asigna a match el resultado de ejecutar regex en data
    while ((match = regex.exec(data))) {
      // se usa un while para que se siga ejecutando la expresión hasta que se encuentren más coincidencias
      // se extrae el primer contenido con variable text
      const text = match[1]; //texto
      // se extrae el segundo contenido url asignandole href
      const href = match[2]; // URL
      const file = "../ejemplo.md"; // archivo donde se encuentran los links
      // se crea el objeto con dos propiedad en links y que tiene los enlaces encontrados
      // se crea con liks.push un objeto usando la variable como nombre de la
      links.push({ text, href, file });
    }
    // cuando termina la función se llama a callback que se pasa como argumento el array links
    callback(links);
  });
};
// con estos codigos se pinta la informacion en consola
findingLinks(fileLinks, (links) => {
  // console.log(links);
});

// de aquí tuve que sacar la info para llamarla desde el CLI. y que saliera en consola
const displayLinks = (links) => {
  links.forEach((link) => {
    console.log(colors.yellow(
      `href: '${link.href}',
       text: '${link.text}', 
       file: '${link.file}'`
    ));
  });
};

module.exports = {
  readDirectory,
  findingLinks,
  displayLinks,
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
