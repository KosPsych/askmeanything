const {User,Answer,Question}= require('./Model.js')


async  function CreateUser (req){

    const user = new User({
     username:req.body.username,
     name:req.body.name,
     surname:req.body.surname,
     password:req.body.password,
     email:req.body.email,
     questings:[],
     answers:[]
    })
    await user.save();
    return 'successful sign up'
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
    
async  function CreateQuestion (){
      const question = new Question({
        title:"Q1",
        question_text:"this is question 1",
        keywords:['key1','key2'],
        answers:['A_id1'],
        question_date:"XX-LL-2009",
        user :{
          uid:'uid',
          username:"zpower"
        }
      })
      await question.save();
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