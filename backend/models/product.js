const mongoose = require('mongoose')
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema;

const productSchema = Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:30
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:ObjectId,
        ref:"Category",
        required:true
    },
    inventory:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    images:{
        data: Buffer,
        contentType:String
    }
},{
    timestamps:true
    
})


module.exports = mongoose.model('Product',productSchema)