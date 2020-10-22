const express = require('express')
const router = express.Router()
const {getCategoryById ,createCategory,getCategoryParamById , getCategories , updateCategory,deleteCategory} = require('../controllers/category')
const {isSignedIn ,isAuthenticated,isAdmin} = require('../controllers/auth')
const { getUserById} = require('../controllers/user')

//GET PARAMS
router.param("userId", getUserById)
router.param("categoryId", getCategoryParamById)


//CREATE CATEGORY
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)


//GET CATEGORIES
router.get("/category/:categoryId" , getCategoryById)
router.get("/categories",getCategories)

//UPDATE CATEGORY
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin, updateCategory)

//BYE BYE CATEGORY
router.delete('/category/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin, deleteCategory)


module.exports = router