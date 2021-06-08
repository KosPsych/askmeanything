module.exports = (app) => {
    app.get('/', async (req,res) => {
        res.render('home',{name :req.session.username ,loggedin : req.session.loggedIn})
    })

}