const express = require('express')
const mongoose = require('mongoose')
const cors =require('cors')
// const app = express()

const router = require("./BookRoute");

const app = express()

app.use(cors({
  origin: 'http://localhost:5173'
}));

// middleware
app.use(express.json())

app.use("/books",router)

// app.use(express.json())

const connectDB = async ()=>{
   try{
     await mongoose.connect("mongodb+srv://penkybharath:penkybharath@cluster0.l1d1qzf.mongodb.net/BookStoreDB"); //  no symbols like < @
    console.log("Connected to DB Successfully")
   }
   catch(err){
    console.error("DB Error:", err);
    process.exit(1) ; // stops the  server
   }

}
connectDB();
app.get("/" , (req,res)=>{
    res.send("Server Running ..!");

})

app.listen(5000, ()=>{
    console.log(`Server running on port 5000}`)
})
