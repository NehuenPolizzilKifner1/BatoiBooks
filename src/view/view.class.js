export default class View {
  constructor() {
    this.booksList = document.getElementById('list')
    this.about = document.getElementById('about')
    this.form = document.getElementById('form')
    this.messages = document.getElementById('messages')
    this.remove = document.getElementById('remove')
    this.removeBtn = document.getElementById('removeBookButton')
    this.bookForm = document.querySelector('#form form')
    this.moduleSelect = document.getElementById('module-code')
  }

  setBookSubmitHandler(handler){
    this.bookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(this.getFormBookData());
    });
  }

  renderModulesInSelect(modules) {
    modules.forEach(module => {
      const newOption = document.createElement('option')
      newOption.value = module.code
      newOption.innerHTML = module.vliteral
      this.moduleSelect.append(newOption)
    })
  }

  renderBook(book, handlerCartAdd, handlerRemoveBook) {
    const bookDiv = document.createElement('div')
    bookDiv.className = 'card'
    bookDiv.id = `book-${book.id}`
    bookDiv.innerHTML = `
      <img src="${book.photo}" alt="Libro: ${book.id}">
      <div>
        <h3>${book.moduleCode} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${this.renderBookSaleDate(book.soldDate)}</p>
        <p>${book.comments}</p>
        <h4>${book.price} €</h4>
      </div>
      <div>
        <button class="add-to-cart-btn">
          <span class="material-icons">add_shopping_cart</span>
        </button>
        <button class="edit-btn">
          <span class="material-icons">edit</span>
        </button>
        <button class="delete-btn">
          <span class="material-icons">delete</span>
        </button>
    `
    this.booksList.append(bookDiv);
    bookDiv.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      handlerCartAdd(book);
    });

    bookDiv.querySelector('.edit-btn').addEventListener('click', () => {
      this.renderBookInForm(book);
    });

    bookDiv.querySelector('.delete-btn').addEventListener('click', () => {
      if(confirm(`¿Estás seguro de que deseas eliminar este libro? ID: ${book.id} Módulo: ${book.moduleCode}`)){
        handlerRemoveBook(book.id);
      }
    });
  }

  renderBookInForm(book){
    this.bookForm.querySelector('h2').textContent = 'Editar libro';
    document.getElementById('id').parentElement.classList.remove('hide');
    document.getElementById('module-code').value = book.moduleCode;
    document.getElementById('publisher').value = book.publisher;
    document.getElementById('price').value = book.price;
    document.getElementById('pages').value = book.pages;
    document.querySelector(`input[name="status"][value="${book.status}"]`).checked = true;
    document.getElementById('comments').value = book.comments;
  }

  renderBookSaleDate(date) {
    if (!date) {
      return 'En venta'
    }
    const soldLocalDate = new Date(date).toLocaleDateString('es-ES')
    return `Vendido el ${soldLocalDate}`
  }

  removeBook(id) {
    document.getElementById(`book-${id}`).remove()
  }

  renderMessage(type, message) {
    const newMessage = document.createElement('div')
    newMessage.className = `${type} alert alert-danger alert-dismissible`
    newMessage.setAttribute('role', 'alert')
    newMessage.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `
    this.messages.append(newMessage)
    if (type !== 'error') {
      setTimeout(() => {
        newMessage.remove()
      }, 3000)
    }
  }

  getFormBookData() {
    return {
      moduleCode: document.getElementById('module-code').value,
      publisher: document.getElementById('publisher').value,
      price: parseFloat(document.getElementById('price').value),
      pages: parseInt(document.getElementById('pages').value),
      status: this.bookForm.querySelector('input[name="status"]:checked')?.value,
      comments: document.getElementById('comments').value,
    }
  }
}
