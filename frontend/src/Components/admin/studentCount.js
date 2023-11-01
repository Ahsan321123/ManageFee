import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function StudentCount() {

    const adminToken = localStorage.getItem('adminToken')

    const [totalStudents,setTotalStudents]= useState(0)
    const [campusStudents,setCampusStudents]= useState([])


    useEffect(()=>{

        const allStudents = async()=>{
            const res = await axios.get('http://localhost:5000/api/v1/admin/students',{
                headers:{
                    'x-auth-token':adminToken
                }

            }
            )
            console.log(res.data)
            setTotalStudents(res.data.allCampusStudents)
            setCampusStudents(res.data.count)

        
        }
        allStudents()

        // setTimeout(() => {
        //     allStudents()
        // }, 5000);

    },[])


  return (

    <div className="dashboard">

      <div className="content">
        
        <div className="statistic-card">
          <h2>Total Students</h2>
            {totalStudents && (
                <p>{totalStudents}</p>
            )}
        </div>

        <div className="statistic-card">
          <h2>Campus-wise</h2>
          <div className="campus-list">
            {campusStudents && campusStudents.map(student=>(
                <>
                    <h3>Campus {student.campus}</h3>
                    <div className="campus-item">
                        <p>Total Students:</p>
                        <p>{student.totalStudents}</p>
                    </div>

                    <div className="campus-item">
                        <p>Paid Students:</p>
                        <p>{student.totalStudentsPaid}</p>
                    </div>

                    <div className="campus-item">
                        <p>Unpaid Students:</p>
                        <p>{student.totalStudentsPending}</p>
                    </div>
              </>
                
            ))}
           
          </div>
        </div>

       
      </div>
    </div>
  );
}