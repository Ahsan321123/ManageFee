// import React,{ useMemo } from 'react'

// export const StudentByStatus = ({student,status,handleUpdate,handleStudentDelete, handleStudentUpdate,handleVoucher,classFilter }) => {
//   console.log( "Class Filter", classFilter )
  
// const filterStudnets=  useMemo(()=>{
//   let filteredStudents= student;
//   if(status){
  
//     filteredStudents=filteredStudents.filter( s=>s.status === status )
//   }

//   if( classFilter && classFilter !== ""){

//     filteredStudents= filteredStudents.filter(s=> s.className=== classFilter)
//   }
// return filteredStudents 
// },[student,status,classFilter]) 
// // console.log( filterStudnets)

//   return (
//     <div> {
//         filterStudnets.map((student)=>(
//           <div className="card w-50 mx-auto my-3" key={student._id}>
//           <h5 className="card-header d-flex justify-content-between">
//             {student.name}
//             <span>Fee Status : {student.status}</span>
//           </h5>
  
//           <div className="card-body">
//             <h5 className="card-title">Class {student.className}</h5>
//             <button
//               className="btn btn-primary"
//               onClick={() => handleUpdate(student._id)}
//             >
//               Update fee status
//             </button>
//             <button
//               className="btn btn-primary mx-2"
//               onClick={() => handleVoucher(student._id, student)}
//             >
//               Generate Voucher
//             </button>
//             <button
//               className="btn btn-primary mx-2"
//               onClick={() => handleStudentUpdate(student)}
//             >
//               View&Update Student
//             </button>
//             <button
//               className="btn btn-danger mx-2"
//               onClick={() => handleStudentDelete(student)}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//         ))
      
//       }   </div>
//   )
// }
