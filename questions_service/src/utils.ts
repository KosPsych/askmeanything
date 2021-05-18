import {Request,Response}  from 'express'
const jwt = require('jsonwebtoken')
import {Question} from './db_model'

let secretToken = 'secret'
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


  export async function question_limit(req : Request, res : Response , next : Function) {
     const limit = await Question.find({asked_by:req.body.username,title:req.body.title})
     if (limit.length >0 ){
         res.send('cannot re-ask a question')
     }
     else{
         next()
     }
  }
