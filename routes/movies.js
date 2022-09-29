//import express
const express = require('express')

//controller imports
const {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie,
    fetchMovie
} = require('../controllers/movieController')

const requireAuth = require('../middleware/requireAuth')

//router setup
const router = express.Router()

//validate all paths
router.use(requireAuth)

//GET all movies at '/'
router.get('/', getMovies)

//FETCH a movie from api
router.get('/getMovie/:movie', fetchMovie)

//GET a single movie at '/some id'
router.get('/:id', getMovie)

//POST a new movie at '/'
router.post('/create', createMovie)

//DELETE a movie at '/some id'
router.delete('/:id', deleteMovie)

//UPDATE a movie at '/some id'
router.patch('/:id', updateMovie)

//export router
module.exports = router