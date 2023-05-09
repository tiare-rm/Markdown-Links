const { existsSync } = require("node:fs"); // para ver si la path existe
const pathModule = require("path");
const { readDirectory, identifyDirectory } = require("./API");
// este archivo solo debe encargarse de la logica principal

const path = "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links/ejemplo.md"; // absoluta
const directory = 'C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links';
// const file = "./ejemplo.md/";

// 1 identificar si la ruta existe
const mdLinks = (path = "README.md", options) => {
  // debe tomar como parametro path y options
  // se devuelve una promesa, con una funcion ejecutora cual es asincrona
  return new Promise((resolve, reject) => {
    // se identifica si la ruta existe
    if (!existsSync(path)) {
      //!negacion, si no existe existsSync se rechaza de forma inmediata sin dejar pasar el if
      // sino existe se termina el proceso
      reject(new Error("the path does not exist"));
      return;
    }
    console.log("existing path");

    // 2 identificar si es relativa o absoluta,
    // se usa isAbsolute para devolver un booleano si es absoluta TRUE o relativa FALSE
    const relative = "./Ghost Files/Test 1.txt";
    const absolute =
      "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links/ejemplo.md";
    console.log(pathModule.isAbsolute(relative)); // FALSE si es relativa
    console.log(pathModule.isAbsolute(absolute)); // TRUE si es absoluta

    //3 revisar la ruta y si es relativa se convierte a absoluta
    const relativePath = "./Ghost Files/Test 1.txt"; // Ruta relativa a convertir
    const basePath = "/Ghost Files"; // ruta principal o carpeta principal
    // * originalmente use resolve metodo para convertir un segmento de paths en absolute
    // use join el cual usa la ruta adecuada segun el sistema operativo que se ejecuta el código
    const absolutePath = pathModule.join(basePath, relativePath);
    console.log(absolutePath); // Imprime la ruta absoluta en la consola

    // 4. identificar si es directorio o archivo
    identifyDirectory();

    // 5. se lee los archivos y directorios
    readDirectory(absolutePath)
      .then((files) => {
        console.log(files);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
mdLinks();
module.exports = { mdLinks };
// si se debe usar readDirSync(directorio), statSync y stat
// 5. leer contenido de un directorio y obtener informacion sobre cada archivo
// en punto 4 usar fs.readerSync y se obtiene lista de los archivos y directorios
// y uso de fs.statSync() para pbtener info sobre cada archivo o directorio en la listra
// 6 leer contenido de file
// 7 readfile leer ruta y contenido + promesa buscar los archivos y links con parametros -
// ejemplos de codigo
/* const fs = require('fs');
const path = require('path');

const directorio = '/ruta/a/mi/directorio';

const archivos = fs.readdirSync(directorio);

archivos.forEach((archivo) => {
  const rutaCompleta = path.join(directorio, archivo);
  const stats = fs.statSync(rutaCompleta);

  console.log(`${archivo}:`);
  console.log(`- Tipo: ${stats.isDirectory() ? 'Directorio' : 'Archivo'}`);
  console.log(`- Tamaño: ${stats.size} bytes`);
  console.log(`- Fecha de creación: ${stats.birthtime}`);
}); */

/* module.exports = () => {
  // ....
}; */

/* const mdLinks = require("md-links"); // 

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
*/
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

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres). */
