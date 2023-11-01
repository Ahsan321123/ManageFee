const staffSchema= require('../model/staff')
const bcrypt= require ('bcrypt')
const jwt = require('jsonwebtoken')

const studentSchema = require('../model/student')




exports.loginAdmin=async(req,res,next)=>{
try{
const{userName,password}=req.body

let token;

if( userName === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD ){
  
     token= jwt.sign({role:"admin"},process.env.Jwt_Secret,{expiresIn:"1h"})

     res.cookie("token",token,{
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000), 
        //1 hour me expire
    
    })
    
     res.status(200).json({
        success:true,
        message:"Admin logged in",
        token,
        role:"admin"
        
    })
   

}else{
    res.status(401).json({
        success:false,
        message:"invalid credentials",
    })
}



}catch(err){
    res.status(400).json({
        success:false,
        message:err.message,
   
    })
}



}




exports.logoutAdmin= async(req,res,next)=>{

try{
  res.cookie("token","",{
    expiresIn:Date.now(0)
  })
  res.status(200).json({
    sucess:true,
    message:"Admin logged out",

})
}catch(err){
    res.status(400).json({
        success:false,
        message:err.message,
    
    })
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
    const { userName, password, campus } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const staffData = await staffSchema.create({
      userName,
      password: hashPassword,
      campus,
    });

    console.log(userName, password, campus);

    res.status(200).json({
      sucess: true,
      message: "staff created",
      staffData,
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


