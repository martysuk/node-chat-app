const expect = require('expect')
const {isRealString} = require('./validation')

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let str = 425
        let result = isRealString(str)
        expect(result).toBe(false)
    })
    it('should reject string with only spaces', () => {
        let str = '     '
        let result = isRealString(str)
        expect(result).toBe(false)
        
    })
    it('should allow string woth non-space characters', () => {
        let str = 'Monica130+_=='
        let result = isRealString(str)
        expect(result).toBe(true)
    })
})