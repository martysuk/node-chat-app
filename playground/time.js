const moment = require('moment')

let date = moment()
let today = moment().format('DD-MM-YYYY')
let yesterday = moment().subtract(1, 'days').format('DD-MM-YYYY')
console.log(yesterday)
let timeDiff = moment(yesterday, 'DD-MM-YYYY').fromNow().split(' ')
console.log(timeDiff)
console.log(typeof timeDiff[0])
if (timeDiff[2] == 'ago' && timeDiff[1] == 'days' && timeDiff[0] <= 14)
    console.log('NOT ALLOWED')
let daysLeft = 14 - Number(timeDiff[0])
console.log(daysLeft)
//console.log("20092018","DDMMYYYY").fromNow()
/*
console.log(date.subtract(15, 'days').format('DD-MM-YYYY'))
console.log(date.subtract(2, 'weeks').format('DD-MM-YYYY'))*/

/*
date.add(100, 'year').subtract(9, 'months')
console.log(date.format('MMM Do, YYYY'))

let someTimestamp = moment().valueOf()
console.log(someTimestamp)

let createdAt = 1234
let time = moment(createdAt)
console.log(time.format('h:mm a'))*/