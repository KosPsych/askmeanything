const express = require('express')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
const path = require('path');
const fetch = require("node-fetch");



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
app.use(express.static('public'))

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
/*
app.get('/login', (req, res) => {
  res.render('login',{status:''})
})


app.get('/', (req, res) => {
  res.render('home',{name :req.session.username ,loggedin : req.session.loggedIn})
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
    res.render('create_question',{status : '',name :req.session.username })
  }
  else{
    res.redirect('/login') 
  }
})

app.get('/question_view/:question_id', async (req,res)=>
{
  let url = req.url
  let asked_by = url.slice(url.lastIndexOf('?')+9)
  let whole = url.slice(url.lastIndexOf('/')+1)
  let title = whole.replace(url.slice(url.lastIndexOf('?')), '').replace("-", " ")

  
  const question = await getQuestion(asked_by,title)
  const answers = await getAnswers(asked_by,title)
  res.render('question',{question:question[0],answers:answers,name :req.session.username })
  
})


app.get('/edit_question', async (req,res)=>{
  if (req.session.loggedIn){
       if (req.query.asked_by && req.query.question_title ){
          const question = await getQuestion(req.query.asked_by,req.query.question_title)
          const question_body = question[0].question_text
          const keywords = question[0].keywords.join()
          res.render('edit_question',{question_body:question_body,keywords :keywords ,name :req.session.username,title : question[0].title })
         }
       else{
        res.redirect('/') 
       }
  }
  else{
       res.redirect('/login') 
  }
  
      })
      

app.get('/profile', async (req, res) => {
  if (req.session.loggedIn){
      const questions = await getQuestion(req.session.username)
      const answers = await getAnswers(req.session.username)
      const user = await getUser(req.session.username)
      res.render('profile',{questions :questions, answers : answers,user:user[0],name :req.session.username })
  }
  else{
      res.redirect('/login') 
  }
})

app.get('/statistics', async (req, res) => {

  const questions = await getQuestion()
  result= Statistics(questions)
  res.render('charts',{keys:result.keys,
                        values:result.values,
                        name :req.session.username,
                        loggedin : req.session.loggedIn,
                        question_keys:result.question_keys,
                        question_values:result.question_values})


})

*/

app.listen(3000,()=>console.log("listening"))

module.exports = app
  

