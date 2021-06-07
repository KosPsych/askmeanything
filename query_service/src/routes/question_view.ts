import express from 'express'
import {verifyToken} from '../utils'
import {getQuestion} from '../db_utils'
const router = express.Router()




router.get('/question_view/:question_title',
   verifyToken,
   async (req,res)=>{  
    const title = req.params.question_title.replace(/-/g, " ")
    const question = await getQuestion(req.body.asked_by,title)
    res.send(question)    
  })


    


export {router as QuestionviewRouter}