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
      const question = new Question({
        title:req.body.title,
        question_text:req.body.question_text,
        keywords:req.body.keywords,
        answers:[],
        question_date:req.body.question_date,
        username :req.body.username
      })
      let answered = true
      await question.save().catch(error => {
        answered=false 
      })
      
      if (answered) {return 'question created'}
      else {return 'cannot create question'}
      
       
    }   

async  function CreateAnswer (){
      const answer = new Answer({
        answer_id:"a_id",
        answer_text:"my answer text",
        question_id:"qid",
        answer_date:"XX-LL-2009",
        user :{
          uid:'uid',
          username:"zpower"
              }
      })
      await answer.save();
    }    
module.exports = {UpdUser,CreateQuestion,CreateUser,CreateAnswer,getUser}