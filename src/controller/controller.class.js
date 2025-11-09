import View from "../view/view.class.js";
import Users from "../model/users.class.js";
import Books from "../model/books.class.js";
import Modules from "../model/modules.class.js";
import Cart from "../model/cart.class.js";

const ID_USUARIO = 2;

export default class Controller {
  constructor() {
    this.view = new View();
    this.users = new Users();
    this.books = new Books();
    this.modules = new Modules();
    this.cart = new Cart();
  }

  async init() {
    this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
    try {
      await Promise.all([
        this.users.populate(),
        this.books.populate(),
        this.modules.populate(),
      ]);
    } catch (error) {
      this.view.renderMessage("error", "Error de BBDD: " + error);
    }
    this.cart.populate();

    this.view.renderModulesInSelect(this.modules.data);
    
    this.books.data.forEach((book) => {
      this.view.renderBook(book, this.handleAddToCart.bind(this), this.handleRemoveBook.bind(this));
    });
  }

  async handleSubmitBook(payload) {
    try {
      payload.userId = ID_USUARIO;
      const newBook = await this.books.addBook(payload);
      this.view.renderBook(newBook, this.handleAddToCart.bind(this), this.handleRemoveBook.bind(this));
      this.view.renderMessage("info", "Libro añadido correctamente");
    } catch (error) {
      this.view.renderMessage("error", "Error al añadir el libro: " + error);
    }
  }

  handleAddToCart(book){
    try {
      this.cart.addItem(book);
      this.view.renderMessage('info', 'Libro añadido al carrito correctamente');
    } catch (error) {
      this.view.renderMessage('error', + error);
    }
  }

  async handleRemoveBook(id) {
    try {
      await this.books.removeBook(id);
      this.view.removeBook(id);
      this.view.renderMessage("info", "Libro eliminado correctamente");
    } catch (error) {
      this.view.renderMessage("error", "Error al eliminar el libro: " + error);
    }
  }
}
