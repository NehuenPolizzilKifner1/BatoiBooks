import Book from './book.class.js';
export default class Books {
    constructor (){
        this.data = [];
    }

    populate(booksArray){
        this.data = booksArray.map(b => new Book (b));
    }

    addBook(bookData){
        const nextId = this.data.length > 0 ? Math.max(...this.data.map(b => b.id)) + 1 : 1;
        const newBook = new Book({ id: nextId, ...bookData });
        this.data.push(newBook);
        return newBook;
    }

    removeBook(bookId){
        const idx = this.data.findIndex(b => Number(b.id) === Number(bookId));
        if (idx === -1) throw new Error(`Book with id ${bookId} not found`);
        this.data.splice(idx, 1);
    }

    changeBook(updatedBook){
        const index = this.data.findIndex(b => b.id === updatedBook.id);
        if (index === -1) throw new Error(`Book with id ${updatedBook.id} not found`);
        this.data[index] = new Book(updatedBook);
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

    incrementPriceOfBooks(percentage) {
        const factor = 1 + percentage;
        this.data = this.data.map(b => new Book({ ...b, price: +(b.price * factor).toFixed(2) }));
        return this.data;
    }
}
