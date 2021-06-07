
import {Question} from './db_model'
import  { Message }from 'node-nats-streaming';



export async function create_question(data:any,msg:Message) {
    const question = await Question.build({
        keywords:data.question.keywords,
        title:data.question.title,
        question_text:data.question.question_text,
        question_date:data.question.question_date,
        asked_by:data.question.asked_by,
        answers:[]
     })
     let answered=true
     const r = await question.save().catch(error => {
        answered=false 
      })
     
    if (answered) {
      msg.ack() 
      }  
 } 


export async function edit_question(data:any,msg:Message) {
    const query_res = await Question.updateOne(
                                    { 
                                        title: data.question_title, 
                                        asked_by:data.asked_by
                                    },
                                   {
                                     $set: 
                                        { title : data.new_question_title,
                                                  question_text: data.question_text,
                                                  keywords: data.keywords,
                                                __v: 1
                                        }
                                    })
    if (query_res.n==1) {msg.ack()}
 }

export async function add_answer(data:any,msg:Message) {
   
  const query_res = await Question.updateOne(
                                  { 
                                      title: data.answer.question_title, 
                                      asked_by:data.answer.question_user
                                  },
                                 {
                                   $push: 
                                      { answers : {"answer_text":data.answer.answer_text,"answered_by":data.answer.answered_by,answer_date:data.answer.answer_date}
                                      }
                                     
                                          })
                                            
 if (query_res.n==1) {msg.ack()}
} 

export async function edit_answer(data:any,msg:Message) {
  
  const query_res = await Question.updateOne(
                                  { 
                                      title: data.question_title, 
                                      asked_by:data.question_user,
                                      "answers.answered_by":`${data.answered_by}` 
                                      
                                  },
                                 {
                                  $set: { "answers.$.answer_text": data.answer_text }
                                     
                                          })
                                            
 if (query_res.n==1) {msg.ack()} 
 msg.ack()
}


export async function getQuestion (username?: string  ,title? : string ){
  if(!title && !username){
    const questions = await Question.find()
    return questions
  }
  if(title){
    const questions = await Question.find({asked_by:username,title:title})
    return questions
  }
  else{
    const questions = await Question.find({asked_by:username})
    return questions
  }
    
  
}  

 


