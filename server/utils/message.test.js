const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
    it('should generate correct messsage object', () => { // no done operator since it's async test
        let from = 'Mark'
        let text = 'My message'
        let msg = generateMessage(from, text)
        expect(msg.from).toBe(msg.from)
        expect(msg.text).toBe(msg.text)
        expect(typeof msg.createdAt).toBe('number')
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'Kamilla'
        let latitude = 10
        let longitude = 15
        let url = 'http://www.google.com/maps?q=10,15'
        let msg = generateLocationMessage(from, latitude, longitude)
        expect(msg.from).toBe(from)
        expect(msg.url).toBe(url)
        expect(typeof msg.createdAt).toBe('number')
    })
})