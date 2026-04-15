
const staffSchema= require('../model/staff')
const bcrypt= require ('bcrypt')
const jwt = require('jsonwebtoken')
const adminService = require('../services/adminService')
const studentSchema = require('../model/student')
const staff = require('../model/staff')
const { sendSuccess, sendError } = require('../utils/response')

exports.loginAdmin=async(req,res,next)=>{
try{
    const{userName,password}=req.body
    const result = await adminService.loginAdmin({userName,password})
    return sendSuccess(res, { data: result })
}catch(err){
    return sendError(res, err.message, err.status || 400)
}
}




exports.logoutAdmin= async(req,res,next)=>{
try{
    res.cookie('token', '', { expires: new Date(0), httpOnly: true })
    return sendSuccess(res, { message: 'Admin logged out' })
}catch(err){
    return sendError(res, err.message, 400)
}
}


exports.allStaff=async(req,res,next)=>{

try{
const staff= await staffSchema.find()


if(staff){
    res.status(200).json({
        success:true,
        staff
    })
}
else{
    res.status(400).json({
        success:false,
        message:"no staff found"
    })
}


}catch(err){
    res.status(400).json({
        success:false,
        message:err.message
    })
}
}

exports.createStaff = async (req, res, next) => {
  try {
    const data = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    const staffData = await staffSchema.create({
      userName:data.userName,
      password: hashPassword,
      campus:data.campus,
    })
   const { password , ...withoutPassword} = staffData.toObject() 



    res.status(200).json({
      sucess: true,
      message: "staff created",
      data:withoutPassword,
    });
  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: err.message,
    });
  }
};

exports.updateStaff= async(req,res,next)=>{
try{
    const staffId= req.params.id
    const {userName,password,campus}= req.body
    
    const data= {
        userName,
        campus,
        
    }
if(password){
    const salt = await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password,salt)
    console.log(hashPassword)
    data.password=hashPassword
}
    

const staff= await staffSchema.findByIdAndUpdate(staffId,
data,
{new:true}    
)
if(!staff){
    res.status(400).json({
        success:false,
        message:"no staff found to update"
    })
}
res.status(200).json({
    success:true,
    staff
})

}catch(err){
    res.status(400).json({
        success:false,
        message:err.message
    })

}
}

exports.deleteStaff=async(req,res,next)=>{

try{
const{id}= req.params  

const staff =await staffSchema.findOneAndDelete({_id:id})
const newStaff= await staffSchema.find()
if(!staff){
    res.status(400).json({
        success:false,
        message:"no staff found to delete"
    })
}

res.status(200).json({
    success:true,
    message:`staff with id ${id} name${staff.userName} has been deleted `,
    newStaff
})

}catch(err){
    res.status(400).json({
        success:false,
        message:err.message
    })
    
}


}

exports.totalStudentsCount=async(req,res,next)=>{
try{

    const campus= [ "1","2","3","4"]
const count = await Promise.all( campus.map( async(campus)=>{
 const totalStudents= await studentSchema.count({campus})
 const totalStudentsPaid= await studentSchema.count({campus,status:"Paid"})
 const totalStudentsPending= await studentSchema.count({campus,status:"pending"})


 return{
campus,
totalStudents,
totalStudentsPaid,
totalStudentsPending,

}

}))

const allCampusStudents= await studentSchema.count({})

    
res.status(200).json({
    success:true,
    count,
    allCampusStudents

})

}catch(err){

 res.status(400).json({
        success:false,
        message:err.message
    })
    
}


}


