import express from 'express'
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
import {SignupRouter} from './routes/signup'
import {SigninRouter} from './routes/signin'

const URI=process.env.db_uri
const connectDB = async ()=>{
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected to auth db")
}

connectDB()



const app = express()
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}));
app.use(SignupRouter)
app.use(SigninRouter)

app.listen(4000, ()=>{
    console.log('listening for auth on 4000..')
})



