import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './Select.css'
export default function StaffLogin() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [campus, setCampus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AllCampuses = ["1", "2", "3", "4"];

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userName,
        password,
        campus,
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/staff/login",
        data,
        { withCredentials: true }
      );
 

      if (response.data.user) {
  
        console.log(response.data.user)
        dispatch({
          type: "login",
          payload: {
            userName: response.data.user.userName,
            campus: response.data.user.campus,
            role:response.data.user.role
          },
 
        });
        localStorage.setItem('role','staff')
          navigate("/createStudent");
     
   
      }
    } catch (err) {
      toast.error("Login failed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-4">
        <div className="card shadow-lg">
          <div className="card-body">
            <h4
              className="card-title text-center mb-4"
              style={{ color: "#2c3e50" }}
            >
              Staff Login
            </h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Username"
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputClass" className="form-label">
                  Select Campus
                </label>
                <select id="inputClass" className="form-control enhanced-select" onChange={e => setCampus(e.target.value)}>
    <option value="">Select Campus</option>
    {AllCampuses.map((campus, index) => (
        <option key={index} value={campus}>
            {campus}
        </option>
    ))}
</select>
              </div>
              <div className="d-grid gap-2">
                <button
                  style={{ backgroundColor: "#2c3e50" }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
