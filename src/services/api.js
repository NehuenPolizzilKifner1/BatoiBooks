
const BASE_URL = "http://127.0.0.1:3000";

async function getDBUsers(){
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Error al obtener los usuarios");
    return res.json();
}

async function getDBModules(){
    const res = await fetch(`${BASE_URL}/modules`);
    if (!res.ok) throw new Error("Error al obtener los módulos");
    return res.json();
}

async function getDBBooks(){
    const res = await fetch(`${BASE_URL}/books`);
    if (!res.ok) throw new Error("Error al obtener los libros");
    return res.json();
}

async function getDBUser(id){
    const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error("Usuario no encontrado");
  return res.json();
}

async function getDBBook(id){
    const res = await fetch(`${BASE_URL}/books/${id}`);
    if (!res.ok) throw new Error("Libro no encontrado");
    return res.json();
}

async function addDBBook(book){
    const res = await fetch(`${BASE_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    });
    if (!res.ok) throw new Error("Error al añadir libro");
    return res.json();
}

async function addDBUser(user){
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error("Error al añadir usuario");
    return res.json();
}

async function removeDBBook(id){
    const res = await fetch(`${BASE_URL}/books/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al borrar libro");
}

async function removeDBUser(id){
    const res = await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al borrar usuario");
}

async function changeDBBook(book){
    const res = await fetch(`${BASE_URL}/books/${book.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  if (!res.ok) throw new Error("Error al modificar libro");
  return res.json();
}

async function changeDBUser(user){
    const res = await fetch(`${BASE_URL}/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error("Error al modificar usuario");
  return res.json();
}

async function changeDBUserPassword(id, newPassword){
const user = await getDBUser(id);
  user.password = newPassword;
  return changeDBUser(user);
}

export{
    getDBUsers,
    getDBModules,
    getDBBooks,
    getDBUser,
    getDBBook,
    addDBBook,
    addDBUser,
    removeDBBook,
    removeDBUser,
    changeDBBook,
    changeDBUser,
    changeDBUserPassword
}