//import our Workout Schema
const Category = require('../models/categoryModel')
const Movie = require('../models/movieModel')

// GET all categories
const getCategories = async (req, res) => {
    //finding all categories in database
    const categories = await Category.find({}).sort({createdAt: -1})

    //respond with a status code of 200 and a json version of movies
    res.status(200).json(categories)
}

//GET all movies in a single category
const getMoviesInCategory = async (req, res) => {
    try{
        //search movies collection for any documents that match this genre
        const movies = await Movie.find({genre: req.params.genre, user_id: req.user._id})

        //respond with list of movies
        res.status(200).json(movies)

    }catch (error){
        res.status(404).json({error: 'No such movie'})
    }
}

//export controller function
module.exports = {
    getCategories, 
    getMoviesInCategory
}