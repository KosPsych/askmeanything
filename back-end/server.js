const express = require('express')
const mongoose=require('mongoose')
const app=express()
const {CreateQuestion,CreateUser,UpdUser,CreateAnswer,getUser} = require('./DB_utils.js')



// Connect to DB
const URI="mongodb+srv://dbUser:dbUser@cluster0.shluc.mongodb.net/MVCDatabase?retryWrites=true&w=majority"
const connectDB = async ()=>{
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected")
}

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup',async (req,res)=>{
  const exists = await getUser(req.body.username)
  if (exists.length == 1){res.send(402,'username already exists')}
  

  const ret = await CreateUser(req)  
  res.send(200,ret)

    
})
  
app.listen(3000,()=>console.log("listening"))
  

