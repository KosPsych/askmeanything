import express from 'express'
import {verifyToken, getUsername} from '../utils'
import {getQuestion} from '../db_utils'
const router = express.Router()

router.get('/question_view/:question_title',
    verifyToken,
    getUsername,
    async (req,res)=>{
        const title = req.params.question_title.replace(/-/g, " ")
        const question = await getQuestion(req.app.locals.username,title)
        res.send(question)
    })


export {router as QuestionviewRouter}