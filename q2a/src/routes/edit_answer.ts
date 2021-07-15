import express,{Request,Response}  from 'express'
import {Answer} from '../db_model'
import {verifyToken, getUsername} from '../utils'
const router = express.Router()


router.post('/edit_answer',
    verifyToken,
    getUsername,
    async (req : Request ,res : Response)=>{
        const query_res = await Answer.updateOne(

            { question_title: req.body.question_title,
                question_user:req.body.question_user,
                answered_by:req.app.locals.username
            },

            {
                $set: { answer_text: req.body.answer_text,
                    __v: 1
                }
            })
        if (query_res.n>0){
            const data = JSON.stringify({
                question_title:req.body.question_title,
                question_user:req.body.question_user,
                answered_by:req.app.locals.username,
                answer_text: req.body.answer_text
            })
            res.send('answer edited')
        }
        else{
            res.send('an error occured')
        }

    })

export {router as EditAnswerRouter}
