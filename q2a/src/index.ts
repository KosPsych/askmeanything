// @ts-ignore
import express from 'express'
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
import {CreateQuestionRouter} from './routes/create_question'
import {EditQuestionRouter} from './routes/edit_question'
import {CreateAnswerRouter} from './routes/create_answer'
import {EditAnswerRouter} from './routes/edit_answer'
import {ProfileRouter} from './routes/profile'
import {QuestionviewRouter} from './routes/question_view'
import {StatisticsRouter} from './routes/statistics'
import {HomeRouter} from './routes/home'
import {GetAnswersRouter} from './routes/get_answer'
const URI=process.env.db_uri

const connect = async ()=>{
    await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
    console.log("connected to q2a_SOA db")
}

connect()



const app = express()
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}));
app.use(CreateQuestionRouter)
app.use(EditQuestionRouter)
app.use(CreateAnswerRouter)
app.use(EditAnswerRouter)
app.use(ProfileRouter)
app.use(QuestionviewRouter)
app.use(StatisticsRouter)
app.use(HomeRouter)
app.use(GetAnswersRouter)

app.listen(4001, ()=>{
    console.log('q2a service listening on 4001...')
})
