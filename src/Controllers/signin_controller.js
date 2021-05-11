const {getUser} = require('../Model/database_utils.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')




                              
async function authentication(req, res, next){
    const user = await getUser(req.body.username)
    if (user.length == 0) {res.render('login',{status:'incorrect username'}) }
    else
      {
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
          if (!result){res.render('login',{status:'incorrect password'})} 
          else{next()}    
            })
      }   
}  

 

module.exports = (app) => {
  app.post('/login',
  authentication,
  async (req,res)=>{
    req.session.loggedIn=true
    req.session.username = req.body.username
    res.redirect('/')
      
  })
}