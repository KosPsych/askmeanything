import express from 'express'
const mongoose = require('mongoose')
require('dotenv').config()

import {CreateQuestionRouter} from './routes/create_question'
import {EditQuestionRouter} from './routes/edit_question'

const URI=process.env.db_uri
const connectDB = async ()=>{
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected to questions db")
}

connectDB()



const app = express()
app.use(express.json())
app.use(CreateQuestionRouter)
app.use(EditQuestionRouter)

app.listen(4001, ()=>{
    console.log('listening for questions on 4001...')
})



