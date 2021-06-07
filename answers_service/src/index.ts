import express from 'express'
const mongoose = require('mongoose')
require('dotenv').config()
import {natsclient} from './nats-client'
import {CreateAnswerRouter} from './routes/create_answer'
import {EditAnswerRouter} from './routes/edit_answer'

const URI= process.env.db_uri

const connect = async ()=>{
  await natsclient.connect('questions','qid2',"http://nats-srv:4222")
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected to answers db")
  natsclient.listen() //start subscription
}


connect()

const app = express()
app.use(express.json())
app.use(CreateAnswerRouter)
app.use(EditAnswerRouter)

app.listen(4002, ()=>{
    console.log('listening for auth on 4002..')
})



