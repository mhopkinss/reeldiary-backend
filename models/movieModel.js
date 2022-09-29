const mongoose = require('mongoose')

const Schema = mongoose.Schema

//creating a new Schema with 6 properties, title;url;year;directedBy;description;genre
const movieSchema = new Schema({
    title: {
        //the type and required props just set each original properties specifications on what it needs to be valid
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    directedBy: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    castList: {
        type: String,
        required: false
    },
    rated: {
        type: String,
        required: false
    },
    rottenTomatoes: {
        type: String,
        required: false
    },
    runtime: {
        type: String,
        required: false
    },
    imdbRating: {
        type: String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    }
    //timestamps: true generates a timestamp each time a new movie is created
}, { timestamps: true })

//export our newly created movieSchema
module.exports = mongoose.model('Movie', movieSchema)