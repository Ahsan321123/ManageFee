import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'



export const ProtactedRoutes = ({isAuthenticated,children,role }) => {
    
if(!isAuthenticated){
    return <Navigate to ='/'/>
}

// if( role !=="admin"  && window.location.pathname.startsWith('/admin')){
//   return <Navigate to ='/adminLogin'/>

// }



  return <Outlet/>
}


