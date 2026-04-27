require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const users = require('../models/users')

router.post('/signup', async (req, res, next) => {
    try{
        let { password } = req.body
        password = await bcrypt.hash(password, 10)
        const userData = {username: req.body.username, email: req.body.email, password}
        await users.create(userData)
        res.status(201).send('Profile successfully created')
    }catch(err){
        next(err)
    }
})

router.post('/login', async(req, res, next) => {
    try{
        const {username, password} = req.body
        const userData = await users.findOne({ username: username })
        if(!userData){
            const error = new Error('Not found')
            error.statusCode = 404
            return next(error)
        }
        const verify = bcrypt.compare(password, userData.password)
        if(verify !== true){
            const error = new Error('Incorrect password')
            error.statusCode = 401
            return next(error)
        }
        const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {expiresIn: '2d'})
        res.status(200).json({ message: `Welcome ${username}`, token})
    }catch(err){
        next(err)
    }
})

module.exports = router