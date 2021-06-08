const {CreateUser,getUser} = require('../Model/database_utils.js')

module.exports = (app) => {
    app.post('/signup',async (req,res)=>{
  
        const exists = await getUser(req.body.username)
        if (exists.length == 1) {res.render('signup',{status:'username already exists'}) } 
        else
        {
          const ret = await CreateUser(req)  
          if (ret === 'successful sign up'){
            res.status(200).send(ret) 
           }
          else{
            res.status(408).send(ret)
        }
        }     
      })
}