const bcrypt = require('bcrypt')
const {User,Answer,Question}= require('./database_model.js')


async  function CreateUser (req){

  const hashed_password = await bcrypt.hash(req.body.password,10)
  const user = new User({
      username:req.body.username,
      name:req.body.name,
      surname:req.body.surname,
      password:hashed_password,
      email:req.body.email,
      questings:[],
      answers:[]  })

  let answered = true
  await user.save().catch(error => {
    answered=false 
  })
  if (answered) {return 'successful sign up'}
  else {return 'unsuccessful in sign up'}    
  }
  
 
  
async  function UpdUser (){
        await User.updateOne(
        { name: "Nick" },
        {
          $set: { "password": "LL"}
        }
     )
    }

async  function getUser (username){
      const users = await User.find({username:username})
      return users
  }    
    
async  function CreateQuestion (req){
      const currentdate = new Date();
      const question = new Question({
        title:req.body.title,
        question_text:req.body.question_text,
        keywords:req.body.keywords.split(","),
        answers:[],
        question_date:currentdate.getDate() + "-" + currentdate.getMonth() + "-" + currentdate.getFullYear(),
        username :req.session.username
      })
      let answered = true
      await question.save().catch(error => {
        answered=false 
      })
      
      if (answered) {return 'question created'}
      else {return 'cannot create question'}
      
       
    }   

async  function getQuestion (username,title){
      
      const questions = await Question.find({username:username,title:title})
      return questions
  }  
  
async  function UpdateQuestion (question_title,name,answer_id){
    const x = await Question.updateOne(
     { title: question_title, username:name },
    {
      $push: { "answers": 'answer_id'}
    }
 )
 return
}

async  function CreateAnswer (req){
      const answer = new Answer({
        answer_text:req.body.answer_text,
        question_title:req.body.question_title,
        question_user:req.body.question_user,
        answer_date:req.body.answer_date,
        username:req.body.username
        })
      let answered = true
      const ans = await answer.save().catch(error => {
        answered=false 
      })
      if (answered) {return ['answer created',ans._id]}
      else {return ['cannot create answer',null]}
    }    
module.exports = {UpdUser,CreateQuestion,CreateUser,CreateAnswer,getUser,getQuestion,UpdateQuestion}