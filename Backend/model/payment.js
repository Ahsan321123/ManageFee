const mongoose = require('mongoose')

const feeStatusSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Paid', 'Due', 'pending'],
        default: 'pending'
    },
    feeReceived: {
        type: Number
    },
    date: {
        type: Date
    },
    feeType: {
        type: [String],
        default: []
    },
    comment: {
        type: String,
        default: 'no comments'
    }
}, { _id: false })

const paymentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentSchema',
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    GRNo: {
        type: String,
        required: true
    },
    className: {
        type: String
    },
    campus: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    bankName: {
        type: String
    },
    feeStatus: {
        type: [feeStatusSchema],
        default: []
    }
}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)
