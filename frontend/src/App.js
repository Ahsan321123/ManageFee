import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Sidebar from "./Components/sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allstudents from "./Components/allstudents";
import CreateStudent from "./Components/createStudent";
import CreateClass from "./Components/createClass";
import Voucher from "./Components/voucher";
import FeeReport from "./Components/feeReport";
import StaffLogin from "./Components/StaffLogin";
import { useSelector } from "react-redux";
import { ProtactedRoutes } from "./Components/redux/protactedRoutes";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import AdminLogin from "./Components/admin/AdminLogin";
import CreateStaff from "./Components/admin/CreateStaff";
import AllStaff from "./Components/admin/AllStaff";
import StudentCount from "./Components/admin/studentCount";
import { useNavigate } from "react-router-dom";
import DefaulterList from "./Components/DefaulterList";

function App() {
  let savedRole = localStorage.getItem("role");
  const { isAuthenticated } = useSelector((state) => state.root);
  const { role } = useSelector((state) => state.root);

  return (
    <Router>
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
      {savedRole === "admin" && (
        <Routes>
          <Route path="/admin/createStaff" element={<CreateStaff />} />
          <Route path="/admin/allStaff" element={<AllStaff />} />
          <Route path="/admin/studentCount" element={<StudentCount />} />
        </Routes>
      )}
      <AppContent role={role} isAuthenticated={isAuthenticated} />
    </Router>
  );
}

function AppContent({ role, isAuthenticated }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  let savedRole = localStorage.getItem("role");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogoutEvent = (e) => {
      if (e.key === "logoutEvent") {
        dispatch({ type: "logout" });
        savedRole == "admin" ? navigate("/adminLogin") : navigate("/");
      }
    };

    window.addEventListener("storage", handleLogoutEvent);

    return () => {
      window.removeEventListener("storage", handleLogoutEvent);
    };
  }, [savedRole, dispatch, navigate]);

  useEffect(() => {
    async function verifyToken() {
        const token = document.cookie.split("=")[1];

        try {
            const endpoint =
                savedRole == "admin"
                    ? "http://localhost:5000/api/v1/auth/verifyAdmin"
                    : "http://localhost:5000/api/v1/auth/verify";
            const response = await axios.get(endpoint, {
                headers: {
                    "x-auth-token": token,
                },
            });
            if (response.data.success == true) {
                if (response.data.message == "Admin Token is valid") {
                    dispatch({
                        type: "setRole",
                        payload: {
                            userName: "admin",
                        },
                    });
                }
                dispatch({
                    type: "login",
                    payload: {
                        userName: response.data.userName,
                        campus: response.data.campus,
                    },
                });
            } else {
                handleNoToken();
            }
        } catch (err) {
            handleNoToken();
        }
    }

    function handleNoToken() {
        dispatch({
            type: "logout",
            payload: {
                userName: null,
                role: null,
            },
        });
       if(savedRole === "staff"){
        navigate("/") 
        localStorage.removeItem('role')
        toast.error("time expired kindly logged in again", {
          autoClose: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          position: "top-right",
      });
       } else if(savedRole === "admin" ){
        navigate("/adminLogin");
       }

       
    }

    verifyToken();
}, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (savedRole === "admin") {
    return (
      <div className="App">
        <Sidebar className="sidebar" />
        <ToastContainer />
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<StaffLogin />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated && location.pathname !== "/stafflogin" && (
        <Sidebar className="sidebar" />
      )}
      <ToastContainer />
      <Routes>
        <Route
          element={
            <ProtactedRoutes isAuthenticated={isAuthenticated} role={role} />
          }
        >
          {/* agr protected route me hain to access na krpain staff login  */}
          {savedRole === "admin" && (
            <Route
              path="/"
              element={<Navigate to="/admin/createStaff" replace />}
            />
          )}
          {savedRole === "staff" && (
            <Route
              path="/adminLogin"
              element={<Navigate to="/createStudent" replace />}
            />
          )}
          <Route path="/" element={<Navigate to="/createStudent" replace />} />
          <Route path="/createStudent" element={<CreateStudent />} />
          <Route path="/allstudents" element={<Allstudents />} />
          <Route path="/createclass" element={<CreateClass />} />
          <Route path="/voucher" element={<Voucher />} />
          <Route path="/feeReport" element={<FeeReport />} />
          <Route path="/defaulterList" element={<DefaulterList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
