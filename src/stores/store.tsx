import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reducers/redux'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})