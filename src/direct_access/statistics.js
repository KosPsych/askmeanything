const {Statistics} = require('../utils.js')
const {getQuestion} = require('../Model/database_utils.js')
module.exports = (app) => {  
  app.get('/statistics', async (req, res) => {
    const questions = await getQuestion()
    result= Statistics(questions)
    res.render('charts',{keys:result.keys,
                          values:result.values,
                          name :req.session.username,
                          loggedin : req.session.loggedIn,
                          question_keys:result.question_keys,
                          question_values:result.question_values})
                          
  
  
  })

}