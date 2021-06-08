const {getQuestion,getAnswers,getUser} = require('../Model/database_utils.js')
module.exports = (app) => {
    app.get('/profile', async (req, res) => {
        if (req.session.loggedIn){
            const questions = await getQuestion(req.session.username)
            const answers = await getAnswers(req.session.username)
            const user = await getUser(req.session.username)
            res.render('profile',{questions :questions, answers : answers,user:user[0],name :req.session.username })
        }
        else{
            res.redirect('/login') 
        }
      })

}