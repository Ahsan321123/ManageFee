import React from 'react'
import Loader from './Loader'

export const CheckStatus = ({ studentFeeData, setShowFeeModal,loading }) => {



const renderPayments =(payments )=>{
return (
    <>

    <div className="modal show d-block blurred-background" tabIndex="-1">
    <div className="modal-dialog"  style={{ maxWidth: '60%',textAlign:'center'  }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Fee Status</h5>
        </div>
        <div className="modal-body">
        {loading  ? <Loader/> :(

<table className="table">
<thead>
  <tr>
    <th>Month</th>
    <th>Status</th>
    <th>Date</th>
    <th>Fee Received </th>
    <th> Fee Type </th>
    <th>Comment</th>
  </tr>
</thead>
<tbody>
  { !payments ? "No Payments Data Found" :(  payments.map((data, index) => (
    <tr key={index}>
      <td>{data.month}</td>
      <td>{data.status}</td>
      <td>{new Date(data.date).toLocaleDateString()}</td>
      <td>{data.feeReceived}</td>
      <td>{data.feeType.map(( type)=> <p>{type}</p>    )} </td>
      <td>{data.comment ? data.comment:"no comment"   }</td>
    </tr>
  )
  ))}
</tbody>
</table>

        )   }
       
        </div>
        <div className="modal-footer">
       
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowFeeModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
        </div> 
        </>
        )
}

return (
  
    renderPayments(studentFeeData)

    )
}
