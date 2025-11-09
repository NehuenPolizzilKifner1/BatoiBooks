import Book from './book.class.js';
import { getDBBooks, getDBBook, addDBBook, removeDBBook, changeDBBook } from '../services/api.js';

const NOTES = 'Apunts'

export default class Books {
  constructor() {
    this.data = [];
  }

  async populate() {
    const data = await getDBBooks()
    this.data = data.map(item => new Book(item))
  }

  async addBook(book) {
    const dataAdded = await addDBBook(book)
    const newBook = new Book(dataAdded)
    this.data.push(newBook)
    return newBook
  }

  async removeBook(bookId) {
    await removeDBBook(bookId)
    // Si no existe el libro se habrá lanzado un error
    const index = this.getBookIndexById(bookId)
    this.data.splice(index, 1);
  }

  async changeBook(book) {
    const dataChanged = await changeDBBook(book)
    const index = this.getBookIndexById(book.id)
    const modifiedBook = new Book(dataChanged)
    this.data.splice(index, 1, modifiedBook)
    return modifiedBook
  }

  toString() {
    let text = `Books: ${this.data.length}`;
    this.data.forEach(item => {
      text += `\n${item.toString()}`;
    });
    return text;
  }

  getBookById(bookId) {
    const book = this.data.find((item) => item.id === bookId)
    if (!book) {
      throw new Error(`No existe el libro con id ${bookId}`)
    }
    return book
  }
  
  getBookIndexById(bookId) {
    const bookIndex = this.data.findIndex((item) => item.id === bookId)
    if (bookIndex === -1) {
      throw new Error(`No existe el libro con id ${bookId}`)
    }
    return bookIndex
  }
  
  bookExists(userId, moduleCode) {
    return !!this.data.find((item) => item.userId === userId 
      && item.moduleCode === moduleCode)
  }
  
  booksFromUser(userId) {
    return this.data.filter((item) => item.userId === userId)
  }
  
  booksFromModule(moduleCode) {
    return this.data.filter((item) => item.moduleCode === moduleCode)
  }
  
  booksCheeperThan(price) {
    return this.data.filter((item) => item.price <= price)
  }
  
  booksWithStatus(status) {
    return this.data.filter((item) => item.status === status)
  }
  
  averagePriceOfBooks(books) {
    const sum = this.data.reduce((total, item) => total + item.price, 0)
    return this.data.length
      ? (sum / this.data.length).toFixed(2) + ' €'
      : '0.00 €'
  }
  
  booksOfTypeNotes(books) {
    return this.data.filter((item) => item.publisher === NOTES)
  }
  
  booksNotSold(books) {
    return this.data.filter((item) => !item.soldDate)
  }
}
