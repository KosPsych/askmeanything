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

 

async  function getUser (username){
      const users = await User.find({username:username})
      return users
  }    
    
async  function CreateQuestion (req){
      const currentdate = new Date()
      const question = new Question({
        title:req.body.title,
        question_text:req.body.question_text,
        keywords:req.body.keywords.split(","), 
        question_date:currentdate.getDate() + "-" + (currentdate.getMonth()+1) + "-" + currentdate.getFullYear(),
        asked_by :req.session.username
      })
      let answered = true
      await question.save().catch(error => {
        answered=false 
      })
      
      if (answered) {return 'question created'}
      else {return 'cannot create question'}
      
       
    }   

async  function getQuestion (username,title){
   
      if (!title && !username){
        const questions = await Question.find()
        return questions
      }  

      if (title) {
        const questions = await Question.find({asked_by:username,title:title})
        return questions
      }
      else{
        const questions = await Question.find({asked_by:username})
        return questions

      }
      
      
  }  
  
async function getQuestionByKeyword (foo) {
  const questions = await Question.find({keywords: foo})
  console.log(questions)
  let empty = false
  if (questions.length <=0)
      empty = true
  if (empty) return "No Results Found"
  else return questions
}

async  function UpdateQuestion (question_title,name,question_text,keywords){
     console.log(question_title,name,question_text,keywords)
     await Question.updateMany(
     { title: question_title, asked_by:name},
    {
      $set: { question_text: question_text,
              keywords: keywords,
               __v: 1
          }
     
    }
 )
 return 'question updated'
}

async  function CreateAnswer (req){
      
      const currentdate = new Date()
      const answer = new Answer({
        answer_text:req.body.answer_text,
        question_title:req.body.question_title,
        question_user:req.body.question_user,
        answer_date:currentdate.getDate() + "-" + (currentdate.getMonth()+1) + "-" + currentdate.getFullYear(),
        answered_by:req.session.username
        })
      let answered = true
      const ans = await answer.save().catch(error => {
        answered=false 
      })
      if (answered) {return 'answer created'}
      else {return 'cannot create answer'}
    } 
    
    async  function getAnswers (username,title){ 
      if (title){
        const answers = await Answer.find({answered_by:username,question_title:title})
        return answers
      }
      else{
        const answers = await Answer.find({answered_by:username})
        return answers
      }
      
  }     
module.exports = {CreateQuestion,CreateUser,CreateAnswer,getUser,getQuestion,UpdateQuestion,getAnswers, getQuestionByKeyword,UpdateQuestion}
