const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/user', userRoutes)
app.use('/article', articleRoutes)

module.exports = app