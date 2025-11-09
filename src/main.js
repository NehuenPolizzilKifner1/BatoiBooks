import Controller from './controller/controller.class.js';

document.querySelector('#app').innerHTML = `
  <header>
    <img src="./public/logoBatoi.png" alt="Batoi Logo">
    <h1>Biblioteca Batoi</h1>
  </header>
  <nav>
    <ul>
      <li><a href="#list">Ver Libros</a></li>
      <li><a href="#form">Añadir Libro</a></li>
      <li><a href="#about">Acerca de...</a></li>
    </ul>
  </nav>
  <div id="messages"></div>
  <main>
    <div id="list"></div>
    <div id="form">
      <form>
        <h2>Añadir libro:</h2>
        <div class="hide">
          <label>Id:</label>
          <input type="text" id="id" disabled>
        </div>
        <div>
          <label>Módulo:</label>
          <select id="module-code" required>
            <option value="">--- Selecciona un módulo ---</option>
          </select>
        </div>
        <div>
          <label>Editorial:</label>
          <input type="text" id="publisher" required>
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" id="price" required min="0" step="0.01">
        </div>
        <div>
          <label>Páginas:</label>
          <input type="number" id="pages" required min="1">
        </div>
        <div>
          <label>Estado:</label><br>
            <input type="radio" name="status" value="new" required="">Nuevo<br>
            <input type="radio" name="status" value="good" required="">Bueno<br>
            <input type="radio" name="status" value="bad" required="">Malo<br>
            <input type="radio" name="status" value="digital" required="">Digital<br>
        </div>
        <div>
          <label>Comentarios:</label>
          <textarea id="comments"></textarea>
        </div>
        <button type="submit">Guardar</button>
        <button type="reset">Reset</button>
      </form>
    </div>
    <div id="about"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div>
  </main>
  <footer>
    <p>Nehuen Polizzil Kifner</p>
  </footer>
`

document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
})
