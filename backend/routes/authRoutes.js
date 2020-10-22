var express = require('express')
const { signout, signup , signin, isSignedIn } = require('../controllers/auth')
const { check , validationResult} = require('express-validator');
var router = express.Router()
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

router.get("/signout",signout)

router.post("/signup", [
    check('name',"Must with atleast 3 chars long").isLength({ min: 3 }),
    check('email',"Must be a valid email").isEmail(),
    check('password',"Password Should be atleast 5 chars").isLength({min:5}),
] ,signup)

router.post("/signin",[
    check('email',"Must be a valid email").isEmail(),
    check('password',"Password Field is required").isLength({min:5}),
],signin)


router.get("/testroute", isSignedIn ,(req,res) =>{
    res.json(
        req.auth
    )
})

module.exports = router