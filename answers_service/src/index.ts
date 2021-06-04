import express from 'express'

const mongoose = require('mongoose')
require('dotenv').config()


import {CreateAnswerRouter} from './routes/create_answer'
import {EditAnswerRouter} from './routes/edit_answer'

const URI= process.env.db_uri
const connectDB = async ()=>{
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected to answers db")
}

connectDB()

const app = express()
app.use(express.json())
app.use(CreateAnswerRouter)
app.use(EditAnswerRouter)

app.listen(4002, ()=>{
    console.log('listening for auth on 4002..')
})



