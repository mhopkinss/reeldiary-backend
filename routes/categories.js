//import express
const express = require('express')

//controller imports
const {
    getCategories,
    getMoviesInCategory
} = require('../controllers/categoryController')

const requireAuth = require('../middleware/requireAuth')

//router setup
const router = express.Router()

//validate all paths
router.use(requireAuth)

//GET all categories at '/'
router.get('/', getCategories)

//GET all movies in a certain category
router.get('/:genre', getMoviesInCategory)

//export router
module.exports = router