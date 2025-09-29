import data from "./src/services/datos.js";
import { getBookById, getBookIndexById, bookExists, booksFromUser, booksFromModule, booksCheeperThan, booksWithStatus, averagePriceOfBooks, booksOfTypeNote, booksNotSold, incrementPriceOfbooks, getUserById, getUserIndexById, getUserByNickName, getModuleByCode } from "./src/functions.js";

document.querySelector('#app').innerHTML = `
  <img src="./public/logoBatoi.png" alt="logo" style="height:200px; display: block; margin: 0 auto;"/>
  <p>Abre la consola para ver su funcionamiento</p>
`

try {
  const user4Books = booksFromUser(data.books, 4);
  console.group('Libros del usuario 4');
  console.log(user4Books);
  console.groupEnd();
} catch (e) {
  console.error('Error al obtener libros del usuario 4:', e);
}

try {
  const module5021Good = booksFromModule(data.books, '5021').filter(b => b.status === 'good');
  console.group('Libros del módulo 5021 en estado "good"');
  console.log(module5021Good);
  console.groupEnd();
} catch (e) {
  console.error('Error al obtener libros del módulo 5021:', e);
}

try {
  const increased = incrementPriceOfbooks(data.books, 0.10);
  console.group('Libros con precio incrementado 10% (array nuevo)');
  console.log(increased);
  console.groupEnd();
} catch (e) {
  console.error('Error al incrementar precios:', e);
}