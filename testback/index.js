const express = require('express');   //Import Express
const app = express();  //Use Express

app.get('/',(req,res)=>{
    res.send('Welcome to MERN BOOTCAMP')
})

app.get('/admin',(req,res)=>{
    res.send('This is admin')
})

app.listen(3000 ,() => (
    console.log('Server up and running on port : 3000' )
))


