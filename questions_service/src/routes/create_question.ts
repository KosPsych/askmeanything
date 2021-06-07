import express,{Request,Response}  from 'express'
import {Question} from '../db_model'
import {natsclient} from '../nats-client'
import {verifyToken,question_limit} from '../utils'
const router = express.Router()


router.post('/create_question',
  verifyToken,
  question_limit,
   async (req : Request ,res : Response)=>{
     const question = await Question.build({
      keywords:req.body.keywords,
      title:req.body.title,
      question_text:req.body.question_text,
      question_date:req.body.question_date,
      asked_by:req.body.asked_by
   })

   let answered = true
   await question.save().catch(error => {
         answered=false 
       })
   if (answered) {
     const data = JSON.stringify({question})
     natsclient.client.publish('question:created',data)
     res.send('question created')
    }
   else {res.send('error while creating question')}
    
  })


    


export {router as CreateQuestionRouter}