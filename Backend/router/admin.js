const express= require('express')

const router = express.Router()
const {createStaff, deleteStaff, updateStaff, allStaff, loginAdmin, logoutAdmin, totalStudentsCount}= require('../controllers/admin')
const { verifyAdmin ,verifyToken} = require('../middleware/middleware')

router.route ('/admin/login').post(loginAdmin)
router.route ('/admin/logout').get(logoutAdmin)
router.route('/admin/staff').get(verifyAdmin,allStaff)

router.route ('/admin/staff/create').post ( verifyAdmin, createStaff)

router.route ('/admin/staff/:id/delete').delete(verifyAdmin,deleteStaff)

router.route ('/admin/staff/:id/update').put (verifyAdmin,updateStaff)
router.route('/auth/verifyAdmin').get(verifyAdmin,(req,res,next)=>{
    res.json({
         success: true,
         message: "Admin Token is valid",
         role:req.role
    });
})


router.route ('/admin/students').get (totalStudentsCount)

module.exports=router;