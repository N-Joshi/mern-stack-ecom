const { request } = require("express")
const { Order, CartProduct } = require("../models/order")

exports.getOrderParamById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err) {
                res.status(400).json({ error: 'No order found !!' })
            }
            req.order = order
            next()
        })
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err, order) => {
        if (err) {
            res.status(400).json({ error: 'Unable to save order' })
        }
        res.json(order)
    })
}

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate("uesr", "_id name")
        .exec((err, orders) => {
            if (err) {
                res.status(400).json({ error: 'Unable to get orders' })
            }
            res.json(orders)
        })
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: request.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "Cannot update order"
                })
            }
            res.json(order)
        })
}