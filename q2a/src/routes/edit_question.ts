import express,{Request,Response}  from 'express'
import {Question, Answer} from '../db_model'
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
            
            await Answer.updateMany(
            { question_title: req.body.question_title,
              question_user:req.body.asked_by
            },

            {
                $set: { question_title: req.body.new_question_title,
                    __v: 1
                }
            })
            
        }
        else{
            res.send('error in question editing')
        }
        

    })

export {router as EditQuestionRouter}
