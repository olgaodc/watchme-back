const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {LOGIN, ADD_USER, CHECK_IS_USER_LOGGED_IN, GET_ALL_USERS, GET_USER, GET_ALL_MOVIES_BY_USER_ID, DELETE_USER} = require('../controllers/user')

router.post('/logIn', LOGIN);
router.post('/user', ADD_USER);
router.get('/auth', CHECK_IS_USER_LOGGED_IN);
router.get('/users', GET_ALL_USERS);
router.get('/user/:id', GET_USER);
router.get('/movies/:userId', authMiddleware, GET_ALL_MOVIES_BY_USER_ID)
router.delete('/user/:id', authMiddleware, DELETE_USER);



module.exports = router;