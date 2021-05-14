const {getQuestionByKeyword} = require('../Model/database_utils.js')

module.exports = (app) => {
    app.get('/search/:keyword', async (req,res) => {
        const result = await getQuestionByKeyword(req.params.keyword)
        console.log(result)
        if (result==='No Results Found')
            res.status(404).send(result)
        else
            res.status(200).send(result)
    })

}