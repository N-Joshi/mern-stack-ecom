var express = require('express')
var router = express.Router()
const {isSignedIn ,isAuthenticated,isAdmin} = require('../controllers/auth')
const { getUserById, getUser , updateUser ,getUserOrder} = require('../controllers/user')
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');



router.param("userId", getUserById)
router.get('/user/:userId' , isSignedIn, isAuthenticated, getUser)
router.put('/user/:userId' , isSignedIn, isAuthenticated, updateUser)
router.get('/user/orders/:userId' , isSignedIn, isAuthenticated, getUserOrder)


module.exports = router