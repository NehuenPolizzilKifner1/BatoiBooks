import Books from './src/model/books.class.js';
import Users from './src/model/users.class.js';
import Modules from './src/model/modules.class.js';

document.querySelector('#app').innerHTML = `
  <img src="./public/logoBatoi.png" alt="logo" style="height:200px; display: block; margin: 0 auto;"/>
  <h1 style="text-align: center;">BatoiBooks</h1>
  <p style="text-align: center;">Abre la consola para ver su funcionamiento</p>
`;

const modules = new Modules();
const users = new Users();
const books = new Books();

(async () => {
  await modules.populate();
  await users.populate();
  await books.populate();

  console.group('Libros del módulo 5021');
  console.log(books.booksFromModule('5021'));
  console.groupEnd();

  console.group('Libros nuevos (status "new")');
  console.log(books.booksWithStatus('new'));
  console.groupEnd();
})();