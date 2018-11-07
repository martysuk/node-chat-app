let socket = io()

socket.on('connect', () => {
    console.log('Connected to server')

    socket.emit('createMessage', {
        to: 'Jane',
        text: 'Hey.This is Jane'
    })
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', (msg) => {
    console.log('There is new message for you', msg)
})