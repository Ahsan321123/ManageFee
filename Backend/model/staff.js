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

staffSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
    }
})

module.exports=mongoose.model("staffSchema",staffSchema)