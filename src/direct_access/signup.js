module.exports = (app) => {
    app.get('/signup', async (req,res) => {
        if (req.session.loggedIn){
            res.redirect('/') 
          }
          else{
            res.render('signup',{status:''})
          }
    })

}