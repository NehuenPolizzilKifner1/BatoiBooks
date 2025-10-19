import User from './users.class.js';
import {getDBUser, addDBUser, removeDBUser, changeDBUser, changeDBUserPassword} from '../services/api.js';

export default class Users {
    constructor (){
        this.data = [];
    }

    async populate(){
        const users = await getDBUsers();
        this.data = users.map(u => new User(u));
    }

    async addUser(userData){
        const newUser = await addDBUser();
        const user = new User (newUser);
        this.data.push(user);
        return user;
    }

    async removeUser(userId){
        await removeDBUser(userId);
        this.data = this.data.filter(u => u.id !== userId);
    }

    async changeUser(updatedUser){
        const modified = await changeDBUser(updatedUser);
        const index = this.data.findIndex(u => u.id === modified.id);
        if (index !== -1) this.data[index] = new User(modified);
        return this.data[index];
    }

    async changeUserPassword(userId, newPassword) {
        const modified = await changeDBUserPassword(userId, newPassword);
        const index = this.data.findIndex(u => u.id === modified.id);
        if (index !== -1) this.data[index] = new User(modified);
        return this.data[index];
    }

    getUserByNick(nick) {
        const user = this.data.find(u => u.nick === nick);
        if (!user) throw new Error(`User with nick "${nick}" not found`);
        return user;
    }

    toString(){
        return this.data.map(u => u.toString()).join('\n');
    }
}

