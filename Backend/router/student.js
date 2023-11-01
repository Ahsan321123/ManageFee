const { verifyCampus,verifyToken }=require( '../middleware/middleware')

const express= require('express')
const router= express.Router()
const {createStudent,createClass,getAllclasses, updateStudent, deleteStudent, studentDefaulterList, deleteClass}= require('../controllers/student')
const {getAllStudents,generateVoucher,updateFeeStatus, generateBatchVouchers, studentFeeReport, checkStatus, defaulterList}=require('../controllers/feeCollection')
const { loginStaff, logoutStaff}=require('../controllers/staff')


router.route('/students').get( verifyToken, getAllStudents).post( verifyToken,createStudent )
router.route('/student/:id/voucher').get( verifyToken,verifyCampus, generateVoucher)
router.route('/studentnew/:id/updateStudent').post( verifyToken,verifyCampus,updateStudent)
router.route('/student/:id/updateStatus').patch(verifyToken,verifyCampus,updateFeeStatus)
// router.route('/student/:id/voucher').post(generateFeeVoucher)
router.route('/create/class').post(createClass)
router.route('/classes').get(getAllclasses)
router.route('/student/generateBatchVouchers').post(verifyToken,generateBatchVouchers)
router.route( '/student/:id/delete').get(verifyToken,verifyCampus,deleteStudent)
router.route('/student/feeReport').get(verifyToken, studentFeeReport)
router.route('/student/:id/checkStatus').get(checkStatus)
// router.route('/student/defaulterList').get(studentDefaulterList)
router.route('/student/defaulterList').get(defaulterList)
router.route('/staff/login').post(loginStaff)
router.route('/staff/logout').get(logoutStaff)
router.route('/class/:id/delete').get(deleteClass)


//  api for checking the auth
router.route('/auth/verify').get(verifyToken,(req,res,next)=>{
    res.json({ success: true,
         message: "Token is valid",
userName:req.staff.userName,
    campus:req.staff.campus });
})


module.exports=router;