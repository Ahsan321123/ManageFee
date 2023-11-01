const mongoose= require('mongoose')



const classSchema= new mongoose.Schema(
    
    [{

className:{
    type:String,
    required:[true,"please enter class"]
},

}])

module.exports= mongoose.model("classSchema",classSchema)