//require dependencies
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config()

//middleware function that protects all of our routes
const requireAuth = async (req, res, next) => {

    //getting the authorization prop from req.headers
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')

        next()
    }catch (error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth