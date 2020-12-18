const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const product = require('../models/product')
const { result } = require('lodash')


exports.getProductParamById = (req,res,next,id) => {
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            res.status(400).json({error:'No product found !!'})
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req,res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            res.status(400).json({error:'Error Uploading file !!'})
        } 

        //destructre fields
        console.log(fields)
        const {name,price,description,inventory,category} = fields;
        if(
            !name ||
            !price || 
            !description ||
            !category || 
            !inventory
        ){
            
            return res.status(400).json({
                error:'Please include all the fields'
            })
        }


        let product = new Product(fields)
        if(file.images){
            if(file.images.size > 3000000){
                return res.status(400).json({error:'File size to big'})
            }
            
            product.images.data = fs.readFileSync(file.images.path)
            product.images.contentType = file.images.type
        }

        product.save((err,product) =>{
            if(err){
                return res.status(400).json({error:'Cannot save the product'})
            }
            res.json(product)
        })
    })    
}

exports.getProduct = (req,res) =>{
    req.product.photo = undefined
    return  res.json(req.product)
}

//middleware for image loading
exports.image = (req,res,next)=>{
    if(req.product.images.data){
        res.set("Content-Type",req.product.images.contentType)
        return res.send(req.product.images.data)
    }
    next()
}


exports.deleteProduct = (req,res) =>{
    const product = req.product
    product.remove((err,product)=>{
        if(err){
            res.status(400).json({error:'Unable to  delete product !!'})
        }
        res.json({
            message:"Product Successfully Deleted"
        })
    })
}

exports.updateProduct = (req,res)=>{

    let form = formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            res.status(400).json({error:'Error Uploading file !!'})
        } 

        //destructre fields
        console.log(fields)
        
        let product = req.product
        product = _.extend(product,fields) //it extends and update the fields of the products 

        if(file.images){
            if(file.images.size > 3000000){
                return res.status(400).json({error:'File size to big'})
            }
            
            product.images.data = fs.readFileSync(file.images.path)
            product.images.contentType = file.images.type
        }

        product.save((err,updatedProduct) =>{
            if(err){
                return res.status(400).json({error:'Cannot update the product'})
            }
            res.json(updatedProduct)
        })
    })    
}


exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-images")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            res.status(400).json({error:'No Products found !!'})
        }
        res.json(products)
    })
}

exports.updateInventory = (req,res,next) => {

    let cart = req.body.order.products.map(prod=>{
        return {
            filter: {_id:prod._id},
            update: {$inc:{inventory: - prod.count, sold: + prod.count}}
        }
    })

    Product.bulkWrite(cart,{},(err,result) => {
        if(err){
            res.status(400).json({error:'Inventory Update Failed !!'})
        }
        res.json(result)
        next()
    })
}

exports.getAllProdCategories = (req,res) =>{
    Product.distinct('category',{},(err,category)=> {
        if(err){
            res.status(400).json({error:'No Categories Found'})
        }
        res.json(category)
    })
}
