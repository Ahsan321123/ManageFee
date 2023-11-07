import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import Loader from "./Loader";
import FeeReportPDF from "./FeeReportPDF";
import { PDFViewer } from "@react-pdf/renderer";
import jsPDF from "jspdf";
import "jspdf-autotable";

const FeeReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [students, setStudents] = useState([]);
  const [grNum, setGrNum] = useState("");
  const [filterByGr, setFilterByGr] = useState([]);
  const [displayStudents, setDisplayStudents] = useState([]);
  const [feeStatus, setFeeStatus] = useState();
  const [loading, setLoading] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  const token = document.cookie.split("=")[1];

  
  
  const handleDate = async (e) => {
    e.preventDefault();


    try {
      setLoading(true);
      if (startDate && endDate) {
        await axios
          .get(
            `http://localhost:5000/api/v1/student/feeReport?startDate=${startDate}&endDate=${endDate}`,
            {
              headers: {
                "x-auth-token": token,
              },
            }
          )
          .then((res) => {
            console.log(res)
            const allFeeStatus = res.data.data.map(
              (student) => student.feeStatus
            
            );
            setFeeStatus(allFeeStatus);

            const sortedData = res.data.data
              .map((student) => {
                const sortedFeeStatus = student.feeStatus.sort(
                  (a, b) => new Date(a.date) - new Date(b.date)
                );
                return { ...student, feeStatus: sortedFeeStatus };
              })
              .sort(
                (a, b) =>
                  new Date(a.feeStatus[0].date) - new Date(b.feeStatus[0].date)
              );

            setStudents(sortedData);

            setDisplayStudents(sortedData);
            setLoading(false);
            if (sortedData.length === 0) {
              toast.error("No Students Found", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
              });
            }
          });
      } else {
        console.log("undefined start and end Date");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGrNum = (e) => {
    e.preventDefault();
    if (grNum === "") {
      setDisplayStudents(students);
    }

    if (students) {
      const student = students.filter((s) => s.GRNo == grNum);
      setFilterByGr(student);
      setDisplayStudents(student);
    }
  };

  // convert Date Format

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [d.getMonth() + 1, pad(d.getDate()), pad(d. getFullYear())].join("-");
  }
 
  const formattedStartDate = convertDate(startDate);
  const formattedEndDate = convertDate(endDate);


console.log( startDate , endDate)

  const headers = [
    "Name",
    "GRNO",
    "Month",
    "Fee Status",
    "Date",
    "Month",
    "Fee Status",
    "Date",
    "Month",
    "Fee Status",
    "Date",
  ];
const studentCmapus= students && students.map(s=> s.campus[0])
const generateAndDownloadPDF = () => {
  const doc = new jsPDF();

  // Add the school name and campus at the top center of the page
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Green Peace School", doc.internal.pageSize.getWidth() / 2, 20, "center");
  doc.text(`Campus: ${studentCmapus[0]}`, doc.internal.pageSize.getWidth() / 2, 30, "center");

  const headers = ["GRNo", "Name", "Month", " Status", "Date", "Fee Paid", "Fee Type"];
  const tableData = [];
  let totalFeeReceived=0;
  displayStudents.forEach(student => {
      const feeDetails = student.feeStatus.filter(status => {
          const paymentDate = status.date && new Date(status.date.split("T")[0]);
          return (
              paymentDate >= new Date(formattedStartDate) &&
              paymentDate <= new Date(formattedEndDate)
          );
      });

      if (feeDetails.length > 0) {
          feeDetails.forEach((detail, index) => {
              totalFeeReceived += parseFloat(detail.feeReceived) || 0;
              tableData.push([
                  index === 0 ? student.GRNo : "",  // Only display GRNo for the first row
                  index === 0 ? student.studentName : "",  // Only display student name for the first row
                  detail.month,
                  detail.status,
                  detail.date.split("T")[0],
                  detail.feeReceived,
                  detail.feeType.join(", ")  // Assuming feeType is an array
              ]);
   
         
            });
      }
  });

  doc.autoTable(headers, tableData, {
    startY: 40,
    styles: { fontSize: 10, textAlign: "center" },
    headStyles: { textColor: [0, 0, 0], fontSize: 12, fontStyle: 'bold',fillColor:false  }, // Updated headStyles
    margin: { top: 10, right: 5, bottom: 10, left: 5 },
    tableWidth: 'auto',
      columnStyles: {
          0: { cellWidth: 20 },  // Adjusted cell width for GRNo
          1: { cellWidth: 30 },  // Adjusted cell width for Student Name
          2: { cellWidth: 22 },  // Adjusted cell width for Month
          3: { cellWidth: 30 },  // Adjusted cell width for Fee Status
          4: { cellWidth: 35 },  // Adjusted cell width for Date
          5: { cellWidth: 30 },  // Adjusted cell width for Fee Received
          6: { cellWidth: 'auto' }  // Let Fee Type take the remaining space
      }
  });
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(
    `Total Fee Received: ${totalFeeReceived}`,
    doc.internal.pageSize.getWidth() / 2,
    doc.autoTable.previous.finalY + 20, // Position it 20 units below the table
    "center"
  );

  // Save the PDF
  const fileName = `school_info_${Date.now()}.pdf`;
  doc.save(fileName);
};


  return (
    <>
      {loading && <Loader />}
      <div className="filter-gr">
      {displayStudents.length > 0 && (
        <button
          className="csv-btn"
          onClick={generateAndDownloadPDF}
        >
          Download PDF
        </button>
      )}
      {students.length > 0 && (
        <div className="w-50 mx-auto my-3">
          <label htmlFor="grNum" className="ms-2 mb-2">
            Filter by Gr:
          </label>

          <form
            onSubmit={handleGrNum}
            className="form-inline d-flex justify-content-between"
          >
            <input
              required
              id="grNum"
              className="form-control mx-2"
              type="number"
              value={grNum}
              onChange={(e) => setGrNum(e.target.value)}
            />

            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      )}
  </div>
      <div className="row my-4">
        <div className="col">
          <form
            onSubmit={(e) => handleDate(e)}
            className="w-50 mx-auto d-flex align-items-end"
          >
            <div className="col">
              <label htmlFor="inputName" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control"
                id="inputName"
                autoComplete="off"
                required
              />
            </div>

            <div className="col ms-2">
              <label htmlFor="inputName" className="form-label">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control"
                id="inputName"
                autoComplete="off"
                required
              />
            </div>

            <div>
              <div class="col ms-2">
                <button
                  style={{ backgroundColor: "#2c3e50" }}
                  class="btn btn-primary"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {displayStudents.length > 0 ? (
        <>
          <table className="table-container">
            <thead>
              <tr>
                <th>Name</th>
                <th>GRNO</th>
                <th>Fee Details</th>
              </tr>
            </thead>
            <tbody>
              {displayStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentName}</td>
                  <td>{student.GRNo}</td>

                  <td>
                    <table>
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Fee Status</th>
                          <th>Date</th>
                          <th>Fee Received</th>
                          <th>Fee Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.feeStatus
                          .filter((status) => {
                            const paymentDate =
                              status.date &&
                              new Date(status.date.split("T")[0]);
                            return (
                              paymentDate >= new Date(formattedStartDate) &&
                              paymentDate <= new Date(formattedEndDate)
                            );
                          })
                          .map((status) => (
                            <tr key={status._id}>
                              <td>{status.month}</td>
                              <td>{status.status}</td>
                              <td> {status.date.split("T")[0]}</td>
                              <td>{status.feeReceived}</td>
                              <td>{status.feeType.map(type => type.split("  ").join(",")).join(', ')}</td>

                        
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="msg-container">
          <div className="no-data-message">
            Select start and end date to display data
          </div>
        </div>
      )}
      {/* {displayStudents.length > 0 && (
        <button
          className="csv-btn"
          onClick={generateAndDownloadPDF}
        >
          Download PDF
        </button>
      )} */}
    </>
  );
};

export default FeeReport;
