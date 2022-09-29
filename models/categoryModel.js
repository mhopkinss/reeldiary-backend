const mongoose = require('mongoose')

const Schema = mongoose.Schema

//creating a new Schema with 1 property (genre)
const categorySchema = new Schema({
    genre: {
        //the type and required props just set each original properties specifications on what it needs to be valid
        type: String,
        required: true
    }
    //timestamps: true generates a timestamp each time a new category is created
}, { timestamps: true })

//export our newly created schema
module.exports = mongoose.model('Category', categorySchema)