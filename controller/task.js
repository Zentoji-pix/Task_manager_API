const tasks = require('../models/tasks')

const create = async (req, res, next) => {
    try{
        const task = req.body
        const newTask = await tasks.create({ user: req.user.id, ...task })
        res.status(201).json(newTask)
    }catch(err){
        next(err)
    }
}

function check(queryString, userID){
    const filter = {}
    filter.user = userID
    if(queryString.task) filter.task = { $regex: `${queryString.task}`, $options: 'i'}
    if(queryString.description) filter.description = { $regex: `${queryString.description}`, $options: 'i'}
    if(queryString.completed !== undefined) filter.completed = queryString.completed
    return filter
}

const getAll = async (req, res, next) => {
    try{
        const queryString = req.query
        const userID = req.user.id
        const filter = check(queryString, userID)
        const task = await tasks.find(filter)
        res.status(200).json(task)
    }catch(err){
        next(err)
    }
}

const getId = async (req, res, next) => {
    try{
        const userID = req.user.id
        const {id} = req.params
        const task = await tasks.findOne({ user: userID, _id: id })
        if (!task){
            const error = new Error('Not found')
            error.statusCode = 404
            return next(error)
        }
        res.status(200).json(task)
    }catch(err){
        if ( err.name === 'CastError'){
            err.statusCode = 400
        }
        next(err)
    }
}

const update = async (req, res, next) => {
    try{
        const userID = req.user.id
        const {id} = req.params
        const task = await tasks.findOneAndUpdate({ user: userID, _id: id }, req.body, { new: true } )
        if (!task){
            const error = new Error('Not found')
            error.statusCode = 404
            return next(error)
        }
        res.status(200).json(task)
    }catch(err){
        if ( err.name === 'CastError'){
            err.statusCode = 400
        }
        next(err)
    }
}

const del = async (req, res, next) => {
    try{
        const userID = req.user.id
        const {id} = req.params
        const task = await tasks.findOneAndDelete({ user: userID, _id: id })
        if (!task){
            const error = new Error('Not found')
            error.statusCode = 404
            return next(error)
        }
        res.status(204).send()
    }catch(err){
        if ( err.name === 'CastError'){
            err.statusCode = 400
        }
        next(err)
    }
}

module.exports = {create, getAll, getId, update, del}