import express from 'express'
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
import {SignupRouter} from './routes/signup'
import {SigninRouter} from './routes/signin'
import {GetUserRouter} from "./routes/get_user";
const url = require('url');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = require('express')();

const URI=process.env.db_uri
const connectDB = async ()=>{
    await mongoose.connect(URI,{useUnifiedTopology: true},{ useNewUrlParser: true })
    console.log("connected to auth_SOA db")
}

connectDB()

const options = {
    target: 'http://localhost:4004/',
    changeOrigin: true
}

//const exampleProxy = createProxyMiddleware(options);
//app.use('/login', exampleProxy);

app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}));
app.use(SignupRouter)
app.use(SigninRouter)
app.use(GetUserRouter)

app.listen(4000, ()=>{
    console.log('auth service listening on 4000..')
})