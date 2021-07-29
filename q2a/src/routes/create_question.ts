import express,{Request,Response}  from 'express'
import {Question} from '../db_model'
import {verifyToken,question_limit, getUsername} from '../utils'
const router = express.Router()
const axios = require('axios');


router.post('/create_question',
    verifyToken,
    question_limit,
    getUsername,
    async (req : Request ,res : Response, next : Function)=>{
        // @ts-ignore
        console.log(req.app.locals.middle1)
        const question = await Question.build({
            keywords:req.body.keywords,
            title:req.body.title,
            question_text:req.body.question_text,
            question_date:req.body.question_date,
            asked_by:req.app.locals.username,
        })

        let answered = true
        await question.save().catch(error => {
            answered=false
        })
        if (answered) {
            const data = JSON.stringify({question})
            res.send(data)
        }
        else {res.send('error while creating question')}

    })

export function getUser(req : Request, res : Response , next : Function) {
    const token = req.headers['x-observatory-auth']
    const options = {
        url: 'http://localhost:4000/get_user',
        method: 'GET',
        headers: {'x-observatory-auth': token}
    }
    axios(options).then((res: { data: any; }) => {
        const username1 = res.data
        console.log(res.data)
    });

    next();

}





export {router as CreateQuestionRouter}
