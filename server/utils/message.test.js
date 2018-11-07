const expect = require('expect')

const { generateMessage } = require('./message')

describe('generateMessage', () => {
    it('should generate correct messsage object', () => {
        let from = 'Mark'
        let text = 'My message'
        let msg = generateMessage(from, text)
        expect(msg.from).toBe(msg.from)
        expect(msg.text).toBe(msg.text)
        expect(typeof msg.createdAt).toBe('number')
    })
})