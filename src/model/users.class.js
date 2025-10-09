import User from './users.class.js';
export default class Users {
    constructor (){
        this.data = [];
    }

    populate(usersArray){
        this.data = usersArray.map(u => new User(u));
    }

    addUser(userData){
        const newId = this.data.length ? Math.max(...this.data.map(u => u.id)) + 1 : 1;
        const user = new User(newId, userData.nick, userData.email, userData.password);
        this.data.push(user);
        return user;
    }

    removeUser(userId){
        const index = this.data.findIndex(u => u.id === userId);
        if (index === -1) throw new Error(`User with id ${userId} not found`);
        this.data.splice(index, 1);
    }

    changeUser(updatedUser){
        const index = this.data.findIndex(u => u.id === updatedUser.id);
        if (index === -1) throw new Error(`User with id ${updatedUser.id} not found`);
        this.data[index] = new User(updatedUser.id, updatedUser.nick, updatedUser.email, updatedUser.password);
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

