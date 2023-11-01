const mongoose= require("mongoose")


const studentSchema = new mongoose.Schema({

    name: {
        type:String,
        required:[true,"please enter stundent name"],
        trim:true,
    }
,
    className:{
    type:String,
    required:[true,"please enter class  "]
    },
    fee:{
        type:Number,
        required:[true,"please enter fee "]
    },
    
    annualCharges:{
        type:Number,
        // required:[true,"please enter fee "]
    },
    
    extraCharges:{
        type:Number,
        // required:[true,"please enter fee "]
    },
    labCharges:{
        type:Number,
        // required:[true,"please enter fee "]
    },
    enrollmentCharges:{
        type:Number,
    },
    copyPresentationCharges:{
        type:Number,
    },
    admissionCharges:{
        type:Number,

    },
   
    status:{
    type:String,
    default:"pending"
    },
    GRNo:{
        type:String,
        required:true,
        unique:true,
    },
    DOB:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true,

    },
    dateOfAdmission:{
        type:Date,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    CNIC:{
        type:String,
      
      
    },
    address:{
        type:String,
        required:true
    },
    campus:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
    }

}
)

module.exports= mongoose.model('studentSchema',studentSchema)