require('dotenv').config()
const jwt = require('jsonwebtoken')

const authWare =  async (req, res, next) => {
    try{
        let token = req.headers.authorization
        if(!token){
            const error = new Error('Unauthorised')
            error.statusCode = 401
            return next(error)
        }
        token = token.split(' ')[1]
        const verification = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verification
        next()
    }catch(err){
        next(err)
    }
}

module.exports = authWare