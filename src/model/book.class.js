export default class Book {
    constructor(book){
        this.id = book.id;
        this.userId = book.userId;
        this.moduleCode = book.moduleCode;
        this.publisher = book.publisher;
        this.price = book.price;
        this.pages = book.pages;
        this.status = book.status;
        this.soldDate = book.soldDate || '';

        if (book.photo){
            this.photo = book.photo;
        } else {
            return this.photo = '';
        }

        if (this.comments){
            this.comments = book.comments;
        } else {
            return this.comments = '';
        }
    }

    toString (){
        return this.id + ', ' + this.userId + ', ' + this.moduleCode + ', ' + this.publisher + ', ' + this.price + ', ' + this.pages + ', ' + this.status + ', ' + this.photo + ', ' + this.comments + ', ' + this.soldDate;
    }
}