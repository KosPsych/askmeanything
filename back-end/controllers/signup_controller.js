const {CreateUser,getUser} = require('../Model/database_utils.js')

module.exports = (app) => {
    app.post('/signup',async (req,res)=>{
  
        const exists = await getUser(req.body.username)
      
        if (exists.length == 1) {res.status(402).send('username already exists')} 
        else
        {
          const ret = await CreateUser(req)  
          res.status(200).send(ret)
        }     
      })
}