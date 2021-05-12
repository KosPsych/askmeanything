const express = require('express')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')

const {getQuestion,getAnswers,getUser} = require('./src/Model/database_utils.js')

// Connect to DB
const URI="mongodb+srv://dbUser:dbUser@cluster0.shluc.mongodb.net/MVCDatabase?retryWrites=true&w=majority"
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


//Controllers , post requests
require('./src/Controllers/signup_controller')(app)
require('./src/Controllers/signin_controller')(app)
require('./src/Controllers/create_question_controller')(app)
require('./src/Controllers/create_answer_controller')(app)


//direct access to model or plain html pages , get requests

app.get('/login', (req, res) => {
  res.render('login',{status:''})
})

app.get('/', (req, res) => {
  res.render('home',{name :req.session.username, loggedin : req.session.loggedIn})
})

app.get('/logout',(req,res)=>
{
req.session.destroy((err)=>{})
res.redirect('/') 
})

app.get('/signup', (req, res) => {
  if (req.session.loggedIn){
    res.redirect('/') 
  }
  else{
    res.render('signup',{status:''})
  }
})

app.get('/create_question', (req, res) => {
  if (req.session.loggedIn){
    res.render('create_question',{status : '',name :req.session.username , loggedin : req.session.loggedIn})
  }
  else{
    res.redirect('/login') 
  }
})

app.get('/question_view/:question_id', async (req,res)=>
{
  let title = req.params.question_id.replace(/-/g, " ")
  const question = await getQuestion(req.query.askedby,title)
  const answers = await getAnswers(req.query.askedby,title)
  res.render('question',{question:question[0],answers:answers,name :req.session.username , loggedin : req.session.loggedIn})
})

app.get('/profile', async (req, res) => {
  const questions = await getQuestion(req.session.username)
  const answers = await getAnswers(req.session.username)
  const user = await getUser(req.session.username)
  res.render('profile',{questions :questions, answers : answers,user:user[0],name :req.session.username , loggedin : req.session.loggedIn})
})


app.listen(3000,()=>console.log("listening"))

module.exports = app
  

