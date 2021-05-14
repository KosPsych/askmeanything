const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Connect to DB
const URI="mongodb+srv://dbUser:dbUser@cluster0.shluc.mongodb.net/MVCDatabase?retryWrites=true&w=majority"
const connectDB = async ()=>{
  await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
  console.log("connected")
}

connectDB()
console.log("not connected")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','pug')
app.set('views','./src/views')


//Controllers , post requests
require('./src/Controllers/signup_controller')(app)
require('./src/Controllers/signin_controller')(app)
require('./src/Controllers/create_question_controller')(app)
require('./src/Controllers/create_answer_controller')(app)

require('./src/Controllers/search_by_keyword')(app)


// direct access to model or plain html
app.get('/login', (req, res) => {
  res.render('login',{status:''})
})

app.get('/', (req, res) => {
  res.render('home',{status:''})
})

app.listen(3000,()=>console.log("listening"))

module.exports = app
  

