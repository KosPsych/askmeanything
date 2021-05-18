const {UpdateQuestion} = require('../Model/database_utils.js')

  

module.exports = (app) => {
    app.post('/edit_question',
        
        async (req,res)=>{  
            await UpdateQuestion(req.body.question_title,req.session.username,req.body.question_text,req.body.keywords.split(","))
            res.redirect('http://localhost:3000/question_view/'+req.body.question_title.replace(" ", "-")+"?askedby="+req.session.username) 
            
      })
    
}