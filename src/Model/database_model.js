const mongoose=require('mongoose')


const UserSchema = new mongoose.Schema({
    name:String,
    surname:String,
    username:String,
    password:String,
    email:String,
  })

const QuestionSchema = new mongoose.Schema({
    title : String,
    question_text : String,
    keywords : Array,
    answers : Array,
    question_date : String,
    asked_by : String
  })

const AnswerSchema = new mongoose.Schema({
    answer_text:String,
    question_title:String,
    question_user:String,
    answer_date:String,
    answered_by:String
  })


const Question = mongoose.model('Questions',QuestionSchema)
const User = mongoose.model('Users',UserSchema)
const Answer = mongoose.model('Answers',AnswerSchema)
  

module.exports = {User,Answer,Question};