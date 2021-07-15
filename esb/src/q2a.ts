import express,{Request,Response}  from 'express'
const router = express.Router()

router.post('/q2a', (req, res) => {
    let a = "Hell"
    res.send(a)

})

export {router as q2aRouter}