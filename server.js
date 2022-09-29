//env file
require('dotenv').config()

//dependencies 
const express = require('express')
const mongoose = require('mongoose')
const movieRoutes = require('./routes/movies')
const categoryRoutes = require('./routes/categories')
const userRoutes = require('./routes/users')
const bodyParser = require('body-parser')

//express app
const app = express()

//middleware
app.use(express.json())
app.use(bodyParser.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
//
//routes
app.use('/', function(req, res){
    res.send('WORKING!')
})
app.use('/movies', movieRoutes)
app.use('/categories', categoryRoutes)
app.use('/user', userRoutes)

//connect to DB
mongoose.connect(process.env.MONG_URI)
    .then(() => {
    //listen for requests
    app.listen(process.env.PORT || 7000, () => {
        console.log('listening to db and connected on port', process.env.PORT)
    })})
    .catch((error) => {
        console.log(error)
    })