const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']},
    username: {type: String, required: true, lowercase: true, unique: true},
    password: {type: String, required: true, minlength: 8}
},{timestamps: true})

const user = mongoose.model('user', userSchema)

module.exports = user