const SERVER = 'http://localhost:3000';

async function getDBBooks() {
  if (!SERVER) {
    throw "La variable de entorno VITE_URL_API no está definida";
  }
  const response = await fetch(`${SERVER}/books`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getDBBook(bookId) {
  const response = await fetch(`${SERVER}/books/${bookId}`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function addDBBook(newBook) {
  const response = await fetch(`${SERVER}/books`, {
    method: "POST",
    body: JSON.stringify(newBook),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}
async function removeDBBook(bookId) {
  const response = await fetch(`${SERVER}/books/${bookId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function changeDBBook(newBook) {
  const response = await fetch(`${SERVER}/books/${newBook.id}`, {
    method: "PUT",
    body: JSON.stringify(newBook),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getDBModules() {
  const response = await fetch(`${SERVER}/modules`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getDBModule(moduleCode) {
  const response = await fetch(`${SERVER}/modules?code=${moduleCode}`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data[0];
}

async function getDBUsers() {
  const response = await fetch(`${SERVER}/users`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getDBUser(userId) {
  const response = await fetch(`${SERVER}/users/${userId}`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function addDBUser(newUser) {
  const response = await fetch(`${SERVER}/users`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}
async function removeDBUser(userId) {
  const response = await fetch(`${SERVER}/users/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function changeDBUser(newUser) {
  const response = await fetch(`${SERVER}/users/${newUser.id}`, {
    method: "PUT",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}
async function changeDBUserPassword(userId, newPassword) {
  const response = await fetch(`${SERVER}/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ password: newPassword }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

export{
    getDBUsers,
    getDBModules,
    getDBModule,
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
