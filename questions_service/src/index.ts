import express from 'express'
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
import {CreateQuestionRouter} from './routes/create_question'
import {EditQuestionRouter} from './routes/edit_question'


const URI=process.env.db_uri
const connect = async ()=>{
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected to questions db")
}

connect()



const app = express()
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}));
app.use(CreateQuestionRouter)
app.use(EditQuestionRouter)

app.listen(4001, ()=>{
    console.log('listening for questions on 4001...')
})



