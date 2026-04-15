const mongoose = require('mongoose')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Represents a student's fee obligation for a specific month.
// One document per student per month — the "invoice".
// Status is updated as payments are logged against this record.
const feeRecordSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'studentSchema',
            required: [true, 'Student reference is required']
        },
        // Denormalized for quick display in fee lists/reports
        studentName: {
            type: String,
            required: true
        },
        GRNo: {
            type: String,
            required: true
        },
        className: {
            type: String,
            required: true
        },
        campus: {
            type: String,
            required: true
        },
        month: {
            type: String,
            enum: MONTHS,
            required: [true, 'Month is required']
        },
        year: {
            type: String,
            required: [true, 'Year is required']
        },
        // Breakdown of what is owed this month.
        // Each entry is one fee line item — monthly, lab, annual, or any custom charge.
        charges: [
            {
                type: {
                    type: String,
                    enum: ['monthly', 'lab', 'annual', 'enrollment', 'admission', 'other'],
                    required: true
                },
                label: {
                    type: String,    // Human-readable label e.g. "Lab Charges - Computer"
                    required: true
                },
                amount: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],
        totalDue: {
            type: Number,
            required: true,
            min: 0
        },
        // Updated each time a Payment document is created against this record
        totalPaid: {
            type: Number,
            default: 0,
            min: 0
        },
        status: {
            type: String,
            enum: ['pending', 'partial', 'paid'],
            default: 'pending'
        },
        dueDate: {
            type: Date
        }
    },
    { timestamps: true }
)

// Prevent duplicate fee records for the same student in the same month/year
feeRecordSchema.index({ studentId: 1, month: 1, year: 1 }, { unique: true })

module.exports = mongoose.model('FeeRecord', feeRecordSchema)
