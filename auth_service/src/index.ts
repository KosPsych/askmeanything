import express from 'express'
import {json} from 'body-parser'
const mongoose = require('mongoose')

import {SignupRouter} from './routes/signup'
import {SigninRouter} from './routes/signin'

const URI="mongodb+srv://dbUser:dbUser@cluster0.shluc.mongodb.net/auth_service_db?retryWrites=true&w=majority"
const connectDB = async ()=>{
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected to auth db")
}

connectDB()



const app = express()
app.use(express.json())

app.use(SignupRouter)
app.use(SigninRouter)

app.listen(4000, ()=>{
    console.log('listening for auth on 4000..')
})



