import express from 'express'
import {getQuestion} from '../db_utils'
const router = express.Router()



router.get('/statistics',
   
   async (req,res)=>{  
    const questions = await getQuestion()
    res.send(questions)     
  })


    


export {router as StatisticsRouter}