const express = require('express');
const router = express.Router();
const {LOGIN, ADD_USER, GET_ALL_USERS, GET_USER, DELETE_USER} = require('../controllers/user')

router.post('/logIn', LOGIN);
router.post('/user', ADD_USER);
router.get('/users', GET_ALL_USERS);
router.get('/user/:id', GET_USER);
router.delete('/user/:id', DELETE_USER);



module.exports = router;