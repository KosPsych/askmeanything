const express = require('express')
const mongoose = require('mongoose')
const app = express()


// Connect to DB
const URI="mongodb+srv://dbUser:dbUser@cluster0.shluc.mongodb.net/MVCDatabase?retryWrites=true&w=majority"
const connectDB = async ()=>{
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected")
}

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./controllers/signup_controller')(app)
require('./controllers/signin_controller')(app)

  
app.listen(3000,()=>console.log("listening"))

module.exports = app
  

