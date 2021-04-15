const mongoose=require('mongoose')


const UserSchema = new mongoose.Schema({
    name:String,
    surname:String,
    username:String,
    password:String,
    email:String,
    questings:Array,
    answers:Array
  
  })

const QuestionSchema = new mongoose.Schema({
    title:String,
    question_text:String,
    keywords:Array,
    answers:Array,
    question_date:String,
    user :{
      uid:String,
      username:String
    }
  })

const AnswerSchema = new mongoose.Schema({
    answer_id:String,
    answer_text:String,
    question_id:String,
    answer_date:String,
    user :{
      uid:String,
      username:String
    }
  })


const Question = mongoose.model('Questions',QuestionSchema)
const User = mongoose.model('Users',UserSchema)
const Answer = mongoose.model('Answers',AnswerSchema)
  

module.exports = {User,Answer,Question};