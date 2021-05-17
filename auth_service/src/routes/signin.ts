import express,{Request,Response}  from 'express'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import {User} from '../db_model'
import {Password} from '../password'

const router = express.Router()
const secretToken = 'secret'
async function authentication(req :Request, res :Response, next : Function){
    const user = await User.find({username:req.body.username})
    if (user.length == 0) {res.send('incorrect username') }
    else
      {
        const same = await Password.compare(user[0].password,req.body.password)
        if(!same){
            res.send('wrong password')
        }
        else{
            next()
        }
        
      }   
}  

router.post('/login',
   authentication,
   async (req,res)=>{
    let user_access_token = jwt.sign(req.body.username, secretToken)
    res.json({'token' : user_access_token }) 
      
  })


    


export {router as SigninRouter}