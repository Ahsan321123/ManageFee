const express=require('express')
const app= express()
const bodyparser=require('body-parser') 
const cors = require('cors')
// Routes import 
const studentRoutes= require('./router/student')
const feeRoutes = require('./router/student')
const adminRoutes= require('./router/admin')
const cookieParser=require('cookie-parser')

// middleware 

const corsOptions = {
    origin: 'http://localhost:3000',  // frontend ka address
    credentials: true  // this allows the session cookie to be sent to the client
}

app.use(cors(corsOptions))
app.use(bodyparser.json())
app.use(cookieParser()); 
app.use(express.json())
app.use('/api/v1',studentRoutes)
app.use('/api/v1',adminRoutes)



module.exports=app;

