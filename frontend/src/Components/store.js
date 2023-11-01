import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './redux/rootreducer'

export const store = configureStore({
 reducer:{
    root: rootReducer
 },
})
