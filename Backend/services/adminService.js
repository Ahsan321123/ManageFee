const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../model/admin')
const Staff = require('../model/staff')
const Student = require('../model/student')

// ─── Auth ────────────────────────────────────────────────────────────────────

exports.loginAdmin = async (creds) => {
    const {userName,password} = creds
     if (!userName || !password) {
        throw { status: 400, message: 'Username and password are required' }
    }

    const admin = await Admin.findOne({ userName: userName.toLowerCase(), isActive: true })
    if (!admin) {
        throw { status: 401, message: 'Invalid credentials' }
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
        throw { status: 401, message: 'Invalid credentials' }
    }

    const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    return { token, admin }
}

// ─── Staff ───────────────────────────────────────────────────────────────────

exports.getAllStaff = async () => {
    return Staff.find().select('-password').lean()
}

exports.createStaff = async ({ userName, password, campus }) => {
    if (!userName || !password || !campus) {
        throw { status: 400, message: 'userName, password, and campus are required' }
    }

    const existing = await Staff.findOne({ userName })
    if (existing) {
        throw { status: 400, message: 'Username already taken' }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const staff = await Staff.create({ userName, password: hashedPassword, campus })
    return staff.toObject({ versionKey: false, transform: (_, ret) => { delete ret.password; return ret } })
}

exports.updateStaff = async (id, { userName, password, campus }) => {
    const data = {}
    if (userName) data.userName = userName
    if (campus) data.campus = campus

    if (password) {
        const salt = await bcrypt.genSalt(10)
        data.password = await bcrypt.hash(password, salt)
    }

    const staff = await Staff.findByIdAndUpdate(id, data, { new: true }).select('-password')
    if (!staff) {
        throw { status: 404, message: 'Staff not found' }
    }

    return staff
}

exports.deleteStaff = async (id) => {
    const staff = await Staff.findByIdAndDelete(id)
    if (!staff) {
        throw { status: 404, message: 'Staff not found' }
    }
    return staff
}

// ─── Analytics ───────────────────────────────────────────────────────────────

exports.getStudentStats = async () => {
    // Single aggregation query instead of multiple .countDocuments() calls in a loop
    const campusStats = await Student.aggregate([
        {
            $group: {
                _id: '$campus',
                total: { $sum: 1 },
                paid: { $sum: { $cond: [{ $eq: ['$status', 'Paid'] }, 1, 0] } },
                pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } }
            }
        },
        { $sort: { _id: 1 } }
    ])

    const allCampusStudents = await Student.countDocuments()

    const stats = campusStats.map(c => ({
        campus: c._id,
        total: c.total,
        paid: c.paid,
        pending: c.pending
    }))

    return { campuses: stats, allCampusStudents }
}
