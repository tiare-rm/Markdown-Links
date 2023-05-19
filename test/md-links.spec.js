const { mdLinks } = require("../index.js");
const pathModule = require("path");
const { readDirectory, findingLinks } = require("../API.js");
const { validateLinks } = require("../valid.js");
const {getStats, getBroken} = require("../stats.js");
const { CLI } = require("../CLI.js");

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
  it("5 should call the callback function with an array of links", (done) => {
    const fileLinks = "./ejemplo.md"; // Ajusta la ruta del archivo de ejemplos que deseas utilizar

    const callback = (links) => {
      try {
        // Verifica que el resultado sea un array y contenga los enlaces esperados
        expect(Array.isArray(links)).toBe(true);
        expect(links.length).toBe(8);
        expect(links).toEqual([
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
        ]);
        done(); // Indica a Jest que el test ha finalizado correctamente
      } catch (error) {
        done(error); // Indica a Jest que el test ha fallado con un error
      }
    };

    findingLinks(fileLinks, callback);
  });
});

//6 VALID funcion 
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

//7 stats links total y unique 
describe('getStats', () => {
  it('7 should return the total and unique number of links', () => {
    const links = [
      { href: "https://carlosazaustre.es/manejando-la-asincronia-en-javascript" },
      { href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach"},
      { href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" },
      { href: "http://httpstat.us/200"},
      { href: "https://httpstat.us/400" },
      { href: "https://httpstat.us/403" },
      { href: "https://otra-cosa.net/algun-doc.html" },
      { href: "https://httpstat.us/500" },
    ];
    const result = getStats(links);
    expect(result).toEqual({
      total: 8,
      unique: 8,
    });
  });
});

//8 stats links broken
describe('getBroken', () => {
  it('8 should return a list of broken links', () => {
    const links = [
      { href: "https://carlosazaustre.es/manejando-la-asincronia-en-javascript", status: 200 },
      { href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach", status: 200 },
      { href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter", status: 200 },
      { href: "http://httpstat.us/200", status: 200 },
      { href: "https://httpstat.us/400", status: 400 },
      { href: "https://httpstat.us/403", status: 403 },
      { href: "https://otra-cosa.net/algun-doc.html", status: 404 },
      { href: "https://httpstat.us/500", status: 500 },
    ];

    const result = getBroken(links);

    expect(result).toEqual([
      { href: "https://httpstat.us/400", status: 400 },
      { href: "https://httpstat.us/403", status: 403 },
      { href: "https://otra-cosa.net/algun-doc.html", status: 404 },
      { href: "https://httpstat.us/500", status: 500 },
    ]);
  });
});

//9 CLI
