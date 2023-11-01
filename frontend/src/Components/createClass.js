import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify';
import Loader from './Loader';

const CreateClass = () => {
  const [classes, setClasses] = useState('');
  const [loading, setLoading] = useState(false);
  const [showClasses, setShowClasses] = useState([]);

useEffect(()=>{
async function AddClass(){ 
await axios.get('http://localhost:5000/api/v1/classes').then((res)=>{
  setShowClasses(res.data.classData)
  console.log( res.data)

})
}
AddClass()
},[])


const handleSubmit = async(e) => {
  e.preventDefault();
  setLoading(true);
  const url = 'http://localhost:5000/api/v1/create/class';
  await axios.post(url, { className: classes })
  .then((res) => {
    setLoading(false);
    // Update the showClasses state with the newly added class
    setShowClasses(prevClasses => [...prevClasses, { className: classes, _id: res.data.classData._id }]);
    toast.success('Class created', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  }).catch(() => {
    toast.error('Class not created', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  });
};


  const handleDelete = async(e,id) => {
    e.preventDefault()
   await axios.get(`http://localhost:5000/api/v1/class/${id}/delete`).then((res)=>setShowClasses(res.data.updatedClasses))
  };

  return (
    <div className="container mt-5">
      {loading && (<Loader/>)}
      {!loading && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="className" className="form-label">Class Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="className" 
                  value={classes} 
                  onChange={(e) => setClasses(e.target.value)} 
                />
              </div>
              <button type="submit"  style={{   backgroundColor:'#2c3e50'}} className="btn btn-primary">ADD</button>
            </form>
          </div>
        </div>
      )}

<div className="w-50 mx-auto my-3">
    <table className="table table-bordered">
        <thead>
            <tr>
                <th className="text-center">All Classes</th>
                <th className="text-center">Action</th>
            </tr>
        </thead>
        <tbody>
            {showClasses.map(c => (
                <tr key={Math.random()}>
                    <td className="text-center">{c.className}</td>
                    <td className="text-center">
                        <button onClick={(e) => handleDelete(e,c._id)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    </div>
  )
}

export default CreateClass;
