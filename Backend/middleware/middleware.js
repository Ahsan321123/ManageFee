const jwt = require('jsonwebtoken')
const studentSchema = require('../model/student')

function verifyToken(req, res, next) {
    try {
        const token = req.header('x-auth-token')

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized. No token provided.'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.staff = decoded
        next()

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Token is not valid'
        })
    }
}

async function verifyCampus(req, res, next) {
    try {
        const student = await studentSchema.findById(req.params.id)

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }

        if (student.campus !== req.staff.campus) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to access this campus data'
            })
        }

        next()

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Authorization check failed'
        })
    }
}

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token')

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized. No token provided.'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admins only.'
            })
        }

        req.role = decoded.role
        next()

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Token is not valid'
        })
    }
}

module.exports = { verifyToken, verifyCampus, verifyAdmin }
