const {getUser} = require('../Model/database_utils.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secretToken = "very secure secret"



async function authorization(req, res, next){
    const user = await getUser(req.body.username)
    if (user.length == 0) {res.status(400).send('Username does not exits')}
    else
      {
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
          if (!result){res.status(400).send('Incorrect password')} 
          else{next()}    
            })
      }   
}  


module.exports = (app) => {
  app.post('/login',
  authorization,
  async (req,res)=>{
    res.status(200).send({ user_access_token: jwt.sign({user:req.body.username},secretToken , {expiresIn:3600}) })     
  })
}