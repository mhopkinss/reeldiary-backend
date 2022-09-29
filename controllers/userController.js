//require dependencies
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//use jwt to create a token using jwt.sign(and three arguments)
const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    //get email and password sent in req.body
    const {email, password} = req.body
    try{
        //use the User.login statics method, passing in email and password as arguments
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        //respond with email, and jwt token
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//signup user
const signupUser = async (req, res) => {
    //get email and password sent in req.body
    const {email, password} = req.body

    try{
        //use the User.signup statics method, passing in email and password as arguments
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)

        //respond with email and jwt token
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}