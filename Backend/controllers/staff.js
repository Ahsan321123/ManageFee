const staffSchema= require('../model/staff')
const bcrypt= require ('bcrypt')
const jwt= require('jsonwebtoken')
const { sendSuccess, sendError } = require('../utils/response')

exports.loginStaff= async (req,res,next)=>{
try{
    const {userName,password,campus}=req.body

    if(!userName || !password){
        return sendError(res, 'provide both userName and password', 400)
    }

    const staff= await staffSchema.findOne({userName})

    if(!staff){
        return sendError(res, 'Invalid credentials', 400)
    }
    if(campus !== staff.campus){
        return sendError(res, 'this is not your campus', 400)
    }

    const isMatch = await bcrypt.compare(password, staff.password)

    if(!isMatch){
        return sendError(res, 'Invalid credentials', 400)
    }

    // Only embed id and role in JWT — never the full document
    const token = jwt.sign(
        { id: staff._id, role: staff.role,campus:staff.campus },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
    )

    res.cookie('token', token, {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        httpOnly: true
    })

    // toJSON transform on staffSchema strips password automatically
    return sendSuccess(res, { message: `${staff.userName} logged in`, user: staff, token })

}catch(err){
    return sendError(res, err.message, 500)
}
}

exports.logoutStaff=async(req,res,next)=>{
    try{
        res.cookie('token', '', { expires: new Date(0), httpOnly: true })
        return sendSuccess(res, { message: 'user logout successfully' })
    }catch(err){
        return sendError(res, err.message, 500)
    }
}