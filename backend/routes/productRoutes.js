const express = require('express')
const router = express.Router()
const {createProduct,getProductParamById,getProduct, image, deleteProduct, updateProduct, getAllProducts,getAllProdCategories} = require('../controllers/product')
const {isSignedIn ,isAuthenticated,isAdmin} = require('../controllers/auth')
const { getUserById} = require('../controllers/user')

//GET PARAMS
router.param("userId", getUserById)
router.param("productId", getProductParamById)


//Actual route

router.post('/product/create/:userId', isSignedIn ,isAuthenticated,isAdmin,createProduct)
router.get('/product/:productId',getProduct)
router.get('/product/image/:productId',image)
router.get('/products',getAllProducts)
router.get('product/categories',getAllProdCategories)

//update & delete product

router.delete('/product/:productId/:userId',isSignedIn ,isAuthenticated,isAdmin,deleteProduct)

router.put('/product/:productId/:userId',isSignedIn ,isAuthenticated,isAdmin,updateProduct)

module.exports = router