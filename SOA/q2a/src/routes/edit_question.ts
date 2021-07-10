import express,{Request,Response}  from 'express'
import {Question} from '../db_model'
//import {natsclient} from '../nats-client'
import {verifyToken, getUsername} from '../utils'
const router = express.Router()


router.post('/edit_question',
    verifyToken,
    getUsername,
    async (req : Request ,res : Response)=>{
        const query_res = await Question.updateOne(
            { title: req.body.question_title, asked_by:req.app.locals.username},
            {
                $set: { title : req.body.new_question_title,
                    question_text: req.body.question_text,
                    keywords: req.body.keywords,
                    __v: 1
                }
            }
        )
        if (query_res.n==1){
            const data = JSON.stringify({
                new_question_title:req.body.new_question_title,
                question_title:req.body.question_title,
                question_text: req.body.question_text,
                keywords: req.body.keywords,
                asked_by:req.app.locals.username
            })
            res.send('question edited')
        }
        else{
            res.send('error in question editing')
        }

    })

export {router as EditQuestionRouter}
