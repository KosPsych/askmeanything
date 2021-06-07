import {Request,Response}  from 'express'
const jwt = require('jsonwebtoken')


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