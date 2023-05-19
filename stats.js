// aquí recibo objetos de links como argumentos 
const getStats = (links) => {
    // devuelto con las siguientes propiedades
  const total = links.length; // el numero total de links en el array 
  const unique = new Set(links.map((link) => link.href)).size; // numero de links unicos =que total
  return { total, unique };
};

// aquí recibo objetos de links como argumentos 
const getBroken = (links) => {
    // devuelvo una lista con los obejtos que tengan un status diferente a 200 o 300 osea los rotos
  return links.filter((link) => link.status !== 200 && link.status !== 300);
};

module.exports = {
  getStats,
  getBroken,
};
