const mongoose= require('mongoose')
MongoDB_Uri='mongodb+srv://aliahmed1232023:ahmed123@cluster0.l6gjmze.mongodb.net/test?retryWrites=true&w=majority'

const connectDatabase=()=>{
    mongoose.connect(MongoDB_Uri, { useNewUrlParser: true, useUnifiedTopology: true} ).then((data)=>{
    console.log(`connected with Mongo DB`)
}).catch(err=>{
console.log(err)
})}


module.exports= connectDatabase;


