function getBookById(books, bookId){
  const book = books.find(b => b.id === bookId);
  if (!book) throw new Error(`El libro con id ${bookId} no existe`);
  return book;
}

function getBookIndexById(books, bookId){
    const index = books.findIndex(b => Number(b.id) === Number(bookId));
    if (index === -1) throw new Error(`El índice para el libro con id ${bookId} no existe`);
    return index;
}

function bookExists(books, userId, moduleCode){
    return books.some(b => Number(b.userId) === Number(userId) && String(b.moduleCode) === String(moduleCode));
}

function booksFromUser(books, userId){
    return books.filter(b => Number(b.userId) === Number(userId));
}

function booksFromModule(books, moduleCode){
    return books.filter(b => String(b.moduleCode) === String(moduleCode));
}

function booksCheeperThan(books, price){
    const p = Number(price);
    return books.filter(b => Number(b.price) <= p);
}

function booksWithStatus(books, status){
    return books.filter(b => String(b.status) === String(status));
}

function averagePriceOfBooks(books){
    if (!Array.isArray(books) || books.length === 0) return `0.00 €`;
    const total = books.map(b => Number(b.price) || 0).reduce((acc, v) => acc + v, 0);
    const avg = total / books.length;
    return `${avg.toFixed(2)} €`;
}

function booksOfTypeNote(books){
    return books.filter(b => String(b.publisher).trim() === "Apunts");
}

function booksNotSold(books){
    return books.filter(b => {const sd = b.soldDate;
    return !(sd && String(sd).trim().length > 0);
    });
}

function incrementPriceOfbooks(books, percentage){
    const factor = 1 + Number(percentage);
    return books.map(b => {
    const newBook = { ...b };
    const priceNum = Number(b.price) || 0;
    newBook.price = +(priceNum * factor);
    return newBook;
    });
}

function getUserById(users, userId){
    const user = users.find(u => Number(u.id) === Number(userId));
    if (!user) throw new Error(`User with id ${userId} not found`);
    return user;
}

function getUserIndexById(users, userId){
    const idx = users.findIndex(u => Number(u.id) === Number(userId));
    if (idx === -1) throw new Error(`Index for user id ${userId} not found`);
    return idx;
}

function getUserByNickName(users, nick){
    const user = users.find(u => String(u.nick) === String(nick));
    if (!user) throw new Error(`User with nick "${nick}" not found`);
    return user;
}

function getModuleByCode(module, moduleCode){
    const mod = modules.find(m => String(m.code) === String(moduleCode));
    if (!mod) throw new Error(`Module with code ${moduleCode} not found`);
    return mod;
}

export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNote,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
}
