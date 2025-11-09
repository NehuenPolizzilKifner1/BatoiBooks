import User from './user.class.js';
import { 
  getDBUsers,
  getDBUser,
  addDBUser,
  removeDBUser,
  changeDBUser,
  changeDBUserPassword,
} from '../services/api.js';

export default class Users {
  constructor() {
    this.data = [];
  }

  async populate() {
    const data = await getDBUsers();
    this.data = data.map(item => new User(item.id, item.nick, item.email, item.password));
  }

  async addUser(user) {
    const dataAdded = await addDBUser(user)
    const newUser = new User(dataAdded.id, dataAdded.nick, dataAdded.email, dataAdded.password)
    this.data.push(newUser)
    return newUser
  }

  async removeUser(userId) {
    await removeDBUser(userId)
    // Si no existe el usuario se habrá lanzado un error
    const index = this.getUserIndexById(userId)
    this.data.splice(index, 1)
  }

  async changeUser(user) {
    const dataChanged = await changeDBUser(user)
    const modifiedUser = new User(dataChanged.id, dataChanged.nick, dataChanged.email, dataChanged.password)
    const index = this.getUserIndexById(user.id)
    this.data.splice(index, 1, modifiedUser);
    return modifiedUser
  }

  async changeUserPassword(userId, newPassword) {
    const dataChanged = await changeDBUserPassword(userId, newPassword)
    const modifiedUser = new User(dataChanged.id, dataChanged.nick, dataChanged.email, dataChanged.password)
    const index = this.getUserIndexById(userId)
    this.data.splice(index, 1, modifiedUser);
    return modifiedUser
  }

  toString() {
    let text = `Users: ${this.data.length}`;
    this.data.forEach(item => {
      text += `\n${item.toString()}`;
    });
    return text;
  }

  async getUserById(userId) {
    const user = this.data.find((item) => item.id === userId)
    if (!user) {
      throw new Error(`No existe el usuario con id ${userId}`)
    }
    return user
  }
  
  getUserIndexById(userId) {
    const index = this.data.findIndex((item) => item.id === userId)
    if (index === -1) {
      throw new Error(`No existe el usuario con id ${userId}`)
    }
    return index
  }

  getUserByNickName(nick) {
    const user = this.data.find((item) => item.nick === nick)
    if (!user) {
      throw new Error(`No existe el usuario con nick ${nick}`)
    }
    return user
  }
}