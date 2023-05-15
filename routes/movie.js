const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {ADD_MOVIE, GET_MOVIES, GET_MOVIE, EDIT_MOVIE_TITLE, EDIT_MOVIE_CONTENT, CHANGE_MOVIE_STATUS, DELETE_MOVIE} = require('../controllers/movie')

router.post('/movie', authMiddleware, ADD_MOVIE);
router.get('/movies', authMiddleware, GET_MOVIES);
router.get('/movie/:id', authMiddleware, GET_MOVIE);
router.put('/movie/title/:id', authMiddleware, EDIT_MOVIE_TITLE);
router.put('/movie/content/:id', authMiddleware, EDIT_MOVIE_CONTENT);
router.put('/movie/status/:id', authMiddleware, CHANGE_MOVIE_STATUS);
router.delete('/movie/:id', authMiddleware, DELETE_MOVIE);



module.exports = router;