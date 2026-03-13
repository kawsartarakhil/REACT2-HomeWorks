import  { configureStore } from "@reduxjs/toolkit";
import counterData from '../reducer/counter'
export default configureStore({
  reducer:{
    counter:counterData
  }
})