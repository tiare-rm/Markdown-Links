const { mdLinks } = require("../index.js");
const pathModule = require("path");
const { readDirectory, findingLinks } = require("../API.js");
const { validateLinks } = require("../valid.js");

// 0 debería retornar una promesa
describe("mdLinks", () => {
  it("0 should return a promise", () => {
    expect(mdLinks()).toBeInstanceOf(Promise);
  });
});

//1. identificar si la ruta existe, se rechaza si no hay path
describe("existPath", () => {
  // se usa only para asegurarse que sólo se ejecuta esta prueba
  // it.only("should reject if there is no path", () => {
  it("1 identifiy existing path, should reject if there is no path", () => {
    return expect(mdLinks("../README")).rejects.toThrow(
      // si la promesa falla no pasa el test
      "the path does not exist"
    );
  });
});

// 2 revisar la ruta
// 3 y si es relativa se convierte a absoluta
describe("relative path change to absolute", () => {
  test(" 2 & 3 absolute path should be correct", () => {
    // ruta relativa que se desea convertir
    const relativePath = "./Ghost Files/Test 1.txt";
    // ruta principal o carpeta principal en la cual se desea construir la ruta absoluta
    const basePath = "\\Ghost Files";
    // se una la ruta base y la realtiva para obtener la ruta absoluta y se guarda en absolutePath
    const absolutePath = pathModule.join(basePath, relativePath);
    expect(absolutePath).toBe("\\Ghost Files\\Ghost Files\\Test 1.txt");
  });
});

// 4. FUNCION en API se identifica si es directorio o archivo y se se lee los archivos y directorios
describe("readDirectory", () => {
  test("4 readDirectory should return an array of filenames in directory", () => {
    const expected = ["README.md", "ejemplo.md"];
    return readDirectory(
      "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links"
    ).then((files) => {
      expect(files).toEqual(expect.arrayContaining(expected));
    });
  });
});

//5. FUNCION API se leen los links del archivo ejemplo.md
describe("findingLinks", () => {
  test("5 find links in file ejemplo.md", (done) => {
    const fileLinks =
      "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links/ejemplo.md"; //se usa la ruta al archivo
    const expected = [
      {
        text: "Asíncronía en js",
        href: "https://carlosazaustre.es/manejando-la-asincronia-en-javascript",
        file: "../ejemplo.md",
      },
      {
        text: "Array.prototype.forEach() - MDN",
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
        file: "../ejemplo.md",
      },
      {
        text: "Array.prototype.filter() - MDN",
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
        file: "../ejemplo.md",
      },
      {
        text: "código de estado 200 ok",
        href: "http://httpstat.us/200",
        file: "../ejemplo.md",
      },
      {
        text: "código de estado 400 Bad Request",
        href: "https://httpstat.us/400",
        file: "../ejemplo.md",
      },
      {
        text: "código de estado 403 Forbidden",
        href: "https://httpstat.us/403",
        file: "../ejemplo.md",
      },
      {
        text: "código de estado 404 Not Found",
        href: "https://otra-cosa.net/algun-doc.html",
        file: "../ejemplo.md",
      },
      {
        text: "código de estado 500 Internal Server",
        href: "https://httpstat.us/500",
        file: "../ejemplo.md",
      },
    ];
    findingLinks(fileLinks, (result) => {
      expect(result).toEqual(expected);
      done();
    });
  });
});

//6 validacion de links 
describe("validateLinks", () => {
  it("6 should return a Promise that resolves to an array of link objects", () => {
    const links = [
      {
        text: "Asíncronía en js",
        href: "https://carlosazaustre.es/manejando-la-asincronia-en-javascript",
        file: "../ejemplo.md",
      },
      {
        text: "Array.prototype.forEach() - MDN",
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
        file: "../ejemplo.md",
      },
      {
        text: "Array.prototype.filter() - MDN",
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
        file: "../ejemplo.md",
      },
      {
        text: "código de estado 200 ok",
        href: "http://httpstat.us/200",
        file: "../ejemplo.md",
      },
      {
        text: "código de estado 400 Bad Request",
        href: "https://httpstat.us/400",
        file: "../ejemplo.md",
      },
      {
        text: "código de estado 403 Forbidden",
        href: "https://httpstat.us/403",
        file: "../ejemplo.md",
      },
      {
        text: "código de estado 404 Not Found",
        href: "https://otra-cosa.net/algun-doc.html",
        file: "../ejemplo.md",
      },
      {
        text: "código de estado 500 Internal Server",
        href: "https://httpstat.us/500",
        file: "../ejemplo.md",
      },
    ];
    const file = "../ejemplo.md";
    return validateLinks(links, file).then((result) => {
      // que es lo que se espera de esos resultados un array que tenga la misma longitud que links
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(links.length);
      result.forEach((link) => {
        // y que cada objeto cumpla con las siguientes propiedades 
        expect(link).toHaveProperty('href');
        expect(link).toHaveProperty('text');
        expect(link).toHaveProperty('file');
        expect(link).toHaveProperty('status');
        expect(link).toHaveProperty('message');
      });
    });
  });
});


/* USAR PARA LOS LINKS???
describe("mdLinks", () => {
it('mdLinks procesa un solo archivo con 3 links sin validar'), () =>{
  const ruta = 'ejemplo.md';

  return mdLinks(ruta, {validate: false}))
  .then(
    (array) => {
      expect(array).toEqual([
        href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
        text: 'Asíncronía en js',
        file: 'ejemplo.md',
      ])
    }
  )
  }
}); */
