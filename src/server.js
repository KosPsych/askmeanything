const express = require('express')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
require('dotenv').config()

 
// Connect to DB
const URI = process.env.db_uri
const connectDB = async ()=>{
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected")
}

connectDB()
  
app.use(session({secret:'Keep it secret'
,name:'session_id'
,resave: true
,saveUninitialized:false}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','pug')
app.set('views','./src/views')
app.use(express.static('./src/public'))

require('./production')(app)
//Controllers , POST requests
require('./Controllers/signup_controller')(app)
require('./Controllers/signin_controller')(app)
require('./Controllers/create_question_controller')(app)
require('./Controllers/create_answer_controller')(app)
require('./Controllers/search_by_keyword')(app)
require('./Controllers/edit_question_controller')(app)

// direct access to model or plain html,GET requests
require('./direct_access/home')(app)
require('./direct_access/logout')(app)
require('./direct_access/login')(app)
require('./direct_access/signup')(app)
require('./direct_access/create_question')(app)
require('./direct_access/question_view')(app)
require('./direct_access/edit_question')(app)
require('./direct_access/profile')(app)
require('./direct_access/statistics')(app)
require('./direct_access/contact')(app)
require('./direct_access/browse_questions')(app)


app.listen(process.env.PORT || 3000,()=>console.log("listening"))

module.exports = app
  

