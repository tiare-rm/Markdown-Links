const axios = require("axios");
const markdownLinkExtractor = require("markdown-link-extractor");
const file = "./ejemplo.md";

function validateLinks(links, file) {
  console.log(links);
  if (!Array.isArray(links)) {
    return new Error("Invalid links argument");
  }
  const promises = links.map((link) => {
    return axios
      .head(link.href)
      .then((response) => {
        if (response.status === 200) { //  && response.status <= 500
          return {
            href: link.href,
            text: link.text,
            file: file,
            status: response.status,
            message: "OK",
          };
        } else {
          return {
            href: link.href,
            text: link.text,
            file: file,
            status: response.status,
            message: "FAIL",
          };
        }
      })
      .catch((error) => {
        return {
          href: link.href,
          text: link.text,
          file: file,
          status: null,
          message: "FAIL",
        };
      });
  });
  return Promise.all(promises);
}

module.exports = {
  validateLinks,
};

// de lo que links que tengo uso axios y lo trabajo con promesas, llevarlo al validate y hacerlo ahi con foreach luego usar
//promise.all para que mande los objetos url con el map
/*const PROMESAS = URLS.map((url) => getStatus(url))
console.log(PROMESAS)
Promise.allSettled(PROMESAS).then((rptas) =>{
console.log(typeof rptas);
rptas.forEach((res) => console.log('res:', res.value.status))  
})
.catch((err) => console.log(err)) */
