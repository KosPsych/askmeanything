import express from 'express'
const mongoose = require('mongoose')
require('dotenv').config()
import nats from 'node-nats-streaming'
import {CreateQuestionRouter} from './routes/create_question'
import {EditQuestionRouter} from './routes/edit_question'

import {natsclient} from './nats-client'

const URI=process.env.db_uri
const connect = async ()=>{
  await natsclient.connect('questions','qid',"http://localhost:4222")
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected to questions db")
}

connect()



/*
stan.on('connect',()=>{
  console.log('connected to nats')

  const data = JSON.stringify({
    id:'123'
  })
  stan.publish('question:edited',data)
})
*/


const app = express()
app.use(express.json())
app.use(CreateQuestionRouter)
app.use(EditQuestionRouter)

app.listen(4001, ()=>{
    console.log('listening for questions on 4001...')
})



