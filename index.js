const { existsSync } = require("node:fs"); // para ver si la path existe
const pathModule = require("path");
const { readDirectory, findingLinks } = require("./API");
const { validateLinks } = require("./valid");
const { stats } = require("./stats");

const directory =
  "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links";
const file = "./ejemplo.md/";

// 1 identificar si la ruta existe
const mdLinks = (path = "ejemplo.md", options) => {
  // se devuelve una promesa, con una funcion ejecutora cual es asincrona
  return new Promise((resolve, reject) => {
    // se identifica si la ruta existe
    if (!existsSync(path)) {
      //!negacion, si no existe existsSync se rechaza de forma inmediata sin dejar pasar el if
      // sino existe se termina el proceso
      reject(new Error("the path does not exist"));
      return;
    }
    // console.log("existing path");

    // 2 identificar si es relativa o absoluta,
    const relative = "./Ghost Files/Test 1.txt";
    const absolute =
      "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links/ejemplo.md";
    //console.log(pathModule.isAbsolute(relative)); // FALSE si es relativa
    //console.log(pathModule.isAbsolute(absolute)); // TRUE si es absoluta

    //3 revisar la ruta y si es relativa se convierte a absoluta
    const relativePath = "./Ghost Files/Test 1.txt"; // Ruta relativa a convertir
    const basePath = "/Ghost Files"; // ruta principal o carpeta principal
    // * originalmente use resolve metodo para convertir un segmento de paths en absolute
    // use join el cual usa la ruta adecuada segun el sistema operativo que se ejecuta el código
    const absolutePath = pathModule.join(basePath, relativePath);
    //console.log(absolutePath); // Imprime la ruta absoluta en la consola

    const joinPath = pathModule.join(directory, file); // union de rutas
   //  console.log(joinPath, "JOIN PATH");

    // 4. FUNCION en API se identifica si es directorio o archivo y se se lee los archivos y directorios
    readDirectory(directory)
      .then((files) => {
        // se lee todo lo que hay dentro de mi markdown-links aka directorio
        // console.log(files, "list of files inside the directory");
        // uso de filter para que me devuelva un array de los elementos dentro de la condición, sólo buscando elementos con extensión .md
        const mdFiles = files.filter(
          // uso path.extname para obtener la extension de cada uno de los archivos dentro de mi array file
          // pathModule file debe ser extrictamente igua a .md
          (file) => pathModule.extname(file) === ".md"
        ); //path.extname devuelve la extension de un archivo en particular
       // console.log(mdFiles, "list of markdown files inside the directory"); // se pinta en consola en un nuevo formato de arrays
      })
      .catch((err) => {
        // console.error(err, "can not read files and directories");
      });

    //5. FUNCION API se leen los links del archivo ejemplo.md
    findingLinks("./ejemplo.md", (links) => {
      // console.log(links, '+++++++');
      // 6. se validan los links del archivo se toman argumentos para buscar el enlace y los objetos encontrados que son cada enlace
      validateLinks(links, file).then((links) => {
        // console.log(links);
      });
    });
    // aqui seguir con los otros codigos :)md-links
  });
};
mdLinks();
module.exports = { mdLinks };
