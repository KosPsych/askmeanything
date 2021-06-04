import express,{Request,Response}  from 'express'

import {Question} from '../db_model'

import {verifyToken} from '../utils'
const router = express.Router()


router.post('/edit_question',
  verifyToken,
  async (req : Request ,res : Response)=>{
  await Question.updateMany(
    { title: req.body.title, asked_by:req.body.username},
   {
     $set: { question_text: req.body.question_text,
             keywords: req.body.keywords,
              __v: 1
     }
   }
    )
  res.send('question edited')
    
  })

export {router as EditQuestionRouter}