const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean, default: false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true})

const tasks = mongoose.model('tasks', taskSchema)

module.exports = tasks