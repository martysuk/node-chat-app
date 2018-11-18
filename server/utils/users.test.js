const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]
    })

    it('should add new user', () => {
        let users = new Users()
        let user = {
            id: '123',
            name: 'John',
            room: 'The Office Fans'
        }
        let responseUser = users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user])
    })

    it('should return names for Node course', () => {
        let userList = users.getUserList('Node Course')
        expect(userList).toEqual(['Mike', 'Julie'])
    })

    it('should return names for React course', () => {
        let userList = users.getUserList('React Course')
        expect(userList).toEqual(['Jen'])
    })

    it('should remove a user', () => {
        let removedUser = users.removeUser('1')
        expect(removedUser).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        })
        expect(users.users.length).toBe(2)
    })

    it('should not remove user', () => {
        let removedUser = users.removeUser('4')
        expect(typeof removedUser).toBe('undefined')
        expect(users.users.length).toBe(3)
    })

    it('should find user', () => {
        let targetUser = users.getUser('1')
        expect(targetUser).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        })
    })

    it('should not find user', () => {
        let targetUser = users.getUser('4')
        expect(typeof targetUser).toBe('undefined')
    })
})