import express from 'express'
import {getAnswers} from '../db_utils'
const router = express.Router()

router.get('/get_answers/:question_title',
    async (req, res) => {
        const title = req.params.question_title.replace(/-/g, " ")
        const answers = await getAnswers(req.app.locals.username,title)
        res.send(answers)
    })

router.get('/get_answers',
    async (req, res) => {
        const answers = await getAnswers()
        res.send(answers)
    })

export {router as GetAnswersRouter}