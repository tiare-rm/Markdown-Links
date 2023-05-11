// lo que vimos con jorge 

// de lo que links que tengo uso axios y lo trabajo con promesas, llevarlo al validate y hacerlo ahi con foreach luego usar 
//promise.all para que mande los objetos url con el map
const PROMESAS = URLS.map((url) => getStatus(url))
console.log(PROMESAS)
Promise.allSettled(PROMESAS).then((rptas) =>{
console.log(typeof rptas);
rptas.forEach((res) => console.log('res:', res.value.status))  
})
.catch((err) => console.log(err))
