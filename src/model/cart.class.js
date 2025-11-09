import Book from './books.class.js';

export default class Cart{
    constructor(){
        this.data = [];
    }

    async populate(){

    }

    getBookById(id){
        return this.data.find(item => item.id === id) || {};
    }

    async addItem(book){
        if (this.getBookById(book.id).id){
            throw new Error(`Ya existe un libro con la id ${book.id}`);
        }
        this.data.push(new Book(book));
    }

    async removeItem(id){
        if (!this.getBookById(id).id){
            throw new Error (`Ǹo existe el libro con la id${id}`);
        }
        this.data = this.data.filter((book) => book.id !== id);
    }

    toString() {
        let text = `Books in the cart: ${this.data.length}`;
        this.data.forEach(item => {
            text += `\n${item.toString()}`;
        });
        return text;
    }
}