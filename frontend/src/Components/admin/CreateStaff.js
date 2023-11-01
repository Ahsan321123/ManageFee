import React, { useState } from 'react'
import Loader from '../Loader';
import axios from 'axios';

import { toast } from 'react-toastify';




const CreateStaff = () => {

  const [loading,setLoading] = useState(false);
  const [staffName,setStaffName]= useState('');
  const [password,setPassword]=useState('')
  const [campus,setCampus]=useState('')
  const [modal,setModal] = useState(false);

  const allCampuses = ["1", "2", "3", "4"];

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const data = {userName:staffName,password,campus}
    const token = document.cookie.split('=')[1];
    try{
      const res = await axios.post('http://localhost:5000/api/v1/admin/staff/create',data,{
        headers:{
          "x-auth-token":token
        }
      })
      console.log(res.data)
      if( res.data.sucess == true ){
        toast.success("Staff created",{
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000 
        })

      }
    }

    catch(e){
      console.log(e)
    }

  }

  return (

<div className="container mb-4">
      {loading && <Loader/>}
      
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Create Staff</h4>
              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Staff Name</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="Enter username" 
                  onChange={e=>{setStaffName(e.target.value)}}
                  autoComplete='off'/>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Password</label>
                  <input type="password" className="form-control" id="inputName" 
                  placeholder="password" 
                  onChange={e=>{ 
                  
                    setPassword(e.target.value)}}
                  autoComplete='off'/>
                </div>


                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Campus</label>
                  <select id="inputClass" className="form-control enhanced-select" 
                  onChange={e => setCampus(e.target.value)}>
                    <option value="">Select Campus</option>
                    {allCampuses.map((campus, index) => (
                        <option key={index} value={campus}>
                            {campus}
                        </option>
    ))}
</select>
                </div>

                <button
                  style={{ backgroundColor: "#2c3e50",borderColor:"#2c3e50" }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Create
                </button>
                
                {/* {campus}
                {password}
                {staffName} */}
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CreateStaff