import Book from './book.class.js';
import {getDBBooks, addDBBook, removeDBBook, changeDBBook} from '../services/api.js';

export default class Books {
    constructor (){
        this.data = [];
    }

    async populate(){
        const books = await getDBBooks();
        this.data = books.map(b => new Book (b));
    }

    async addBook(bookData){
        const newBook = await addDBBook(bookData);
        const book = new Book (newBook);
        this.data.push(book);
        return book;
    }

    async removeBook(bookId){
        await removeDBBook(bookId);
        this.data = this.data.filter(b => b.id !== bookId);
    }

    async changeBook(updatedBook){
        const modified = await changeDBBook(updatedBook);
        const index = this.data.findIndex(b => b.id === modified.id);
        if(index !== -1) this.data[index] = new Book(modified);
        return this.data[index];
    }

    toString(){
        return this.data.map(b => b.toString()).join('\n');
    }

    booksFromUser(userId) {
        return this.data.filter(b => b.userId === userId);
    }

    booksFromModule(moduleCode) {
        return this.data.filter(b => b.moduleCode === moduleCode);
    }

    booksWithStatus(status) {
        return this.data.filter(b => b.status === status);
    }
}
