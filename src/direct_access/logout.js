module.exports = (app) => {
    app.get('/logout', async (req,res) => {
        req.session.destroy((err)=>{})
        res.redirect('/') 
    })

}