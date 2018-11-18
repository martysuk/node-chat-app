const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public') // path that we will provide the express static middleware
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users')

let users = new Users()

app.use(express.static(publicPath)) //configuring the middleware

io.on('connection', (socket) => {
    console.log('New user connected')



    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.')
        }
        if(users.checkIfUserExist(params.name, params.room)){
            return callback(`User ${params.name} already exists at this room`)
        }
        socket.join(params.room)//socket.leave(param.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))
        //io.emit -> io.to(params.room).emit
        //socket.broadcast.emit -> socket.broadcast.to(params.room).emit
        //socket.emit

        callback()
    })

    socket.on('createMessage', (msg, callback) => {
        let user = users.getUser(socket.id)
        if (user && isRealString(msg.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text))
        }
        callback() //callback('This is from the server')

        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id)
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
        let user = users.removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
        }
    })

})

server.listen(port, () => {
    console.log(`Started up at port ${port}`)
}) //http server

/*app.listen(port, () => {
    console.log(`Started up at port ${port}`)
}) // http.createServer(app); creates express server*/