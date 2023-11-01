import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import AdminLogin from './admin/AdminLogin';

export default function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userName, campus } = useSelector(state => state.root);
    
    const {role }=useSelector(state => state.root)
const savedRole =localStorage.getItem('role')

    const name = savedRole === 'admin'? 'admin': userName || "";
    const newName = name ? (name[0].toUpperCase() + name.slice(1)) : "";



    const handleLogout = async (e) => {
        e.preventDefault();

     
        try {
             const endPoint= role === "admin" ? 'http://localhost:5000/api/v1/admin/logout':'http://localhost:5000/api/v1/staff/logout'      
            const response = await axios.get(endPoint, { withCredentials: true });
            console.log(response.data)
            if (response.data.sucess === true) {
                localStorage.removeItem('role')
                toast.success("Logout Sucess", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                  });
            
                dispatch({ type: "logout",
                  payload:{
                    userName:null,
                    role:null,
                    campus:null,
                  }
            },
               
                );
                localStorage.setItem('logoutEvent', Date.now().toString());
                savedRole == "admin" ?  navigate('/adminLogin'): navigate('/');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>

        <div className="sidebar p-4 "style={{ backgroundColor: '#2c3e50', height: '100vh', color: '#ecf0f1' }}>
            <div className="profile mb-5">
                <div className="avatar mb-3 d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'white', color: '#2c3e50', fontSize: '40px', margin: '0 auto' }}>
                    {newName[0]}
                </div>
                <h4 className="text-center mb-1">{newName}</h4>
                { savedRole !== "admin" &&
                <p className="text-center"> Campus : {campus}</p>}
            </div>
            <nav className="mb-4">
                <>
                { savedRole === "admin" ?
    <>
        <Link className='link d-block mb-3 ' to='/admin/createStaff' style={{ color: '#bdc3c7' }}>Create Staff</Link>  
        <Link className='link d-block mb-3 ' to='/admin/allStaff' style={{ color: '#bdc3c7' }}> All Staff</Link>
        <Link className='link d-block mb-3 ' to='/admin/studentCount' style={{ color: '#bdc3c7' }}>Student Data</Link>  
    </>
    :
    <>
        <Link className='link d-block mb-3 ' to='/createStudent' style={{ color: '#bdc3c7' }}>Create Student</Link>
        <Link className='link d-block mb-3 d' to='/allstudents'  style={{ color: '#bdc3c7' }} >All Students</Link>
        <Link className='link d-block mb-3 ' to='/createclass' style={{ color: '#bdc3c7' }}>Create Class</Link>
        <Link className='link d-block mb-3 d' to='/feeReport' style={{ color: '#bdc3c7' }}>Fee Report</Link> 
        <Link className='link d-block mb-3 d' to='/defaulterList' style={{ color: '#bdc3c7' }}>Defaulter List</Link> 
    </>
}

            
            </>
            </nav>
            <button
                className="btn btn-danger w-100"
                onClick={(e) => handleLogout(e)}
            >
                Logout
            </button>
        </div> 
     
   
       </>
    );
}
