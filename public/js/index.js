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


socket.on('newLocationMessage', (message) => {
    let li = jQuery('<li></li>')
    let a = jQuery('<a target="_blank">My current location</a>')

    li.text(`${message.from}: `)
    a.attr('href', message.url)
    li.append(a)
    jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault()

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, () => {
        
    })
})

let locationButton = jQuery('#send-location') //stores the jQuery selector that targets the button "Send location"
locationButton.on('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation not supported for your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, () => alert('Unable to fetch location.'))
})