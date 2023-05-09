const { mdLinks } = require("../index.js");
const pathModule = require("path");
const { readDirectory, identifyDirectory } = require ("../API.js");

// 0 debería retornar una promesa
describe("mdLinks", () => {
  it("should return a promise", () => {
    expect(mdLinks()).toBeInstanceOf(Promise);
  });
});

//1. identificar si la ruta existe, se rechaza si no hay path
describe("existPath", () => {
  // se usa only para asegurarse que sólo se ejecuta esta prueba
  // it.only("should reject if there is no path", () => {
  it("should reject if there is no path", () => {
    return expect(mdLinks("../README")).rejects.toThrow(
      // si la promesa falla no pasa el test
      "the path does not exist"
    );
  });
});
// 2 identificar si es relativa o absoluta
describe("relative path change to absolute", () => {
  test("absolute path should be correct", () => {
    // ruta relativa que se desea convertir
    const relativePath = "./Ghost Files/Test 1.txt";
    // ruta principal o carpeta principal en la cual se desea construir la ruta absoluta
    const basePath = "\\Ghost Files";
    // se una la ruta base y la realtiva para obtener la ruta absoluta y se guarda en absolutePath
    const absolutePath = pathModule.join(basePath, relativePath);
    expect(absolutePath).toBe("\\Ghost Files\\Ghost Files\\Test 1.txt");
  });
});

describe("identifyDirectory", () => {
  test("should return true if path is a directory", () => {
    const path = "C:/Users/tiare/Desktop/LABORATORIA/4to Md-Links/Markdown-Links/Ghost Files";
    expect(identifyDirectory(path)).toBe(true);
  });
  test("should return false if path is a file", () => {
    const path = "../Ghost Files/Test 1.txt";
    expect(identifyDirectory(path)).toBe(false);
  });
});

/*
describe("readDirectory", () => {
  test("should return an array of filenames in directory", () => {
    const path = "./folder";
    expect(readDirectory(path)).resolves.toEqual(["file1.txt", "file2.txt"]);
  });
  test("should reject with an error if directory does not exist", () => {
    const path = "./nonexistent";
    expect(readDirectory(path)).rejects.toThrow();
  });
});
*/
/* describe("mdLinks", () => {
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
