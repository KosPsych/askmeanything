const {getQuestion,getAnswers} = require('../Model/database_utils.js')

module.exports = (app) => {
    app.get('/question_view/:question_id', async (req,res) => {
        let url = req.url
        let asked_by = url.slice(url.lastIndexOf('?')+9)
        let whole = url.slice(url.lastIndexOf('/')+1)
        let title = whole.replace(url.slice(url.lastIndexOf('?')), '').replace("-", " ")
        const question = await getQuestion(asked_by,title)
        const answers = await getAnswers(asked_by,title)
        res.render('question',{question:question[0],answers:answers,name :req.session.username })
    })

}