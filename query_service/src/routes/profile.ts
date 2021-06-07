import express from 'express'
import {verifyToken} from '../utils'
import {getQuestion} from '../db_utils'
const router = express.Router()




router.get('/profile/:username',
   verifyToken,
   async (req,res)=>{
       
    const questions = await getQuestion(req.params.username)

    res.send(questions)
    
      
  })


    


export {router as ProfileRouter}