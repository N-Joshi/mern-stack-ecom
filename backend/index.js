require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')


//DB Connection
mongoose.connect(process.env.DATABASE_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Db Connected')
    }).catch((err) => {
        console.log(err)
    })

//Middlewares
app.use(bodyParse.json())
app.use(cookieParser())
app.use(cors())

//Routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)


//Express Connection Server
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server Running on ${port}`)
})