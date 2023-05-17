const axios = require("axios");
const file = "./ejemplo.md";

// 6 .validacion de los links entregando status
function validateLinks(links, file) {
  // console.log(links); // me muestra cuales son los links para ser verificados
  if (!Array.isArray(links)) { // se verifica que el parametro dado de links si sea un array
    return Promise.reject(new Error("Invalid links argument")); //si hay error esto se devuelve
  }
  // se crean promesas usando map (iterar los elementos dentro de una colección de arreglos)
  const promises = links.map((link) => {
    // se usa axios para resolver la promesa de la peticion URL del link
    return axios
    // se usa método head de axios para hacer la petición de forma asíncronica 
      .head(link.href)
      .then((response) => { // si la respuesta es exitosa se devuelve lo sgte
           return {
            href: link.href,
            text: link.text,
            file: file,
            status: response.status, // se guarda el estado de la peticion HTTP
            message: "OK",
          };
        })
          .catch((error) => { // lo que ocurre si la petición falla 
          if (error.response) {
          return {
            href: link.href,
            text: link.text,
            file: file,
            // si hay error se guarda el estado HTTP
            status: error.response.status,
            message: "FAIL",
          };
        }
        else {
          return {
            href: link.href,
            text: link.text,
            file: file,
            status: 404, // se asigna el estado 404 si la respuesta es null
            message: "FAIL",
          };
        };
      });
    });
  return Promise.all(promises); // se regresa la promesa cuando todo se ha cumplido 
}

module.exports = {
  validateLinks,
};

