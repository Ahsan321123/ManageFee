// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Voucher from "../Components/voucher";
// import { useNavigate } from "react-router-dom";
// import UpdateStudent from "./updateStudent";
// import Loader from '../Components/Loader'
// import { toast } from "react-toastify";
// import PaginationComp from "./paginationComp";


// export default function Allstudents() {
//   const [allStudent, setAllStudent] = useState([]);
//   const [classFilter, setClassFilter] = useState("");
//   const [filterData, setFilterData] = useState([]);
//   const [grNum, setGrNum] = useState();
//   const [filterByGr, setFilterByGr] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [studentId, setStudentID] = useState();
//   const [bankName, setBankName] = useState("");
//   const [date, setDate] = useState();
//   const [status, setStatus] = useState();
//   const [updateStudent, setUpdateStudent] = useState();
//   const [updateModal, setUpdateModal] = useState(false);
//   const [classes, setClasses] = useState([]);
//   const [studentStatus, setStudentStatus] = useState("");
//   const [loading,setLoading]= useState(false);
//   const [ currentPage ,setCurrentPage]=useState(1)
//     const [ totalPages,setTotalPages]=useState()
//     const [totalStudentsCount,setTotalStudentsCount]=useState(0)

// // PAgination handle 

// const token = document.cookie.split('=')[1];
// console.log(token)
// // console.log(token)
// const handlePage=(pageNumber)=>{
//   setCurrentPage(pageNumber) 
// }
//   const fetchStudents = async (page) => {
//     try{
//     setLoading(true)
//     const { data } = await axios.get(`http://localhost:5000/api/v1/students?page=${page}`,{
//     headers:{
//       'x-auth-token': token
//     }
    
//     }
    
//     );
  
//     console.log(data)
//     setAllStudent(data.allStudents);
  
//     setTotalStudentsCount(data.totalStudents)   

//     setLoading(false)}catch(e){
//       console.log(e.response.data.messsage)
//     }
//   };
// // Total pages 
// useEffect(()=>{
//    const studentPerPage=10
//   const pages=Math.ceil(totalStudentsCount/studentPerPage) 
//   setTotalPages(pages)
// },[totalStudentsCount]) 

  
//   const fetchClasses = async () => {
//     const { data } = await axios.get("http://localhost:5000/api/v1/classes");
//     setClasses(data.classData);
//   };

//   const fetchFilteredStudentsByClass = async (className, page = 1) => {
//     const { data } = await axios.get(
//       `http://localhost:5000/api/v1/students?className=${className}&page=${page}`,{
//           headers:{
//             'x-auth-token': token
//           }
        
//       }
//     );
    
//     setFilterData(data.allStudents);
//     setTotalStudentsCount(data.totalStudents)   
      
//     const studentPerPage=10;
//     const pages=Math.ceil(data.totalStudents/studentPerPage); 
//     setTotalPages(pages);
//   };

//   useEffect(() => {
//     fetchStudents(currentPage);
//     fetchClasses()
//   }, [currentPage]); // Yeh useEffect sirf component mount hone par run hoga.

//   useEffect(() => {
//     if (classFilter && classFilter !== "All Classes") {
//       fetchFilteredStudentsByClass(classFilter,currentPage);
//     } else {
//       setFilterData([]);
//     }
//   }, [classFilter,currentPage]); // Yeh useEffect sirf classFilter change hone par run hoga.

//   useEffect(() => {
//     if (grNum) {
//       axios
//         .get(`http://localhost:5000/api/v1/students?GRNo=${grNum}`,{
//           headers:{
//             'x-auth-token': token
//           }
        
//       })
//         .then((res) => setFilterByGr(res.data.allStudents));
//     }
//   }, [grNum]);

//   const handleUpdate = (id) => {
//     setStudentID(id);
//     setShowModal(true);
//   };

//   //**** Generate Voucher for specific Student  */
//   const navigate = useNavigate();
//   const handleVoucher = async (id, student) => {
//     try{
//     await axios
//       .get(`http://localhost:5000/api/v1/student/${id}/voucher`,{
//         headers:{
//           'x-auth-token': token
//         }
      
//     })
//       .then((res) => {
//         // passing student data and navigating
//         console.log(res.data);
//         navigate("/voucher", {
//           state: {
//             studentData: student,
//             voucherData: res.data,
//             from: "generateSingle",
//           },
//         });
//       });

//     setStudentID(id);}catch(err){
//       toast.error(err.response.data.message,{
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 2000 
//       })
//     }
//   };
//   // **********
//   const handleClassFilterChange = (e) => {
//     setClassFilter(e.target.value);
//     setCurrentPage(1)

//       };
//   /////// Update Student
//   const handleStudentUpdate = (student) => {
//     setUpdateStudent(student);
//     setUpdateModal(true);
//   };

//   const handleGrNum = (e) => {
//     e.preventDefault();

//     let url = `http://localhost:5000/api/v1/students?GRNo=${grNum}`;
//     axios.get(url).then((res) => setFilterByGr(res.data.student));
    
//   };

// //! Update Student By Status

//   const handleModalSubmit = (e) => {
//     e.preventDefault();
    
//     const id = studentId;
//     const data = { bankName, date, status };
//     let url = `http://localhost:5000/api/v1/student/${id}/updateStatus`;
//     axios
//       .patch(url, data,{
//         headers:{
//           'x-auth-token': token
//         }
      
//     })
//       .then((response) => {
//         const updatedStudent = response.data.student;
//         const updateList = (list) =>
//           list.map((student) => {
//             if (student._id === updatedStudent._id) {
//               return updatedStudent;
//             }
//             return student;
//           });

//         setAllStudent((prevStudents) => updateList(prevStudents));
//         setFilterData((prevFilterData) => updateList(prevFilterData));
//         setFilterByGr((prevFilterByGr) => updateList(prevFilterByGr));

//         setShowModal(false);
     
//       })
//       .catch((e) => {
//         console.log(e.response)
//           if(e.response && e.response.data.message =='already Paid' ){
//             toast.error(e.response.data.message,{
//               position: toast.POSITION.TOP_CENTER,
//               autoClose: 2000 
//             })
//           }else{
//             toast.error("Student not created",{
//               position: toast.POSITION.TOP_CENTER,
//               autoClose: 2000 
//             })
//           }
        
        
//         // console.error("Error updating status:", error);

//       });
//     }
  

//   // delete
//   const handleStudentDelete = (student) => {
//     axios
//       .get(`http://localhost:5000/api/v1/student/${student._id}/delete`,{
//         headers:{
//           'x-auth-token': token
//         }
      
//     })
//       .then((res) => {
//         toast.success('Student removed',{
//           position:toast.POSITION.TOP_CENTER,
//           autoClose:2000
//         })
//         const updateStudent = allStudent.filter((s) => s._id !== student._id);
//         setAllStudent(updateStudent);

//         if (filterByGr) {
//           const updateStudent = filterByGr.filter((s) => s._id !== student._id);
//           setFilterByGr(updateStudent);
//         }
//         if (filterData) {
//           const updateStudent = filterData.filter((s) => s._id !== student._id);
//           setFilterData(updateStudent);
//         }
//       }).catch(()=>{
//         toast.error('Failed to remove student',{
//           position:toast.POSITION.TOP_CENTER,
//           autoClose:2000
//         })
//       });
//   };

//   const renderStudents = (studentsList) =>
//     studentsList.map((student) => (
//       <div className="card w-50 mx-auto my-3" key={student._id}>
//         <h5 className="card-header d-flex justify-content-between">
//           {student.name}
//           <span>Fee Status : {student.status}</span>
//         </h5>

//         <div className="card-body">
//           <h5 className="card-title">Class {student.className}</h5>
//           <button
//           style={{   backgroundColor:'#2c3e50'}}
//             className="btn btn-primary"
//             onClick={() => handleUpdate(student._id)}
//           >
//             Update fee status
//           </button>
//           <button
//           style={{   backgroundColor:'#2c3e50'}}
//             className="btn btn-primary mx-2"
//             onClick={() => handleVoucher(student._id, student)}
//           >
//             Generate Voucher
//           </button>
//           <button
//           style={{   backgroundColor:'#2c3e50'}}
//             className="btn btn-primary mx-2"
//             onClick={() => handleStudentUpdate(student)}
//           >
//             View&Update Student
//           </button>
//           <button
//             className="btn btn-danger mx-2"
//             onClick={() => handleStudentDelete(student)}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     ));

//   const uniqueClasses = [
//     ...new Set(allStudent.map((student) => student.className)),
//   ];

//   // Generate All Vouchers

//   const handleVouchersAll = (data) => {
//     const stundetIds = data.map((student) => {
//       return student._id;
//     });
//     generateAllVouchers(stundetIds);
//   };

//   const generateAllVouchers = async (StudentIds) => {
//     await axios
//       .post("http://localhost:5000/api/v1/student/generateBatchVouchers", {
//         StudentIds,
//       },{
//         headers:{
//           'x-auth-token': token
//         }
      
//     })
//       .then((res) => {
//         // console.log(res.data.students)
//         // console.log(res.data.vouchers)
//         navigate("/voucher", {
//           state: {
//             studentsData: res.data.students,
//             vouchersData: res.data.vouchers,
//             from: "generateAll",
//           },
//         });
//       });
//   };

//   // ***********

//   // Student Update

//   const updatedStudent = (updatedStudentData) => {
//     let newUpdateStudents = allStudent.map((student) =>
//       student._id === updatedStudentData.student._id
//         ? updatedStudentData.student
//         : student
//     );

//     setAllStudent(newUpdateStudents);
//   };



// // rendering 

// const getFilteredStudents = () => {
//   let students = filterData.length > 0 ? filterData : allStudent;

//   // Class filter
//   if (classFilter && classFilter !== "") {
//     students = students.filter(s => s.className === classFilter);
//   }

//   // Status filter
//   if (studentStatus) {
//     students = students.filter(s => s.status === studentStatus);
    
//   }

//   // GR number filter
//   if (filterByGr.length > 0) {
//     students = filterByGr;
//   }

//   return students;
// }

// let studentsToRender=getFilteredStudents()

//   return (
//     <>
//       <div>
//         {loading && <Loader/>}

        
//         <div className="row justify-content-end mx-5 my-4">
//           <div className="col-md-3">
//             <label htmlFor="classFilter" className="d-block mb-1">
//               Filter by Class:
//             </label>
//             <select
//               className="form-select"
//               id="classFilter"
//               value={classFilter}
//               onChange={(e)=>handleClassFilterChange(e)}
//             >
//               <option value="">All Classes</option>
//               {uniqueClasses.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Filter By Status */}

//         <div className="col-md-3">
//             <label htmlFor="classFilter" className="d-block mb-1">
//               Filter by Status:
//             </label>
//             <select
//               className="form-select"
//               id="classFilter"
//               value={studentStatus}
//               onChange={(e) => setStudentStatus(e.target.value)}
//             >
//               <option value=""> All </option>
//               <option value="Paid">paid</option>
//               <option value="pending">pending</option>
//             </select>
//           </div>

//           <div className="col-md-4">
//             <label htmlFor="grNum" className="d-block mb-1">
//               Filter by Gr:
//             </label>
//             <form onSubmit={handleGrNum} className="d-flex align-items-center">
//               <input
//                 id="grNum"
//                 className="form-control mx-2"
//                 style={{ flex: "1 0 60%" }}
//                 type="number"
//                 value={grNum}
//                 onChange={(e) => setGrNum(e.target.value)}
//               />
//               <button style={{   backgroundColor:'#2c3e50'}} className="btn btn-primary" type="submit">
//                 Search
//               </button>
//             </form>
//           </div>
//         </div>

//       {/* render  */}

//          {     studentsToRender.length===0 ? (
//       <div className=" d-flex justify-content-center align-items-center">
//       <h4>No Students Found</h4>
//       </div>
//     ):   (renderStudents(studentsToRender))}


//         {showModal && (
//           <div className="modal show d-block blurred-background" tabIndex="-1">
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Update Fee Status</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setShowModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <form onSubmit={handleModalSubmit}>
//                     <div className="mb-3">
//                       <label htmlFor="inputName" className="form-label">
//                         Bank Name
//                       </label>
//                       <input
//                         type="text"
//                         value={bankName}
//                         onChange={(e) => setBankName(e.target.value)}
//                         className="form-control"
//                         id="inputName"
//                         placeholder="Enter bank name"
//                         autoComplete="off"
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="inputName" className="form-label">
//                         Date
//                       </label>
//                       <input
//                         type="date"
//                         value={date}
//                         onChange={(e) => setDate(e.target.value)}
//                         className="form-control"
//                         id="inputName"
//                         autoComplete="off"
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="inputName" className="form-label">
//                         Status
//                       </label>
//                       <select
//                         className="form-select"
//                         id="inputName"
//                         value={status}
//                         onChange={(e) => setStatus(e.target.value)}
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="Paid">Paid</option>
//                       </select>
//                     </div>
//                     <div className="modal-footer">
//                       <button style={{   backgroundColor:'#2c3e50'}} type="submit" className="btn btn-primary">
//                         Save changes
//                       </button>
//                       <button
//                         type="button"
//                         className="btn btn-secondary"
//                         onClick={() => setShowModal(false)}
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {filterData.length > 0 && (
//         <div className="d-flex justify-content-end mt-1">
//           {filterData.length > 0 && (
//             <button
//               className="btn btn-primary mx-2 "
//               onClick={() => handleVouchersAll(filterData)}
//             >
//               Generate All Vouchers
//             </button>
//           )}
//         </div>
//       )}

     
//       {updateModal && (
//         <UpdateStudent
//           student={updateStudent}
//           setUpdateModal={setUpdateModal}
//           updatedStudent={updatedStudent}
//           classes={classes}
//           token={token}
//         />
//       )}
//       <PaginationComp 
//       currentPage={currentPage}
//         students={allStudent}
//          totalStudentsCount={totalStudentsCount}
//           pages={totalPages}
//           setCurrentPage={setCurrentPage}
//           handlePage={handlePage}
//           classFilter={classFilter}
//           filterData={filterData}
//           token={token} 
          
    
//     />
//     {console.log(totalStudentsCount)}
//     </>
    
//   );
// }
