import express,{Request,Response}  from 'express'

import {Question} from '../db_model'
import {natsclient} from '../nats-client'
import {verifyToken} from '../utils'
const router = express.Router()


router.post('/edit_question',
  verifyToken,
  async (req : Request ,res : Response)=>{
  await Question.updateMany(
    { title: req.body.question_title, asked_by:req.body.asked_by},
   {
     $set: { title : req.body.new_question_title,
             question_text: req.body.question_text,
             keywords: req.body.keywords,
              __v: 1
     }
   }
    )
  const data = JSON.stringify({
      new_question_title:req.body.new_question_title,
      question_title:req.body.question_title,
      question_text: req.body.question_text,
      keywords: req.body.keywords,
      asked_by:req.body.asked_by
    })  
  natsclient.client.publish('question:edited',data)
  res.send('question edited')
    
  })

export {router as EditQuestionRouter}