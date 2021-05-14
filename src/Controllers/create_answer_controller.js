const {getQuestion,CreateAnswer,UpdateQuestion} = require('../Model/database_utils.js')

module.exports = (app) => {
    app.post('/answer',async (req,res)=>{
        const ret = await CreateAnswer(req)
        if (ret=== 'answer created'){
          res.status(200).send(ret) 
      }
      else{
          res.status(408).send(ret)
      }       
    })
  }