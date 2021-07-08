module.exports = (app) => {
    app.get('/contact', async (req,res) => {
        res.render('contact')
    })

}