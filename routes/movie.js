const express = require('express');
const router = express.Router();
const {ADD_MOVIE, GET_MOVIES, GET_MOVIE, EDIT_MOVIE_TITLE, EDIT_MOVIE_CONTENT, CHANGE_MOVIE_STATUS, DELETE_MOVIE} = require('../controllers/movie')

router.post('/movie', ADD_MOVIE);
router.get('/movies', GET_MOVIES);
router.get('/movie/:id', GET_MOVIE);
router.put('/movie/title/:id', EDIT_MOVIE_TITLE);
router.put('/movie/content/:id', EDIT_MOVIE_CONTENT);
router.put('/movie/status/:id', CHANGE_MOVIE_STATUS);
router.delete('/movie/:id', DELETE_MOVIE);



module.exports = router;