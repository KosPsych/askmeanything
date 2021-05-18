import express from 'express'
import {json} from 'body-parser'
const mongoose = require('mongoose')


import {CreateQuestionRouter} from './routes/create_question'

const URI="mongodb+srv://dbUser:dbUser@cluster0.shluc.mongodb.net/questions_service_db?retryWrites=true&w=majority"
const connectDB = async ()=>{
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected")
}

connectDB()



const app = express()
app.use(express.json())


app.use(CreateQuestionRouter)




app.listen(3001, ()=>{
    console.log('listening')
})


