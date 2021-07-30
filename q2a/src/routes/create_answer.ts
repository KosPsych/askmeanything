import express,{Request,Response}  from 'express'
import {Answer} from '../db_model'
import {verifyToken,answer_limit, getUsername} from '../utils'
const router = express.Router()
const axios = require('axios');

router.post('/create_answer',
    verifyToken,
    answer_limit,
    getUsername,
    async (req : Request ,res : Response)=>{
        const answer = new Answer({
            answer_text:req.body.answer_text,
            question_id: req.body.question_id,
            question_title:req.body.question_title,
            question_user:req.body.question_user,
            answer_date:req.body.answer_date,
            answered_by:req.app.locals.username
        })
        let answered = true
        await answer.save().catch(error => {
            answered=false
        })
        if (answered) {
            const data = JSON.stringify({answer})
            res.send('answer created')
        }
        else {res.send('cannot create answer')}
    }
)


export {router as CreateAnswerRouter}
