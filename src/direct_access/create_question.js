module.exports = (app) => {
    app.get('/create_question', async (req,res) => {
        if (req.session.loggedIn){
            res.render('create_question',{status : '',name :req.session.username })
          }
          else{
            res.redirect('/login') 
          }
    })

}