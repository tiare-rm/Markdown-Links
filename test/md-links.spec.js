const { mdLinks } = require ("../index.js");
const { readDirectory } = require ("../funcionesPuras.js");

// const mdLinks = require('../index.js');
// real path ABSOLUTA C:\Users\tiare\Desktop\LABORATORIA
//ABSOLUTA C:\Users\tiare\Desktop\LABORATORIA\4to proyecto MDLINKS\Md-Links\.editorconfig
// RELATIVA  "../Diseño sin título.png";
// RELATIVA  "../Diagrama CLI.png";

// 0 debería retornar una promesa
describe("mdLinks", () => {
  it("should return a promise", () => {
    expect(mdLinks()).toBe(typeof Promise);
  });
});

//1. identificar si la ruta existe, se rechaza si no hay path
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
});

// 2. identificar si es relativa o absoluta
//se prueba que path.isAbsolute funcione para ambas rutas
describe("Testing path", () => {
  test("path.isAbsolute should return false for a relative path", () => {
    const relativePath = "../Ghost Files/Diseño sin título.png";
    // devuelve false cuando se le pasa una ruta de archivo relativa
    expect(path.isAbsolute(relativePath)).toBe(false);
  });

  test("path.isAbsolute should return true for an absolute path", () => {
    const relativePath = "C:/Users/tiare/Desktop/LABORATORIA/4to proyecto MDLINKS/Md-Links/.editorconfig";
    const absolutePath = path.resolve(relativePath);
    // se devuelve true cuando se pasa un archivo absoluto
    expect(path.isAbsolute(absolutePath)).toBe(true);
  });
});

// 2.1. si la ruta es relativa se transforma a absoluta
describe("Testing path functions", () => {
  test("path.resolve should return an absolute path", () => {
    const relativePath = "../Ghost Files/Diseño sin título.png";
    const absolutePath = path.resolve(relativePath);
    expect(path.isAbsolute(absolutePath)).toBe(true);
  });
});

// 3. se obtiene lista de archivos y directorios
const pathDirection = "../Ghost Files";
describe("reading directory", () => {
  test("directory is correct", (done) => {
    // se lee directorio especificado en el path
    fs.readdir(pathDirection, (err, files) => {
      if (err) {
        // si hay error se lee con el done.fail y la prueba a fallado
        done.fail("error reading directory");
      } else {
        // de lo contrario se usa el expect para verificar que hay files existentes
        expect(files).toContain("../Ghost Files/Test 1.txt");
        expect(files).toContain("../Ghost Files/Test 2.txt");
        done();
      }
    });
  });
});

// 4. identificar si es directorio o archivo

// 5. se lee contenido de un directorio y se obtiene info de cada archivo

