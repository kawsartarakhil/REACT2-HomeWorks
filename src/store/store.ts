import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../reducers/todo'
export default configureStore({
  reducer: {
    todo:todoReducer
  }
})