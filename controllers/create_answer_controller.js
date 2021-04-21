const {getQuestion,CreateAnswer,UpdateQuestion} = require('../Model/database_utils.js')

module.exports = (app) => {
    app.post('/answer',async (req,res)=>{
  
        const question = await getQuestion(req.body.question_user,req.body.question_title)
        const ret = await CreateAnswer(req)
        
        if (ret[0] === 'answer created'){
          await UpdateQuestion(req.body.question_title,req.body.question_user,ret[1])
          res.status(200).send(ret[0]) 
      }
      else{
          res.status(408).send(ret[0])
      } 

            
      })
}