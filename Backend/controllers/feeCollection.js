
const studentSchema= require ('../model/student')
const paymentSchema = require('../model/payment');
const cron = require('node-cron')





// cron taks scheduler





exports.getAllStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    // get filter data only from that campus
    query.campus = req.staff.campus;
    if (req.query.className) {
      query.className = req.query.className;
    }

    if (req.query.GRNo) {
      query.GRNo = req.query.GRNo;
    }

    const allStudents = await studentSchema.find(query).skip(skip).limit(limit);

    // Count students based on the applied filters
    const totalStudents = await studentSchema.countDocuments(query);

    res.status(200).json({
      success: true,
      allStudents,
      totalStudents
    });
  } catch (err) {
    res.status(400).json({
      err: err.message
    });
  }
};

  // **** Generate Voucher for Specifice student logic 

  let nowInPakistan = new Date(new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(new Date()));

  const schoolName= "Green Peace Schoo"
  const Bank= "Habib Metro"

  let lateFee= 500
const calculateFee=async(student )=>{

let currentDate= nowInPakistan
let currentDay= currentDate.getDate()
let dueDate= new Date (currentDate.getFullYear(),currentDate.getMonth(),10 )
let lateFeeApplied= currentDay> 10 ? lateFee: 0 
let totalFee=  student.fee +( lateFeeApplied ? lateFee : 0)
let dueDateString = dueDate.toLocaleDateString()
return{
    schoolName: schoolName,
    GRNo:student.GRNo,
    schoolBank: Bank,
    studentName: student.name,
    className: student.className,
     baseFee: student.fee,
    lateFee: lateFeeApplied ? lateFee : 0,
    annualCharges: student.annualCharges,
    labCharges:student.labCharges ? student.labCharges:0,
    enrollmentCharges:student.enrollmentCharges ? student.enrollmentCharges:0,
    copyPresentattionCharges:student.copyPresentationCharges ? student.copyPresentationCharges:0,
    admissionCharge:student.admissionCharges ? student.admissionCharges:0,
    totalFee: totalFee,
    dueDate: dueDateString,
    currentDate: currentDate,
    month:getMonthName(new Date( Date.now()).getMonth())
}


}

//* Single Voucher  
  exports.generateVoucher = async  (req, res, next) => {
      try {
          const student = await studentSchema.findById(req.params.id);
        //  const {data}=req.body.data 
        
        if(!student){
            console.log("no student Found")
        }
const voucherDetails=await calculateFee(student)
   

        res.status(200).json( voucherDetails)
       
        
      } catch(err) {
          next(err);
      }
  };
  function getMonthName(monthIndex) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
  }


function checkPayment (feeStatus,feeTypes,currentMonth,currentYear) {

let existingPayment= feeStatus.find(status=>status.month===currentMonth && status.year===currentYear )
if(existingPayment){
let existingFeeType = existingPayment.feeType
let existingFeeTypes = [ ...existingFeeType]

// check kay feetypes jo body say mil rhay kia wo already hain 
feeTypes.forEach(type=>{
  if(existingFeeType.includes(type)){
 throw new Error(`${type} already paid this fee`)
  }else{
    existingFeeTypes.push(type)
  }
})


}


}


exports.updateFeeStatus=async(req,res,next)=>{
const id= req.params.id
const feeTypes = req.body.feeType
    try{
      console.log("Received feeTypes:", feeTypes);

      const student = await studentSchema.findById(id)
      if(!student){
        res.status(400).json({
          success:false,
          message:"no student found"
        })
      }

      // feeType check 
      let feeTypesReceived=  Object.keys(feeTypes).filter(key=> feeTypes[key] !== "")

    //  Month bhi receive krna hai request body
      const currentMonth= req.body.month || getMonthName(new Date().getMonth()) 
      const currentYear= new Date().getFullYear()
      //  is fee already paid for this month
     let existingPayment= await paymentSchema.findOne({studentId:student._id})


     if( !existingPayment){
      existingPayment = new paymentSchema({
        studentId: student._id,
        studentName: student.name,
        GRNo: student.GRNo,
        className: student.className,
        campus: req.staff.campus
    });
    await existingPayment.save(); 
     }
     console.log("existingPayment" ,existingPayment )
      
// checking kay current Month ka fee status object hai ya nhi 

let currentMonthFeeStatus = existingPayment.feeStatus.find( status=> status.month== currentMonth && status.year== currentYear  )  

if(currentMonthFeeStatus && currentMonthFeeStatus.status === "Paid"   ){
  return res.status(400).json({
    success:false,
    message: "Fee is already Paid for this month"

  })
}else if(!currentMonthFeeStatus){
  currentMonthFeeStatus= {
    month: currentMonth,
    year:currentYear.toString(),
    feeReceived:req.body.feeReceived,
    status:req.body.status || 'pending',
    date: req.body.date,
    feeType:feeTypesReceived? feeTypesReceived :["no fee Type"],
    comment:req.body.comment ? req.body.comment : "no comments"
  }
// pushing payment object to feeStatus array 
existingPayment.feeStatus.push(currentMonthFeeStatus)
}else if ( currentMonthFeeStatus.status === "Due"  ){

  currentMonthFeeStatus.status = req.body.status
  currentMonthFeeStatus.feeReceived = req.body.feeReceived
  currentMonthFeeStatus.date = req.body.date
  currentMonthFeeStatus.comment = req.body.comment
  currentMonthFeeStatus.feeType = feeTypesReceived
}


existingPayment.date= req.body.date;
existingPayment.bankName= req.body.bankName;
checkPayment( existingPayment.feeStatus,feeTypesReceived,currentMonth,currentYear  )
await existingPayment.save()
student.status= req.body.status
await student.save()    
    
  res.status(200).json({
  message:"payment status updated successfully",
  existingPayment,
  student
})
}catch(err){
console.log(err)
}

}


   
  // **** Generate Vouchers of All Students  by class 

exports.generateBatchVouchers = async (req, res, next) => {
  try {
      const studentIds = req.body.StudentIds;
      
      if(!Array.isArray(studentIds) || studentIds.length === 0) {
          return res.status(400).json({ error: 'Invalid studentIds' });
      }

      const students = await studentSchema.find({ '_id': { $in: studentIds }, 'campus': req.staff.campus });

      if(students.length === 0) {
          return res.status(404).json({ error: 'No students found' });
      }

      const vouchers = await Promise.all(students.map(async student => {
          return calculateFee(student);
      }));

      res.status(200).json({vouchers,students});
  } catch(err) {
      next(err);
  }
};

exports.studentFeeReport= async(req,res,next)=>{
  try{
  const startDate =  new Date( req.query.startDate)
  const endDate= new Date(req.query.endDate) 
  if (!req.query.startDate || !req.query.endDate) {
    return res.status(400).json({ message: "Start and end dates are required." });
  }
  endDate.setHours(23, 59, 59, 999);

const payment = await paymentSchema.find({
  feeStatus: {
    $elemMatch: {
        status: "Paid",
        date: { $gte: startDate, $lte: endDate } 
    }
},
campus: req.staff.campus
});




res.status(200).json({
  success:"true",
 data:payment ,

})}catch(err){
 res.status(400).json({
    success:"false",
    message:err.message
   
  })
}} 



// Check Status api 

exports.checkStatus=async(req,res,next)=>{
// student ID 
const {id}=req.params
try{

  
let student=  await paymentSchema.findOne({studentId:id})

if(!student){
  return res.status(200).json({ success: false,  message:"no payments found"}) 

}
const feeStatus= student.feeStatus

res.status(200).json({
   success: true,
   feeStatus
})
}catch(err){
  res.status(400).json({
    success: false,
    message:err.message
 })
}



}

cron.schedule(' */2 * * * *', async () => {
  const students = await paymentSchema.find();

  if (!students || students.length === 0) {
    console.log("No students found");
    return;
  }

  
  let dueStudents= []
  let currentMonth = new Date().getMonth();

  // Loop through all previous months starting from the last month
  for (let lastMonth = currentMonth - 1; lastMonth >= 0; lastMonth--) {
    let allStudentsUpdated = true;
    students.forEach(student => {
      // Check if the student has a fee status for the last month
      const feeStatusForLastMonth = student.feeStatus.find(s => s.month === getMonthName(lastMonth));
    
      // Check if there's already a "Due" status for the last month
      const alreadyDue = student.feeStatus.some(s => s.month === getMonthName(lastMonth) && s.status === "Due");
      
    
      if (!feeStatusForLastMonth && feeStatusForLastMonth !== "Paid" && !alreadyDue) {
        student.feeStatus.push({
          month: getMonthName(lastMonth),
          status: "Due",
          year: '2023'
        });
        student.save();
        dueStudents.push(student);
        allStudentsUpdated = false;
      }
    });
    

    // If all students have a fee status for the current month being checked, move to the next month
    if (allStudentsUpdated) {
      continue;
    } else {
      // If not all students were updated for the current month, break out of the loop
      break;
    }
  }

 
});

exports.defaulterList= async (req,res,next)=>{

try{
const students= await paymentSchema.find()

const dueStatusStudents = students
.filter(student => student.feeStatus.some(s => s.status === 'Due'))
.map(student => {
    // Clone the student object to avoid mutating the original
    const studentClone = { ...student._doc };
    // Filter only 'Due' statuses
    studentClone.feeStatus = student.feeStatus.filter(s => s.status === 'Due');
    return studentClone;
});

res.status(200).json({
  success: true,
  data:dueStatusStudents,
})

}catch(error){
res.status(400).json({
success: false,
message:error.message
})
}

}

// function generatePDF(students) {
//   const doc = new PDFDocument();

//   // PDF ka title
//   doc.fontSize(20).text('Students with Due Fees', { align: 'center' }).moveDown();
// console.log( students)
//   students.forEach(student => {
//     doc.fontSize(14).text(`Name: ${student.name}`);
//     doc.text(`Class: ${student.className}`);
//     doc.text(`GR No: ${student.GRNo}`);
//     doc.text(`Due Month: ${getDueMonth(student)}`);
//     doc.moveDown();
//   });

//   // PDF ko file mein save karna
//   doc.pipe(fs.createWriteStream('students_due_fees.pdf'));
//   doc.end();
// }

// function getDueMonth(student){
//   let dueMonth= student.feeStatus.find(student=>student.status === 'Due');
//   return dueMonth ? dueMonth.month :" not Found";
// }

// exports.defaulterList = (req, res, next) => {
//   const pdfDefaulterList = path.join(__dirname, 'students_due_fees.pdf');
//   res.sendFile(pdfDefaulterList);
// }

// let groupPayments= {}
// payment.forEach((p)=>{
// let dateStr= p.date.toISOString().split('T')[0];
// if(!groupPayments[dateStr]){
//   groupPayments[dateStr]=[]
// }
// groupPayments[dateStr].push(p)

// })

