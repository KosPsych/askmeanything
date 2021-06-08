module.exports = (app) => {
    app.get('/edit_question', async (req,res)=>{
        if (req.session.loggedIn){
             if (req.query.asked_by && req.query.question_title ){
                const question = await getQuestion(req.query.asked_by,req.query.question_title)
                const question_body = question[0].question_text
                const keywords = question[0].keywords.join()
                res.render('edit_question',{question_body:question_body,keywords :keywords ,name :req.session.username,title : question[0].title })
               }
             else{
              res.redirect('/') 
             }
        }
        else{
             res.redirect('/login') 
        }
        
    })

}