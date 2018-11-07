const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public') // path that we will provide the express static middleware
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath)) //configuring the middleware

io.on('connection', (socket) => {
    console.log('New user connected')
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