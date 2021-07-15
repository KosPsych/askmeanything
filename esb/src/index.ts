import express from 'express'
require('dotenv').config()
const cors = require('cors')
const router = express.Router()
const app = express()
const url = require('url');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');

app.use(express.json())

const optionsLogin = {
    target: 'http://localhost:4000/',
    changeOrigin: true,
    onProxyReq: fixRequestBody
}
const loginProxy = createProxyMiddleware(optionsLogin);
app.use('/login', loginProxy);

const optionsGetUser = {
    target: 'http://localhost:4000/',
    changeOrigin: true,
    onProxyReq: fixRequestBody
}
const getUserProxy = createProxyMiddleware(optionsGetUser);
app.use('/get_user', getUserProxy)


app.listen(4004, () => {
    console.log('esb listening on 4004...')
});

