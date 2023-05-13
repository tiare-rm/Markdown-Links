const axios = require('axios');

// se busca los enlaces y se extrae la informacion de ellos URL, href, text y file
function extractLinks(markdown, file, validate = false) {
  const links = [];
  const renderer = new marked.Renderer();
  renderer.link = function(href, title, text) {
    links.push({ href, text, file });
  };
  // si validate es true se verifica que el enlace es valido agregando info adicional como 
  // ok, status etc
  marked(markdown, { renderer });
  if (validate) {
    const promises = links.map(link => {
      return axios(link.href)
        .then(response => {
          link.status = response.status;
          link.ok = response.ok ? "ok" : "fail";
          return link;
        })
        // si el parametro es false se resuelve con objetos de enlaces sin verificar
        .catch(error => {
          link.status = null;
          link.ok = error.message;
          return link;
        });
    });
    return Promise.all(promises);
  } else {
    return Promise.resolve(links);
  }
}

module.exports = {
  extractLinks,
}

// de lo que links que tengo uso axios y lo trabajo con promesas, llevarlo al validate y hacerlo ahi con foreach luego usar
//promise.all para que mande los objetos url con el map
/*const PROMESAS = URLS.map((url) => getStatus(url))
console.log(PROMESAS)
Promise.allSettled(PROMESAS).then((rptas) =>{
console.log(typeof rptas);
rptas.forEach((res) => console.log('res:', res.value.status))  
})
.catch((err) => console.log(err)) */
