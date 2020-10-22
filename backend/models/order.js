const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema

const productCartSchema = Schema({
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    name: String,
    count: Number,
    price: Number
})


const orderSchema = Schema({
    products: [productCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Processing", "Shipped", "Received"]
    },
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})


const Order = mongoose.model('Order', orderSchema)
const CartProduct = mongoose.model('CartProduct', productCartSchema)


module.exports = { Order, CartProduct }