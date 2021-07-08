const {getQuestion} = require('../Model/database_utils.js')
module.exports = (app) => {
    app.get('/browse_questions', async (req, res) => {
        if (req.session.loggedIn){
            const questions = await getQuestion()
            res.render('browse_questions',{questions :questions})
        }
        else{
            res.redirect('/login') 
        }
      })

}