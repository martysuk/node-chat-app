let socket = io()

socket.on('connect', () => {
    console.log('Connected to server')
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', (msg) => {
    console.log('New message', msg)
    let li = jQuery('<li></li>')
    li.text(`${msg.from}: ${msg.text}`)
    jQuery('#messages').append(li)
})

// socket.emit('createMessage', {
//     from:'Frank',
//     text:'Hello'
// }, (msg) => {
//     console.log(msg)
// });

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault()

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, () => {
        
    })
})