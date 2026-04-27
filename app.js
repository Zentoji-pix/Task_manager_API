require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('./middleware/logger')
const timer = require('./middleware/timer')
const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/task')


mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log(`Database connected successfully`)})
    .catch((err) => {console.error(err)})

app.use(express.json())

app.use( logger )
app.use( timer )

app.use('/auth', authRoutes);

app.use('/tasks', taskRoutes)


app.use((err, req, res, next) => {
    console.error(err.stack)
    const status = err.statusCode || 500
    res.status(status).json({error: err.message || 'Internal Server Error'})
})

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is live on port ${PORT}`)
})