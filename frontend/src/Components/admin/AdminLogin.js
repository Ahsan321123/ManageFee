import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function AdminLogin() {

  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userName,
        password,
        };

      const response = await axios.post(
        "http://localhost:5000/api/v1/admin/login",
        data,
        { withCredentials: true }
      );

      if(response.data.success == true){
        toast.success('Login Success', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
    localStorage.setItem('adminToken',response.data.token);    
    localStorage.setItem('role','admin')

console.log(  response.data)

dispatch({
    type:"login",
    payload:{
      userName:"admin",
        role:"admin"
    }

})}
navigate('/admin/createStaff')



console.log("good")

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
           Admin Login
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
