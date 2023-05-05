const { mdLinks } = require ("../index.js");
const { readDirectory, identifyDirectory } = require ("../funcionesPuras.js");

// const mdLinks = require('../index.js');
// ruta falsa "../Ghost File"
// real path ABSOLUTA C:\Users\tiare\Desktop\LABORATORIA
//ABSOLUTA C:\Users\tiare\Desktop\LABORATORIA\4to proyecto MDLINKS\Md-Links\.editorconfig
// RELATIVA  "../Diseño sin título.png";
// RELATIVA  "../Diagrama CLI.png";

// 0 debería retornar una promesa
describe("mdLinks", () => {
  it("should return a promise", () => {
    expect(mdLinks()).toBeInstanceOf(Promise);
  });
});

/* //1. identificar si la ruta existe, se rechaza si no hay path
describe("existPath", () => {
  // se usa only para asegurarse que sólo se ejecuta esta prueba
  // it.only("should reject if there is no path", () => {
  it("should reject if there is no path", () => {
    return expect(
      mdLinks("../Diseño sin título.png")  
    ).rejects.toThrow(
      // si la promesa falla no pasa el test
      "the path does not exist"
    );
  });
}); */ 

/* describe('mdLinks', () => {
  it('should reject with an error when the path does not exist', () => {
    const path = 'C:/Users/tiare/Desktop/LABORATORIA01;
    return expect(mdLinks(path)).to.be.rejectedWith(Error, 'the path does not exist');
  });
});

describe('identifyDirectory', () => {
  test('should return true if path is a directory', () => {
    const path = '../Ghost Files';
    expect(identifyDirectory(path)).toBe(true);
  });
  test('should return false if path is a file', () => {
    const path = '../Ghost Files/Test 1.txt';
    expect(identifyDirectory(path)).toBe(false);
  });
});

describe('readDirectory', () => {
  test('should return an array of filenames in directory', () => {
    const path = './folder';
    expect(readDirectory(path)).resolves.toEqual(['file1.txt', 'file2.txt']);
  });
  test('should reject with an error if directory does not exist', () => {
    const path = './nonexistent';
    expect(readDirectory(path)).rejects.toThrow();
  });
});
*/