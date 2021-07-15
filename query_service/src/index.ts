import express,{Request,Response} from 'express'
const mongoose = require('mongoose')
require('dotenv').config()
//const cors = require('cors')
import {natsclient} from './nats-client'
import {ProfileRouter} from './routes/profile'
import {QuestionviewRouter} from './routes/question_view'
import {StatisticsRouter} from './routes/statistics'
import {HomeRouter} from './routes/home'
const URI=process.env.db_uri

const connectDB = async ()=>{  
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  await natsclient.connect('questions','qid3',"http://nats-srv:4222")
  console.log("connected to query db")
  natsclient.listen()
}

connectDB()


const app = express()
app.use(express.json())
//app.use(cors({origin: 'http://localhost:3000'}));
app.use(ProfileRouter)
app.use(QuestionviewRouter)
app.use(StatisticsRouter)
app.use(HomeRouter)

app.listen(4003, ()=>{
    console.log('listening for queries on 4003..')
})
