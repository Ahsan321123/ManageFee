const mongoose= require('mongoose')


const connectDatabase=()=>{
    mongoose.connect(process.env.db_Url, { useNewUrlParser: true, useUnifiedTopology: true} ).then((data)=>{
    console.log(`connected with${data.connection.host}`)
}).catch(err=>{
console.log(err)
})}


module.exports= connectDatabase;


