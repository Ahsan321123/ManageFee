import { createReducer } from '@reduxjs/toolkit';


export const rootReducer= createReducer({isAuthenticated:false,
    userName:null,
    campus:null,
    role:null,
    adminUserName:null,

},{
    login:(state,action)=>{
        state.isAuthenticated = true
        state.role= action.payload.role
        state.userName= action.payload.userName
        state.campus= action.payload.campus
        
        
    },
    logout:(state) =>{
        state.isAuthenticated=false
    },
    setRole:(state,action )=>{
        state.role=action.payload.role
        state.adminUserName=action.payload.adminUserName
        
    }
    
})