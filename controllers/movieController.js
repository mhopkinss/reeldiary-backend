//import our Workout Schema
const Movie = require('../models/movieModel')

const axios = require('axios');

const mongoose = require('mongoose');

require('dotenv').config()

// GET all movies
const getMovies = async (req, res) => {
    //finding all movies in database
    const user_id = req.user._id
    const movies = await Movie.find({user_id: user_id}).sort({createdAt: -1})

    //respond with a status code of 200 and a json version of movies
    res.status(200).json(movies)
}

// GET a single movie
const getMovie = async (req, res) => {
    //take id from req params
    const { id } = req.params

    //if id is not a valid mongoDB id, return a 404 error
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such movie'})
    }
    //search the DB for a movie with the correct id
    const movie = await Movie.findById(id)

    //if there is no movie for the id, return a 404 error
    if(!movie){
        return res.status(404).json({error: 'No such movie'})
    }
    
    //if there is a valid id and an object for that id, return 200 ok, and a json for that movie
    res.status(200).json(movie)
}

//FETCH movie from external api
const fetchMovie = async (req, res) => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_MOVIE_API}${process.env.REACT_APP_MOVIE_API_KEY}&t=${req.params.movie}`)
        res.status(200).json(response.data)
    }catch (error){
        console.log(error)
        res.status(400).json(error)
    }
}

//POST a new movie
const createMovie = async (req, res) => {
    //destructuring from the req body
    const user_id = req.user._id

    const {title, url, year, directedBy, description, genre, castList, rated, rottenTomatoes, runtime, imdbRating, rating} = req.body

    // add doc to db
    try{
        //create a new movie from Schema with title, load, reps from request body
        const movie = await Movie.create({title,url,year,directedBy,description,genre,castList,rated,rottenTomatoes,runtime,imdbRating, user_id, rating})
        //respond with a 200 ok and json of the new movie
        res.status(200).json(movie)
    } catch (error) {
        //if error, respond with a 404 error in json format
        res.status(400).json({error: error.message})
    }
}

// DELETE a movie
const deleteMovie = async (req, res) => {
    //destructuring id from req.params
    const { id } = req.params

    //if id is not a valid mongoDB id, return a 404 error
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such movie'})
    }
    //find a movie by id in the database, and delete it
    const movie = await Movie.findOneAndDelete({_id: id})
    //if there is no workout with that id, respond with a 404 error in json format
    if(!movie){
        return res.status(404).json({error: 'No such movie'})
    }
    //if there is an object with a valid id that was deleted, respond with status code 200 and json of movie
    res.status(200).json(movie)
}

//UPDATE a movie
const updateMovie = async (req, res) => {
    //destructuring id from req.params
    const { id } = req.params

    //if id is not a valid mongoDB id, return a 404 error
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such movie'})
    }
    //find a workout by id in DB, and update it with entire ...req.body
    const movie = await Movie.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    //if there is no workout, respond with 404 error in json format
    if(!movie){
        return res.status(404).json({error: 'No such movie'})
    }
    //if there is a movie that has been updated, respond with 200 ok and the json movie
    res.status(200).json(movie)
}

//export all these controller functions
module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie,
    fetchMovie
}