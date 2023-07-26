const express = require('express')
const mongoose = require('mongoose')
// const app = express()

const router = require("./routes/BookRoute");

const app = express()

// middleware
app.use(express.json())

app.use("/books",router)

// app.use(express.json())

mongoose.connect("mongodb+srv://bharath:bharath@cluster0.w1gr51t.mongodb.net/bookstore?retryWrites=true&w=majority"
).then(()=>{
console.log('connected to db ')
})
.then(()=>{
    app.listen(5001)
})
.catch((err)=>{
    console.log(err)
})

