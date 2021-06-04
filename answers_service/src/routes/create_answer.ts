import express,{Request,Response}  from 'express'

import {Answer} from '../db_model'

import {verifyToken,answer_limit} from '../utils'
const router = express.Router()


router.post('/create_answer',
  verifyToken,
  answer_limit,
   async (req : Request ,res : Response)=>{

    const answer = new Answer({
        answer_text:req.body.answer_text,
        question_title:req.body.question_title,
        question_user:req.body.question_user,
        answer_date:req.body.date,
        answered_by:req.body.answered_by
        })
    let answered = true
    await answer.save().catch(error => {
        answered=false 
      })
    if (answered) {return 'answer created'}
    else {return 'cannot create answer'}
    } 
    )


    


export {router as CreateAnswerRouter}