let socket = io()

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }

socket.on('connect', () => {
    console.log('Connected to server')
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a')
    let template = jQuery('#message-template').html()
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom()

    // let li = jQuery('<li></li>')
    // li.text(`${message.from} ${formattedTime}: ${message.text}`)
    // jQuery('#messages').append(li)
})

// socket.emit('createMessage', {
//     from:'Frank',
//     text:'Hello'
// }, (msg) => {
//     console.log(msg)
// });


socket.on('newLocationMessage', (message) => {

    let formattedTime = moment(message.createdAt).format('h:mm a')
    let template = jQuery('#location-message-template').html()
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom()


    // let li = jQuery('<li></li>')
    // let a = jQuery('<a target="_blank">My current location</a>')
    // li.text(`${message.from} ${formattedTime}: `)
    // a.attr('href', message.url)
    // li.append(a)
    // jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault()

    let messageTextBox = jQuery('[name=message]')
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, () => {
        messageTextBox.val('')
    })
})

let locationButton = jQuery('#send-location') //stores the jQuery selector that targets the button "Send location"
locationButton.on('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation not supported for your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...')

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send location')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, () => {
        locationButton.removeAttr('disabled').text('Send location')
        alert('Unable to fetch location.')
    })
})