class Users {
    constructor() {
        this.users = []
    }
    addUser(id, name, room){
        let user = {id, name, room}
        this.users.push(user)
        return user
    }
    removeUser(id) {
        let user = this.getUser(id)
        if(user){
            this.users = this.users.filter((user) => user.id !== id)
        }
        return user
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList(room) {
        let users = this.users.filter((user) => user.room === room)
        let namesArr = users.map((user) => user.name)
        return namesArr
    }
}

module.exports = {Users}

// class Person{
//     constructor(name, age) {
//         this.name = name
//         this.age = age
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s)`
//     }
// }

// let me = new Person('Marta', 19)
// let description = me.getUserDescription()
// console.log(description)