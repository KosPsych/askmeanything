import express,{Request,Response}  from 'express'
const bcrypt = require('bcrypt')
import {User} from '../db_model'

import {Password} from '../password'


const router = express.Router()

router.post('/signup',async (req : Request, res : Response)=>{

    
    const hashed_password  = await  Password.toHash(req.body.password)
    const users = await User.find({username:req.body.username})
    if (users.length >0){
        res.send('username already exists')
    }
    else{
       const user = await User.build({
           username : req.body.username,
           name :req.body.user,
           surname :req.body.surname,
           password :hashed_password,
           email:req.body.email
       })
        
       let answered = true
       await user.save().catch(error => {
         answered=false 
       })
       if (answered) {res.send('user created')}
       else {res.send('error while creating user')}
       }
})

export {router as SignupRouter}