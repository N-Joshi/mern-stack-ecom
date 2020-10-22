const User = require('../models/user')
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }
        res.json({
            id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
        })
    })
}


exports.signin = (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: 'Email id not registered with us'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                err: 'Email & Password do not match'
            })
        }

        //Create a JWT token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        //store token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 })
        const { _id, name, email, role } = user
        return res.json({
            token,
            user: {
                id: _id,
                name: name,
                email: email,
                role: role
            }
        })
    })
}


exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({ message: "User Signed Out" })
}


//Protected Routes
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth" 
})

//Custom Middlewares
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
      return res.status(403).json({
          error:"Access Denied"
      })
    }
    next();
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
      return res.status(403).json({
          error:"Access Denied Admin Access Only"
      })
    }
    next()
}