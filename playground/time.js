const moment = require('moment')

let date = moment()
date.add(100, 'year').subtract(9, 'months')
console.log(date.format('MMM Do, YYYY'))

let someTimestamp = moment().valueOf()
console.log(someTimestamp)

let createdAt = 1234
let time = moment(createdAt)
console.log(time.format('h:mm a'))