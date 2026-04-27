require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const user = require('./models/users')

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log(`Database connected successfully`)})
    .catch((err) => {console.error(err)})

    

app.use((err, req, res, next) => {
    console.error(err.stack)
    const status = err.statusCode || 500
    res.status(status).json({error: err.message || 'Internal Server Error'})
})

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is live on port ${PORT}`)
})