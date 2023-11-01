const staffSchema= require('../model/staff')
const bcrypt= require ('bcrypt')

const jwt= require('jsonwebtoken')
const staff = require('../model/staff')



exports.loginStaff= async (req,res,next)=>{

try{

const {userName,password,campus}=req.body

if(!userName || !password){

    return res.status(400).json({ message: 'provide both userName and password' });
}

const staff= await staffSchema.findOne({userName})


if(!staff){
    return res.status(400).json({ message: 'Invalid credentials' });
}
if(campus !== staff.campus){
    return res.status(400).json({ message: 'this is not your campus' });
}

let isMatch = await bcrypt.compare(password,staff.password)


if(isMatch){
const token =  jwt.sign({ staff:staff },process.env.Jwt_Secret,{expiresIn:"3h"} )

res.cookie("token",token,{
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000), 
    //1 hour me expire

})
return  res.json({
    sucess:true,
    message: `${staff.userName} logged in`,
   user:staff,
   token

})
}else{
    return res.status(400).json({ message: 'Invalid credentials' });
}


}catch(err){
    res.status(400).json({
        succes:false,
        message:err.message
    })
}

}

exports.logoutStaff=async(req,res,next)=>{
    try{
res.cookie("token","", {
    expiresIn: new Date(0)

}) 

res.status(200).json({
    sucess :true,
    message:"user logout sucessfully"
})
 }catch(err){

    res.status(500).json({
        sucess :false,
        message:err.message})


 }

    
}