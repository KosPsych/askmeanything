import express,{Request,Response}  from 'express'
const jwt = require('jsonwebtoken')
import {User} from '../db_model'
const router = express.Router()
const secretToken = process.env.token

router.get('/get_user',
        verifyToken,
        async (req: Request, res: Response) => {
            const user = await User.build({
                username: req.body.username,
                password: req.body.password
            })
            // @ts-ignore
            const data = {user}
            res.send(JSON.stringify(data.user))

        });

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

export {router as GetUserRouter}