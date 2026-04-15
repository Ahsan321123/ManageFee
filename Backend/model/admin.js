const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        userName: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters']
        },
        role: {
            type: String,
            enum: ['admin', 'superadmin'],
            default: 'admin'
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Instance method to compare passwords
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

// Never return password in JSON responses
adminSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    return obj
}

module.exports = mongoose.model('Admin', adminSchema)
