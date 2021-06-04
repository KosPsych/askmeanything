import {Request,Response}  from 'express'
const jwt = require('jsonwebtoken')
import {Answer} from './db_model'

let secretToken = process.env.token

export function verifyToken(req : Request, res : Response , next : Function) {

    const token = req.headers['x-observatory-auth']
    if (!token)  res.send('Missing Token')
    else{

        jwt.verify(token, secretToken, (err : Error, user : string) => {
            if (err) res.status(401).send('Not Authorized')
            else {req.body.username = user
            next()
            }
        })
    }
  }



export async function answer_limit(req : Request, res : Response , next : Function) {
    const limit = await Answer.find({question_title:req.body.question_title,question_user:req.body.question_user,answered_by:req.body.answered_by})
    if (limit.length >0 ){
        res.send('already answered')
    }
    else{
        next()
    }
 }

