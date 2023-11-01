import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './MyDocument';  // Ensure the path is correct

const DefaulterList = () => {
  const [dueStudents, setDueStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState();
  const [filteredStudents, setFilteredStudents] = useState([]);

  

  const defaulterlistFetch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/student/defaulterList');
      setDueStudents(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    defaulterlistFetch();
    if (selectedClass !== "All Classes"  ) {
      const filterDueStudents = dueStudents.filter(s => s.className === selectedClass);
      setFilteredStudents(filterDueStudents);
}else{
  setFilteredStudents(dueStudents);
}
   
  }, [selectedClass, dueStudents]);

  let uniqueClasses = [...new Set(dueStudents.map(s => s.className))];

  return (
    <div>
      <div className="row justify-content-end mx-5 my-4">
        <div className="col-md-3">
          <label htmlFor="classFilter" className="d-block mb-1">
            Filter by Class:
          </label>
          <select
            className="form-select"
            id="classFilter"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {uniqueClasses.map((c) => (
          
              <option key={c} value={c}>
                {c}
      
              </option>
                     
            ))}
               <option value="All Classes" >
               All Classes
                      </option>
                      
          </select>
        </div>
      </div>

      {selectedClass && filteredStudents.length > 0 ? (
        <PDFViewer width="100%" height="600">
          <MyDocument students={filteredStudents} className={selectedClass} />
        </PDFViewer>
      ):
       (
        <div className="msg-container">
          <div className="no-data-message">Please Select Class First</div>
        </div>
      )}
    </div>
  );
};

export default DefaulterList;
