const mongoose= require('mongoose')


const staffSchema= new mongoose.Schema({

userName:{
    type:String
},
password:{
    type:String
},
campus:{
    type:String
},
role:{
    type:String,
    default:"staff"
}

})


module.exports=mongoose.model("staffSchema",staffSchema)