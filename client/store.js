import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/context/basketSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
})