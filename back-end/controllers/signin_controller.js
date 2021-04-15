const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const {getUser} = require('../Model/database_utils.js')
const jwt = require('jsonwebtoken')


const secretToken = "very secure secret"

passport.use('signin',new localStrategy( async function(username,password,done){
    const user = await getUser(username)
    if (user.length == 0) {return done(null,false)} 
    if(user[0].password !==password ) {return done(null,false)} 
    return done(null,true) 
  }
  ))
  
module.exports = (app) => {
  app.post('/login',
  passport.authenticate('signin', { session: false }),
  async (req,res)=>{
    res.status(200).send({ user_access_token: jwt.sign({user:req.body.username},secretToken , {expiresIn:3600}) })     
  })
}