import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AllStaff() {

    const [allStaff,setAllStaff]= useState([]);
    const [staffName,setStaffName]=useState('')
    const [staffCampus,setStaffCampus]=useState('')
    const [staffPassword,setStaffPassword]=useState('')
    const [modal,setModal]  = useState(false)
    const [id,setId] = useState('')

    const token = document.cookie.split('=')[1];

    useEffect(()=>{
        

        const getStaff = async()=>{
            
            try{
                const res = await axios.get("http://localhost:5000/api/v1/admin/staff",{
                    headers:{
                        "x-auth-token":token
                    }
                })

                setAllStaff(res.data.staff)
    
            }
            catch(err){
                console.log(err)
            }
    
        }
        getStaff()

        // const interval = setInterval(() => {
        //     getStaff();
        //   }, 5000); 

        //   return ()=> clearInterval(interval);

    },[])

    const handleDelete = async(e,id) =>{

        e.preventDefault()
        try
        {
    
        const response = await axios.delete(`http://localhost:5000/api/v1/admin/staff/${id}/delete`,{
            headers:{
                'x-auth-token':token
            }
        })

        if(response.data.success=== true ){
            setAllStaff( response.data.newStaff )    
        }

            
   
        }
        catch(error){
            console.log(error)
        }

    }

    const handleUpdate = (id,staff)=>{
        setModal(true)
        setId(id)
        
    }

    const handleModalSubmit = async(e)=>{
        e.preventDefault()
        const data ={userName:staffName,campus:staffCampus,password:staffPassword}

        const response =await axios.put(`http://localhost:5000/api/v1/admin/staff/${id}/update`,
        data,{
            headers:{
                'x-auth-token':token
            }
        })
    if(response.data.success===true){
      toast.success('Updated Success', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
            const updatedStaff= response.data.staff
          const newStaff= allStaff.map((s)=>{
                if(s._id=== updatedStaff._id){
                    return updatedStaff
                }
               return s

            })    

setAllStaff(newStaff)

setModal(false)


        
        } else if(response.data.success===false) {
          
          toast.error('Something went wrong', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
          });


        }
        

    }
  return (
    <div className="w-50 mx-auto my-3">
    <table className="table table-bordered">
        <thead>
            <tr>
                <th className="text-center">All Staff</th>
                <th className="text-center">Campus</th>
                <th className="text-center">Action</th>
            </tr>
        </thead>
        <tbody>
            {/* {console.log(allStaff)} */}

            {allStaff && allStaff.map((staff,index )=> (
                
                <tr key={index}>
                                    {/* {console.log(staff._id)} */}

                    <td className="text-center">{staff.userName}</td>
                    <td className='text-center'> {staff.campus} </td>
                 
                    <td className="text-center">
                    <button onClick={(e) => handleDelete(e,staff._id)} 
                        className="btn btn-danger">Delete
                    </button>
                    <button onClick={(e) => handleUpdate(staff._id,staff)} 
                        className="btn btn-danger">Update
                    </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>

{modal && (
    <div className="modal show d-block blurred-background" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">Staff</h5>
        </div>

        <div className="modal-body">
          
          <form onSubmit={(e) => handleModalSubmit(e)}>
            <div className="row">
              
              <div className="col-md-6 mb-3">
                <label htmlFor="inputName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                //   value={staffName}
                  onChange={e=>{setStaffName(e.target.value)}}
                  className="form-control"
                  id="inputName"
                  placeholder="Enter Staff Name"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="inputName" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                //   value={staffName}
                  onChange={e=>{setStaffPassword(e.target.value)}}
                
                  className="form-control"
                  id="inputName"
                  placeholder="Modify Password"
                  autoComplete="off"
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="inputClass" className="form-label">
                  Campus
                </label>
                <select
                  id="inputClass"
                  className="form-control"
                  onChange={
                    (e=>{setStaffCampus(e.target.value)})
                  }
                >
                  <option>All Campuses</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button style={{   backgroundColor:'#2c3e50'}} type="submit" className="btn btn-primary">
                Save changes
              </button>
             
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}

</div>

  )
}