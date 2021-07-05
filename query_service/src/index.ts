import express,{Request,Response} from 'express'
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
import {natsclient} from './nats-client'
import {ProfileRouter} from './routes/profile'
import {QuestionviewRouter} from './routes/question_view'
import {StatisticsRouter} from './routes/statistics'
const URI=process.env.db_uri

const connectDB = async ()=>{  
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected to query db")
}

connectDB()


const app = express()
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}));
app.use(ProfileRouter)
app.use(QuestionviewRouter)
app.use(StatisticsRouter)

app.listen(4003, ()=>{
    console.log('listening for queries on 4003..')
})
