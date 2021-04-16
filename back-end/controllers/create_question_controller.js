const {CreateQuestion,getQuestion} = require('../Model/database_utils.js')

async function validate(req, res, next){
    const limit = await getQuestion(req.body.username,req.body.title)
    if (limit.length !== 0) {res.status(400).send('Cannot re-ask a question')}
    else
      {
        next()
      }   
}  

module.exports = (app) => {
    app.post('/question',
        validate,
        async (req,res)=>{   
        const ret = await CreateQuestion(req)
        if (ret === 'question created'){
            res.status(200).send(ret) 
        }
        else{
            res.status(408).send(ret)
        }    
      })
    
}