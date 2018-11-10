const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public') // path that we will provide the express static middleware
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const {generateMessage, generateLocationMessage} = require('./utils/message')

app.use(express.static(publicPath)) //configuring the middleware

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    socket.on('createMessage', (msg, callback) => {
        console.log('createMessage', msg)
        io.emit('newMessage', generateMessage(msg.from, msg.text))

        callback() //callback('This is from the server')

        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })

})

server.listen(port, () => {
    console.log(`Started up at port ${port}`)
}) //http server

/*app.listen(port, () => {
    console.log(`Started up at port ${port}`)
}) // http.createServer(app); creates express server*/