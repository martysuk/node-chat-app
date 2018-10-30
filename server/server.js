const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '../public') // path that we will provide the express static middleware
const port = process.env.PORT || 3000

const app = express()

app.use(express.static(publicPath))

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
})