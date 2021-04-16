const {CreateQuestion} = require('../Model/database_utils.js')

module.exports = (app) => {
    app.post('/question',async (req,res)=>{   
        const ret = await CreateQuestion(req)
        if (ret === 'question created'){
            res.status(400).send(ret) 
        }
        else{
            res.status(408).send(ret)
        }    
      })
    
}