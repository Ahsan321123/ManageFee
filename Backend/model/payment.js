const mongoose=require('mongoose')


const paymentSchema = new mongoose.Schema({
studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"studentSchema"
},
studentName:{
type:String,

},
GRNo:{
    type:Number,
},
className:{
    type:String,
},
feeStatus:[{

    month :{
        type:String,
        default: allMonths(new Date(Date.now()).getMonth())
    },
    year:{
        type:String,
    required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        // required:true
    },
    feeReceived:{
        type:Number,
        // required:true
    },
    feeType:{
        type:Array,
    },
    comment:{
        type:String
    } 
}],

bankName:{
    type: String,

},

campus:{
    type:String,
    required:true
},

});

function allMonths( ind ){
let months= [ "Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

return months[ ind ]


}

module.exports=mongoose.model("paymentSchema",paymentSchema)