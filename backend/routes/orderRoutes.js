const express = require('express')
const router = express.Router()
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user')
const { updateInventory } = require('../controllers/product')

const { getOrderParamById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order")

//Params
router.param("userId", getUserById)
router.param("orderId", getOrderParamById)

//Read
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

//Create
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateInventory, createOrder)

//Update Orders/Order-Status
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)

router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus)


module.exports = router