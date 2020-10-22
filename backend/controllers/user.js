const User = require('../models/user')
const Order = require('../models/order')

exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            res.status(400).json({error:'No user found !!'})
        }
        req.profile = user
        next()
    })
}


exports.getUser = (req,res) => {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}


exports.updateUser = (req,res) =>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true, useFindAndModify : false},
        (err,user) => {
            if(err || !user){
                return res.status(400).json({
                    error:"Unauthorized"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            user.createdAt = undefined
            user.updatedAt = undefined
            res.json(user)
        }
    )
}


exports.getUserOrder = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400)
                    .json({
                        error: 'No orders placed yet'
                    })
            }
            res.json(order)
        })
}


exports.pushOrderInPurchaseList = (req,res,next) =>{

    let purchases = []
    req.body.order.products.forEach(items => {
            purchases.push({
                _id:items.id,
                name:items.name,
                description:items.description,
                category:items.category,
                quantity:items.quantity,
                amount:req.body.order.amount,
                transaction_id:req.body.order.transaction_id
            })
    })

    //Store to DB
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push: {purchases:purchases}},
        {new:true},
        (err,item) =>{
            if(err){
                return res.status(400).json({
                    error:'Unable to update items details'
                })
            }
            next();
        }
    )
}