const connectDatabase= require('./config/database')
const dotenv= require('dotenv')
const app= require('./index')
const cors = require('cors')

// 
dotenv.config({path:'./backend/config/config.env'})
app.use(cors());

// database connection 
connectDatabase()



app.listen( process.env.PORT,()=>{
console.log(`connected to localhost:${process.env.PORT} ` )
})

